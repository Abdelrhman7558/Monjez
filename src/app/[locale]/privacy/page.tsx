"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-monjez-dark text-gray-300">
            <Header />

            <div className="container mx-auto px-4 md:px-6 py-32 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
                <p className="text-gray-400 mb-12">Effective Date: Februrary 9, 2026</p>

                <div className="space-y-12 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            Monjez ("Company", "We", "Us", or "Our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://monjez.com" className="text-monjez-accent hover:underline">https://monjez.com</a>, use our SaaS products, strategy calls, digital workflows, or subscription services (collectively, the "Services").
                        </p>
                        <p>
                            By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p className="mb-4">We utilize Supabase (PostgreSQL) for secure data storage. We collect information in the following ways:</p>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">A. Personal Data</h3>
                        <p className="mb-4">You may provide us with "Personal Data" when you book a strategy call, purchase a digital product, or subscribe to our maintenance services. This includes:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Identifying Information:</strong> Application name, email address (support@monjez.com), phone number, and physical address (if billing requires).</li>
                            <li><strong>Payment Data:</strong> We use <strong>Freemius</strong> to process payments. We do <em>not</em> store your credit card information on our servers. All payment data is handled by Freemius in compliance with PCI-DSS standards.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">B. Usage Data & Analytics</h3>
                        <p className="mb-4">We use <strong>Google Analytics 4 (GA4)</strong> and <strong>Meta Pixel</strong> to understand how you use our website. This data is anonymized and includes:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Browser type and version.</li>
                            <li>Device information.</li>
                            <li>Pages viewed and time spent on pages.</li>
                            <li>Referral sources.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">C. AI System & Inputs</h3>
                        <p className="mb-4">When you use our Custom AI Systems or Digital Workflows:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Input Data:</strong> Text, documents, or data you feed into our AI tools.</li>
                            <li><strong>Output Data:</strong> The AI-generated results.</li>
                            <li><em>Note:</em> We do not use your proprietary business data to train our public models unless explicitly agreed upon in a simplified Enterprise license.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">We use your data to:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li><strong>Provide Services:</strong> Deliver strategy calls, automated workflows, and maintain your AI infrastructure.</li>
                            <li><strong>Process Transactions:</strong> Securely process payments via Freemius.</li>
                            <li><strong>Improve Products:</strong> Analyze user behavior to optimize our AI systems and website performance.</li>
                            <li><strong>Communication:</strong> Send you operational updates, invoices, and support responses.</li>
                            <li><strong>Marketing:</strong> If you opt-in, we use Webhooks and Meta Pixel to deliver relevant content and advertisements.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Disclosure of Your Information</h2>
                        <p className="mb-4">We do not sell your Personal Data. We may share information with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Service Providers:</strong> Third-party vendors who perform services for us (e.g., Supabase for hosting, Freemius for payments, Calendly for booking).</li>
                            <li><strong>Legal Requirements:</strong> If required by law, court order, or governmental regulation.</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or asset transfer.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
                        <p className="mb-4">We retain your Personal Data only as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Data:</strong> Retained while your subscription is active.</li>
                            <li><strong>Transaction Records:</strong> Retained for 7 years for tax and accounting purposes.</li>
                            <li><strong>AI Inputs:</strong> Retained for 30 days for processing and debugging, then deleted, unless otherwise configured in your custom Enterprise plan.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Security of Your Information</h2>
                        <p>We use administrative, technical, and physical security measures, including encrypted Supabase storage and SSL protocols, to protect your personal information. However, no electronic transmission is 100% secure, and we cannot guarantee absolute security.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
                        <p>Our Services are intended for businesses and professionals. We do not knowingly collect data from children under 18.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Your Data Protection Rights (GDPR & CCPA)</h2>
                        <p className="mb-4">Depending on your location, you may have the following rights:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Access:</strong> Request copies of your personal data.</li>
                            <li><strong>Correction:</strong> Request that we correct any information you believe is inaccurate.</li>
                            <li><strong>Erasure:</strong> Request that we delete your personal data ("Right to be Forgotten").</li>
                            <li><strong>Opt-Out:</strong> Opt-out of marketing communications.</li>
                        </ul>
                        <p>To exercise these rights, please contact us at <strong>support@monjez.com</strong>.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Cookies and Tracking Technologies</h2>
                        <p className="mb-4">We use cookies to enhance your experience.</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Essential Cookies:</strong> Necessary for the website to function.</li>
                            <li><strong>Analytics Cookies:</strong> GA4 cookies to track website usage.</li>
                            <li><strong>Marketing Cookies:</strong> Meta Pixel cookies for ad targeting.</li>
                        </ul>
                        <p>You can choose to disable cookies through your browser settings.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Websites</h2>
                        <p>Our website may contain links to third-party sites (e.g., Calendly). We are not responsible for the privacy practices of these external sites.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
                        <p>We may update this policy from time to time. The "Effective Date" at the top will be updated accordingly. We encourage you to review this policy periodically.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
                        <p className="mb-4">If you have questions about this Privacy Policy, please contact us:</p>
                        <ul className="list-none space-y-2">
                            <li><strong>Email:</strong> support@monjez.com</li>
                            <li><strong>Company Name:</strong> Monjez</li>
                        </ul>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
