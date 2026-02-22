import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for
    // - API routes
    // - _next (static files)
    // - _vercel (Vercel internals)
    // - all root files (favicon.ico, etc.)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
