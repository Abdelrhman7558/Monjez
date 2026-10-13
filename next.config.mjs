import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Old monjez-platform URLs (static landing + apply funnel) now point at the new landing.
    async redirects() {
        return [
            { source: "/apply", destination: "/en#apply", permanent: false },
            { source: "/apply/:path*", destination: "/en#apply", permanent: false },
            { source: "/fit-out", destination: "/en", permanent: false },
            { source: "/fit-out/apply", destination: "/en#apply", permanent: false },
            { source: "/fit-out/:path*", destination: "/en", permanent: false },
            { source: "/Monjez-Landing", destination: "/en", permanent: false },
            { source: "/Monjez-Landing.html", destination: "/en", permanent: false },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "**.freemius.com",
            }
        ],
    },
};

export default withNextIntl(nextConfig);
