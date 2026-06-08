import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';

import { sendWaitlistConfirmation, sendWaitlistNotification } from './email.js';
import { validateWaitlistSubmission } from './validation.js';

type ServerOptions = {
  readonly env?: NodeJS.ProcessEnv;
  readonly fetchImplementation?: typeof fetch;
};

type JsonValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonValue[]
  | {
      readonly [key: string]: JsonValue;
    };

const maxBodyBytes = 64 * 1024;

export function createWaitlistApiServer({
  env = process.env,
  fetchImplementation = fetch,
}: ServerOptions = {}): Server {
  return createServer((request, response) => {
    void handleRequest(request, response, { env, fetchImplementation });
  });
}

async function handleRequest(
  request: IncomingMessage,
  response: ServerResponse,
  { env, fetchImplementation }: Required<ServerOptions>,
): Promise<void> {
  writeCorsHeaders(response, env);

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.url !== '/waitlist') {
    writeJson(response, 404, { error: 'Not found.' });
    return;
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS');
    writeJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  const apiKey = env.RESEND_API_KEY;
  const fromEmail = env.WAITLIST_FROM_EMAIL;
  const notifyEmail = env.WAITLIST_NOTIFY_EMAIL;

  if (!apiKey || !fromEmail || !notifyEmail) {
    writeJson(response, 500, { error: 'Waitlist email is not configured.' });
    return;
  }

  let body: unknown;

  try {
    body = JSON.parse(await readRequestBody(request));
  } catch {
    writeJson(response, 400, { error: 'Request body must be valid JSON.' });
    return;
  }

  const validation = validateWaitlistSubmission(body);

  if (!validation.ok) {
    writeJson(response, 400, { errors: validation.errors });
    return;
  }

  try {
    await Promise.all([
      sendWaitlistConfirmation({
        apiKey,
        fromEmail,
        submission: validation.submission,
        fetchImplementation,
      }),
      sendWaitlistNotification({
        apiKey,
        fromEmail,
        notifyEmail,
        submission: validation.submission,
        fetchImplementation,
      }),
    ]);
  } catch {
    writeJson(response, 502, { error: 'Unable to process waitlist submission.' });
    return;
  }

  writeJson(response, 202, {
    message: 'You are on the Unwired product waitlist.',
  });
}

function readRequestBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';

    request.setEncoding('utf8');

    request.on('data', (chunk: string) => {
      body += chunk;

      if (Buffer.byteLength(body) > maxBodyBytes) {
        request.destroy();
        reject(new Error('Request body is too large.'));
      }
    });

    request.on('end', () => {
      resolve(body);
    });

    request.on('error', reject);
  });
}

function writeCorsHeaders(response: ServerResponse, env: NodeJS.ProcessEnv): void {
  response.setHeader('Access-Control-Allow-Origin', env.WAITLIST_ALLOWED_ORIGIN ?? '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function writeJson(response: ServerResponse, statusCode: number, body: JsonValue): void {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(body));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 3001);

  createWaitlistApiServer().listen(port);
}
