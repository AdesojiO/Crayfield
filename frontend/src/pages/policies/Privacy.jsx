import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Crayfield'
  }, [])

  return (
    <div className="page-container py-16 max-w-3xl">
      <p className="section-eyebrow">Legal</p>
      <h1 className="section-title mb-2">Privacy Policy</h1>
      <p className="text-sm text-neutral-muted mb-10">Last updated: March 2026</p>

      <div className="prose prose-sm max-w-none space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. Who we are</h2>
          <p>
            Crayfield Global Ltd ("Crayfield", "we", "us", "our") is the data controller for personal
            data collected through this website. We are a UK-registered company supplying Nigerian
            crayfish and African food products.
          </p>
          <p className="mt-2">
            Contact us about data protection matters by email at{' '}
            <a href="mailto:hello@crayfield.co.uk" className="text-brand hover:underline">
              hello@crayfield.co.uk
            </a>{' '}
            or via our <Link to="/contact" className="text-brand hover:underline">contact page</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Data we collect</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Order data:</strong> name, delivery address, email address, phone number, and order details (items, quantities, prices).</li>
            <li><strong>Payment data:</strong> we do not store card details. Payment is processed by Stripe, a PCI-DSS-compliant processor.</li>
            <li><strong>Newsletter / marketing:</strong> email address (only when you explicitly subscribe).</li>
            <li><strong>WhatsApp enquiries:</strong> your WhatsApp display name and the content of messages you send us.</li>
            <li><strong>Wholesale enquiries:</strong> business name, postcode, business type, estimated monthly spend, phone, and email.</li>
            <li><strong>Website usage data:</strong> pages visited, session duration, device type, and approximate location (country/region) — collected via Google Analytics only after you give cookie consent.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. How we use your data and our legal basis</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="border border-gray-200 px-3 py-2 font-semibold">Purpose</th>
                  <th className="border border-gray-200 px-3 py-2 font-semibold">Legal basis (UK GDPR Art. 6)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Processing and fulfilling your order', 'Performance of a contract (Art. 6(1)(b))'],
                  ['Sending order confirmations and delivery updates', 'Performance of a contract (Art. 6(1)(b))'],
                  ['Sending newsletters and promotional emails', 'Consent (Art. 6(1)(a)) — you can withdraw at any time'],
                  ['Preventing fraud and ensuring website security', 'Legitimate interests (Art. 6(1)(f))'],
                  ['Complying with tax and accounting obligations', 'Legal obligation (Art. 6(1)(c))'],
                  ['Improving our website via analytics', 'Consent (Art. 6(1)(a)) — only after cookie consent'],
                ].map(([purpose, basis]) => (
                  <tr key={purpose}>
                    <td className="border border-gray-200 px-3 py-2">{purpose}</td>
                    <td className="border border-gray-200 px-3 py-2 text-neutral-muted">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. Third parties we share data with</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Stripe:</strong> payment processing. Stripe is PCI-DSS Level 1 certified. Their privacy policy is at <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">stripe.com/gb/privacy</a>.</li>
            <li><strong>Google Analytics:</strong> website usage analytics. Only activated after you give cookie consent. Data is processed in accordance with Google's privacy policy.</li>
            <li><strong>Meta (Facebook) Pixel:</strong> marketing analytics. Only activated after you give cookie consent for marketing cookies.</li>
            <li><strong>Email service provider:</strong> used to send transactional emails (order confirmations) and newsletter emails.</li>
            <li><strong>Delivery carriers</strong> (Royal Mail, DPD, Evri): your name and delivery address are passed to the carrier to fulfil your order.</li>
          </ul>
          <p className="mt-3">We do not sell your personal data to any third party.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">5. How long we keep your data</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Order data:</strong> 7 years from the date of sale, as required by UK tax law (HMRC).</li>
            <li><strong>Newsletter subscribers:</strong> until you unsubscribe. Every marketing email includes an unsubscribe link.</li>
            <li><strong>Wholesale enquiry data:</strong> 2 years from the date of enquiry, or until you ask us to delete it.</li>
            <li><strong>Website analytics data:</strong> as per Google Analytics default retention (26 months), subject to your consent settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">6. Your rights under UK GDPR</h2>
          <p className="mb-2">You have the following rights over your personal data:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Right of access:</strong> request a copy of the data we hold about you.</li>
            <li><strong>Right to rectification:</strong> ask us to correct inaccurate data.</li>
            <li><strong>Right to erasure ("right to be forgotten"):</strong> ask us to delete your data, subject to legal retention obligations.</li>
            <li><strong>Right to data portability:</strong> receive your data in a structured, machine-readable format.</li>
            <li><strong>Right to object:</strong> object to processing based on legitimate interests, including direct marketing.</li>
            <li><strong>Right to restrict processing:</strong> ask us to pause processing while a complaint is investigated.</li>
            <li><strong>Right to withdraw consent:</strong> where we rely on consent, you can withdraw it at any time without affecting the lawfulness of prior processing.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:hello@crayfield.co.uk" className="text-brand hover:underline">hello@crayfield.co.uk</a>.
            We will respond within 30 days.
          </p>
          <p className="mt-2">
            You also have the right to lodge a complaint with the UK supervisory authority, the Information
            Commissioner's Office (ICO), at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">ico.org.uk</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">7. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies on this website. For full details, including
            how to manage your preferences, please read our{' '}
            <Link to="/policies/cookies" className="text-brand hover:underline">Cookie Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">8. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The "Last updated" date at the top of this page
            will reflect any changes. We encourage you to review this policy periodically.
          </p>
        </section>

      </div>
    </div>
  )
}
