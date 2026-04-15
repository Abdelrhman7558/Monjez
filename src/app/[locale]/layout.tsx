import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SmoothScroll } from "@/components/smooth-scroll";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

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
        className={`${outfit.variable} font-sans bg-monjez-dark text-monjez-text`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SmoothScroll>
            {/* Ambient glow — single warm amber, not purple */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-monjez-accent/5 blur-[140px] animate-pulse-slow" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-monjez-accent/3 blur-[160px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
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
          {/* Apollo Tracking Code */}
          <Script id="apollo-tracker" strategy="beforeInteractive">
            {`
              function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"698f17f104ee2100151aebbf"})},
              document.head.appendChild(o)}initApollo();
            `}
          </Script>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

