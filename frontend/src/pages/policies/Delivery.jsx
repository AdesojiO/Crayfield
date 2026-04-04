import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'

export default function Delivery() {
  useEffect(() => {
    document.title = 'Delivery & Returns | Crayfield'
  }, [])

  return (
    <div className="page-container py-16 max-w-3xl">
      <p className="section-eyebrow">Policies</p>
      <h1 className="section-title mb-2">Delivery &amp; Returns</h1>
      <p className="text-sm text-neutral-muted mb-10">Last updated: March 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed text-sm">

        {/* Delivery options */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Truck size={18} className="text-brand shrink-0" />
            <h2 className="text-lg font-bold text-gray-900">Delivery options</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Service</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Timescale</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Standard (Royal Mail / Evri)</td>
                  <td className="border border-gray-200 px-3 py-2">2–5 working days</td>
                  <td className="border border-gray-200 px-3 py-2">From £2.99</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">Tracked Standard</td>
                  <td className="border border-gray-200 px-3 py-2">2–3 working days</td>
                  <td className="border border-gray-200 px-3 py-2">From £3.99</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Express (DPD next working day)</td>
                  <td className="border border-gray-200 px-3 py-2">Next working day</td>
                  <td className="border border-gray-200 px-3 py-2">From £6.99</td>
                </tr>
                <tr className="bg-brand-light">
                  <td className="border border-gray-200 px-3 py-2 font-semibold text-brand">Free delivery</td>
                  <td className="border border-gray-200 px-3 py-2">2–5 working days</td>
                  <td className="border border-gray-200 px-3 py-2 font-semibold text-brand">Orders over £40</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="list-disc pl-5 mt-4 space-y-1.5">
            <li>Orders placed before 12pm (Monday–Friday) are dispatched the same day.</li>
            <li>Orders placed after 12pm or on weekends are dispatched the next working day.</li>
            <li>We deliver UK-wide, including Northern Ireland and Scottish Highlands (standard timescales may be 1–2 days longer for remote areas).</li>
            <li>You will receive a dispatch confirmation email with tracking information (where available).</li>
          </ul>
        </section>

        {/* Returns */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw size={18} className="text-brand shrink-0" />
            <h2 className="text-lg font-bold text-gray-900">Returns</h2>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="font-semibold text-amber-900 mb-1">Perishable goods</p>
            <p className="text-amber-800">
              Crayfish is a perishable food product. Under the Consumer Contracts Regulations 2013
              (Reg. 28(b)), you do not have the standard 14-day right to cancel for perishable goods
              if you simply change your mind. Returns of perishable items are only accepted where the
              product is damaged, faulty, or not as described.
            </p>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2">How to return</h3>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>Contact us within 48 hours of delivery at <a href="mailto:hello@crayfield.co.uk" className="text-brand hover:underline">hello@crayfield.co.uk</a> with your order number and photos of the issue.</li>
            <li>We will assess the return request and, where approved, provide a return label or arrange a collection.</li>
            <li>Items must be returned in their original, sealed condition (for non-perishable items).</li>
          </ol>

          <h3 className="font-semibold text-gray-900 mt-5 mb-2">Refunds</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Approved refunds are processed within 14 days of us receiving the returned item, or within 14 days of you notifying us of cancellation (for non-perishable items).</li>
            <li>Refunds are issued to your original payment method.</li>
            <li>If only part of your order is returned, only that portion is refunded.</li>
          </ul>
        </section>

        {/* Damaged goods */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-brand shrink-0" />
            <h2 className="text-lg font-bold text-gray-900">Damaged or missing items</h2>
          </div>
          <p>
            If your order arrives damaged, leaking, or with items missing, please contact us within
            48 hours of delivery. Include photos of the packaging and the affected products.
            We will arrange a replacement or full refund for the affected items.
          </p>
          <p className="mt-2">
            Your statutory rights under the Consumer Rights Act 2015 are not affected by this policy.
          </p>
        </section>

        <div className="bg-gray-50 rounded-xl p-5">
          <p className="text-sm text-neutral-muted">
            Questions about your order? <Link to="/contact" className="text-brand font-semibold hover:underline">Contact us</Link> —
            we aim to respond within 1 working day.
          </p>
        </div>

      </div>
    </div>
  )
}
