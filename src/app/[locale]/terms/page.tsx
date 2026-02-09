"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-monjez-dark text-gray-300">
            <Header />

            <div className="container mx-auto px-4 md:px-6 py-32 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-gray-400 mb-12">Last Updated: Februrary 9, 2026</p>

                <div className="space-y-12 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p className="mb-4">
                            These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("Client", "User", "You") and <strong>Monjez</strong> ("Company", "We", "Us", or "Our"), concerning your access to and use of the <a href="https://monjez.com" className="text-monjez-accent hover:underline">https://monjez.com</a> website, our SaaS products, Strategy Calls, and Subscription Services (collectively, the "Services").
                        </p>
                        <p>
                            By accessing the Services, you confirm that you have read, understood, and agreed to be bound by all of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Services Provided</h2>
                        <p className="mb-4">Monjez provides:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li><strong>Strategy Calls:</strong> Consulting sessions for AI infrastructure.</li>
                            <li><strong>Custom AI Systems:</strong> Tailored AI solutions deployed for your business.</li>
                            <li><strong>Digital Workflow Templates:</strong> Pre-built automation scripts and templates (one-time purchase).</li>
                            <li><strong>Monthly Maintenance:</strong> Ongoing support and updates for AI systems (Subscription).</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property Rights</h2>
                        <p className="mb-4">
                            Unless otherwise indicated, the Services and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">License for Digital Products</h3>
                        <p className="mb-4">
                            When you purchase a Digital Workflow Template, we grant you a <strong>non-exclusive, non-transferable, perpetual license</strong> to use the product for your own internal business purposes. You may <strong>not</strong> resell, redistribute, or sub-license the source code or templates to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. User Representations</h2>
                        <p className="mb-4">By using the Services, you represent and warrant that:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms.</li>
                            <li>You will not access the Services through automated or non-human means (e.g., bots, scrapers).</li>
                            <li>You will not use the Services for any illegal or unauthorized purpose.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Payments and Refunds</h2>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">A. Payment Terms</h3>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>We use <strong>Freemius</strong> as our payment processor. By making a purchase, you agree to Freemius's terms of service.</li>
                            <li><strong>Subscriptions:</strong> Monthly maintenance ($450/month) is billed in advance. You authorize us to charge your payment method on a recurring basis.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">B. Refund Policy</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Strategy Calls:</strong> Refundable if canceled at least 24 hours in advance. No refunds for completed calls.</li>
                            <li><strong>Digital Products:</strong> Due to the nature of digital goods (immediate access to source code/templates), all sales of Digital Workflow Templates are <strong>final and non-refundable</strong>.</li>
                            <li><strong>Subscriptions:</strong> You may cancel your monthly maintenance subscription at any time. Cancellations will take effect at the end of the current billing cycle. No partial refunds are issued for unused days.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer and No Guarantees</h2>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">No Results Guarantee</h3>
                        <p className="mb-4">
                            Monjez provides AI infrastructure and strategies based on current best practices. However, AI results can vary based on data quality, model updates (e.g., OpenAI or Anthropic changes), and market conditions. <strong>We make no guarantees regarding specific revenue increases, operational savings, or business outcomes.</strong>
                        </p>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">"As Is" Service</h3>
                        <p className="mb-4">
                            The Services are provided on an "AS-IS" and "AS-AVAILABLE" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the Services and your use thereof.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                        <p className="mb-4">
                            In no event will Monjez, our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Services, even if we have been advised of the possibility of such damages.
                        </p>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">Liability Cap</h3>
                        <p className="mb-4">
                            Notwithstanding anything to the contrary contained herein, our liability to you for any cause whatsoever and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us during the six (6) month period prior to any cause of action arising.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. AI Usage and Third-Party Services</h2>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">A. AI Output Accuracy</h3>
                        <p className="mb-4">
                            You acknowledge that AI systems (LLMs) can produce "hallucinations" or inaccurate information. You represent that you will not rely solely on AI outputs for critical financial, legal, or medical decisions without human review.
                        </p>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">B. Third-Party Dependencies</h3>
                        <p className="mb-4">
                            Our services rely on third-party APIs (e.g., OpenAI, Supabase, Meta). We are not responsible for service interruptions caused by these third-party providers.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
                        <p className="mb-4">
                            We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                        </p>
                        <p className="mb-4">
                            If you wish to terminate your account, you may simply discontinue using the Services or cancel your subscription via the Freemius portal.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law and Dispute Resolution</h2>
                        <p className="mb-4">
                            These Terms shall be governed by and defined following applicable international commercial laws. Monjez and yourself irrevocably consent that the courts of the country in which Monjez is legally registered shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">Dispute Resolution</h3>
                        <p className="mb-4">
                            In the event of any dispute, the parties agree to first attempt to resolve the issue informally for at least thirty (30) days before initiating arbitration or legal action.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
                        <p className="mb-4">
                            You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your use of the Services; (2) breach of these Terms; or (3) your violation of the rights of a third party, including but not limited to intellectual property rights.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Modifications</h2>
                        <p className="mb-4">
                            We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We also reserve the right to modify these Terms at any time. All changes are effective immediately when we post them.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
                        <p className="mb-4">In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
                        <ul className="list-none space-y-2">
                            <li><strong>Monjez</strong></li>
                            <li>Email: support@monjez.com</li>
                        </ul>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
