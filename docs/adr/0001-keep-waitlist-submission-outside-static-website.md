# Keep Waitlist Submission Outside the Static Website

The Unwired website remains a static exported site, including the `/products/waitlist` page. Waitlist form submissions are handled by a small separate waitlist API instead of a Next.js route handler, preserving the static deployment model while allowing the product waitlist to collect interest in Mail, Calendar, and platform targets.
