"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/hero";
import { ProblemSection } from "@/components/sections/problem";
import { PhilosophySection } from "@/components/sections/philosophy";
import { CoreSystems } from "@/components/sections/core-systems";
import { CaseStudies } from "@/components/sections/case-studies";
import { ProcessSection } from "@/components/sections/process";
import { ComparisonSection } from "@/components/sections/comparison";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { BoutiqueAdvantage } from "@/components/sections/boutique-advantage";
import { EngagementModel } from "@/components/sections/engagement-cta";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { FAQSection } from "@/components/sections/faq";
import { PricingSection } from "@/components/sections/pricing";
import { BookingModal } from "@/components/booking/booking-modal";

import { PlatformTicker } from "@/components/sections/platform-ticker";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState("https://calendly.com/monjez/monjez");

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground" id="book-call" onClick={(e) => {
      // Simple event delegation check for book call buttons
      const trigger = (e.target as HTMLElement).closest('a[href*="#book-call"], button[href*="#book-call"]');
      if (trigger) {
        const type = trigger.getAttribute('data-booking-type');
        if (type === 'vip') {
          setBookingUrl("https://calendly.com/monjez/vip");
        } else {
          setBookingUrl("https://calendly.com/monjez/monjez");
        }
        setIsBookingOpen(true);
      }
    }}>
      <Header />
      <Hero />
      <PlatformTicker />
      <ProblemSection />
      <PhilosophySection />
      <CoreSystems />
      <CaseStudies />
      <ProcessSection />
      <PricingSection />
      <ComparisonSection />
      <WhyChooseUs />
      <BoutiqueAdvantage />
      <ROICalculator />
      <FAQSection />
      <EngagementModel />
      <Footer />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        redirectUrl={bookingUrl}
      />
    </main>
  );
}
