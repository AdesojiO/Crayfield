import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms & Conditions | Crayfield'
  }, [])

  return (
    <div className="page-container py-16 max-w-3xl">
      <p className="section-eyebrow">Legal</p>
      <h1 className="section-title mb-2">Terms &amp; Conditions</h1>
      <p className="text-sm text-neutral-muted mb-10">Last updated: March 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed text-sm">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. About us</h2>
          <p>
            These terms apply to purchases made from Crayfield Global Ltd ("Crayfield", "we", "us"),
            a UK-registered company. By placing an order on this website you agree to these terms.
          </p>
          <p className="mt-2">
            Contact us at{' '}
            <a href="mailto:hello@crayfield.co.uk" className="text-brand hover:underline">hello@crayfield.co.uk</a>{' '}
            or via our <Link to="/contact" className="text-brand hover:underline">contact page</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Formation of contract</h2>
          <p>
            When you place an order you are making an offer to purchase. A contract is formed only when
            we send you an order confirmation email. We reserve the right to decline any order (for
            example where a product is out of stock or where we suspect fraud).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. Prices and payment</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>All prices are displayed in pounds sterling (GBP) and include VAT where applicable.</li>
            <li>We accept payment by debit card, credit card (via Stripe), and PayPal.</li>
            <li>Payment is taken at the point of order placement.</li>
            <li>We reserve the right to change prices at any time. Price changes do not affect existing confirmed orders.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. Cancellation rights — Consumer Contracts Regulations 2013</h2>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="font-semibold text-amber-900 mb-1">Important — perishable goods exemption</p>
            <p className="text-amber-800">
              Under Regulation 28(b) of the Consumer Contracts Regulations 2013, the 14-day right to
              cancel does not apply to goods that are liable to deteriorate or expire rapidly, which
              includes our crayfish products. Once dispatched, crayfish orders cannot be cancelled or
              returned simply because you have changed your mind.
            </p>
          </div>

          <p>
            If your order includes non-perishable items (such as dried seasonings or packaging accessories
            that we may sell in future), you retain the standard 14-day cooling-off period for those items.
            To exercise that right, notify us in writing within 14 days of receiving the goods. You must
            then return the items within a further 14 days at your own expense. We will refund within
            14 days of receiving the returned goods, using your original payment method.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">5. Damaged, missing, or incorrect orders</h2>
          <p>
            If your order arrives damaged, incomplete, or incorrect, please contact us within 48 hours
            of delivery with photos and your order number. We will offer a replacement, a partial refund,
            or a full refund at our discretion and in accordance with your statutory rights under the
            Consumer Rights Act 2015.
          </p>
          <p className="mt-2">
            Your statutory rights are not affected by these terms. For full details see our{' '}
            <Link to="/policies/delivery" className="text-brand hover:underline">Delivery &amp; Returns policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">6. Allergen information</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-semibold text-red-900 mb-1">Shellfish allergen</p>
            <p className="text-red-800">
              All Crayfield products contain shellfish (crayfish). They are not suitable for people
              with shellfish allergies. Products are handled and packed in a facility that processes
              shellfish. Do not purchase if you or someone in your household has a shellfish allergy.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">7. Delivery</h2>
          <p>
            Delivery timescales and charges are set out in our{' '}
            <Link to="/policies/delivery" className="text-brand hover:underline">Delivery &amp; Returns policy</Link>.
            Risk in the goods passes to you on delivery. Title passes on full payment.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">8. Limitation of liability</h2>
          <p>
            We are not liable for any indirect, consequential, or special loss arising from your use
            of our products or website, except where such liability cannot be excluded by law (for
            example, death or personal injury caused by our negligence, or fraud or fraudulent
            misrepresentation).
          </p>
          <p className="mt-2">
            Our total liability to you in respect of any claim arising from an order is limited to the
            price paid for that order.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">9. Wholesale terms</h2>
          <p>
            Separate wholesale terms apply to trade and bulk orders. These are provided with your
            wholesale price list. Consumer statutory rights do not apply to trade buyers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">10. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes will be subject
            to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">11. Changes to these terms</h2>
          <p>
            We may update these terms at any time. The version in force at the time you place your
            order applies to that order. We encourage you to review these terms before ordering.
          </p>
        </section>

      </div>
    </div>
  )
}
