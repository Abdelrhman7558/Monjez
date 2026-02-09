import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SmoothScroll } from "@/components/smooth-scroll";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.monjez-agency.com"),
  title: "Monjez | AI Infrastructure & Automation Systems",
  description:
    "We build AI Infrastructure Systems that replace operational bottlenecks. Revenue-focused automation for scaling companies.",
  keywords: [
    "AI Infrastructure",
    "AI Automation",
    "Business Automation",
    "Revenue Systems",
    "Operational Efficiency",
  ],
  openGraph: {
    title: "Monjez | AI Infrastructure & Automation Systems",
    description:
      "We build AI Infrastructure Systems that replace operational bottlenecks.",
    url: "https://www.monjez-agency.com",
    siteName: "Monjez",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Monjez Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monjez | AI Infrastructure & Automation Systems",
    description:
      "We build AI Infrastructure Systems that replace operational bottlenecks.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased bg-monjez-dark text-white selection:bg-monjez-accent selection:text-white`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SmoothScroll>
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-monjez-blue/20 blur-[120px] mix-blend-screen animate-pulse-slow" />
            </div>
            {children}
          </SmoothScroll>
          <Script
            src="https://checkout.freemius.com/js/v1/"
            strategy="beforeInteractive"
          />
          {/* Google Analytics Tag */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-5ZEJN3652H"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-5ZEJN3652H');
            `}
          </Script>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

