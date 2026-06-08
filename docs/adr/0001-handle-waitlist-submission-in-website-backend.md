# Handle Waitlist Submission In The Website Backend

The Unwired website now owns a small backend route for Product Waitlist submissions. The waitlist API lives in the Next.js app at `/api/waitlist`, collects interest in Mail, Calendar, and platform targets, and sends Resend email notifications.

This supersedes the earlier static-export boundary. The website is no longer configured with `output: "export"` because the Product Waitlist is backend-only for this app.
