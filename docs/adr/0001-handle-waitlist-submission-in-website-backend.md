# Handle Waitlist Submission In The Website Backend

The Unwired website now owns a small tRPC backend for Product Waitlist submissions. The waitlist procedure is exposed through the Next.js app at `/api/trpc`, collects interest in Mail, Calendar, and platform targets, and sends Resend email notifications.

This supersedes the earlier static-export boundary. The website is no longer a static-only site because Product Waitlist submissions and similar owned conversion flows are handled through the app backend.
