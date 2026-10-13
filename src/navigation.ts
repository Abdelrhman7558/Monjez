import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    // English is always the default; Arabic only when the visitor picks it (no Accept-Language redirect).
    localeDetection: false
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
