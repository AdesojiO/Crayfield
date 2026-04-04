import { useState, useEffect } from 'react'
import { submitWholesaleEnquiry } from '../lib/api'

const BUSINESS_TYPES = ['African grocery shop', 'Restaurant / suya spot', 'Caterer / event company', 'Market trader', 'Cash & carry', 'Other']

export default function Wholesale() {
  const [form, setForm]   = useState({ business_name: '', business_type: '', postcode: '', monthly_spend: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    document.title = 'Wholesale | Crayfield'
  }, [])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitWholesaleEnquiry(form)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 md:py-20">
        <div className="page-container">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-2">Trade &amp; Wholesale</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Supply Your Business<br className="hidden md:block" /> with Crayfield
          </h1>
          <p className="text-white/65 text-lg max-w-[50ch] mb-8">
            Competitive case prices, consistent quality, and fast UK-wide delivery. Trusted by African grocers and restaurants.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-white/75">
            <span className="trust-item before:text-brand before:content-['✓']">African grocery shops</span>
            <span className="trust-item before:text-brand before:content-['✓']">Restaurants &amp; caterers</span>
            <span className="trust-item before:text-brand before:content-['✓']">Market traders</span>
            <span className="trust-item before:text-brand before:content-['✓']">Cash &amp; carry buyers</span>
          </div>
        </div>
      </section>

      <div className="page-container py-16 grid lg:grid-cols-2 gap-16">

        {/* Info column */}
        <div>
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <ol className="space-y-6">
            {[
              { n: '1', title: 'Send an enquiry', text: 'Fill in the form or WhatsApp us directly. We aim to respond within 1 working day.' },
              { n: '2', title: 'Receive your price list', text: "We'll send our current wholesale price list, including case sizes, MOQs, and lead times." },
              { n: '3', title: 'Place your first order', text: 'Pay by BACS or card. Your order is picked, sealed, and dispatched within 24–48 hours.' },
            ].map(({ n, title, text }) => (
              <li key={n} className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-brand text-white font-black flex items-center justify-center shrink-0 text-sm">{n}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-neutral-muted leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 bg-brand-light rounded-2xl p-6 grid grid-cols-2 gap-4">
            {[{ value: '£150', label: 'Min. order (MOQ)' }, { value: '24–48h', label: 'Dispatch time' }, { value: 'UK-wide', label: 'Delivery' }, { value: 'BACS / Card', label: 'Payment' }].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-brand">{value}</p>
                <p className="text-xs text-neutral-muted font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={`https://wa.me/${import.meta.env.VITE_WA_NUMBER ?? '447000000000'}?text=Hi%20Crayfield%2C%20I'd%20like%20to%20enquire%20about%20wholesale.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Prefer to WhatsApp us instead?
            </a>
          </div>
        </div>

        {/* Enquiry form */}
        <div>
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-6">Request Price List &amp; Enquire</h2>
            {status === 'success' ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-4">✅</p>
                <p className="font-bold text-lg text-gray-900 mb-2">Enquiry received!</p>
                <p className="text-neutral-muted text-sm">We'll send your price list and follow up within 1 working day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'business_name', label: 'Business name', type: 'text', placeholder: 'Mama Tee Foods', required: true },
                  { id: 'postcode',      label: 'Postcode',       type: 'text', placeholder: 'E.g. B1 1AA', required: true },
                  { id: 'phone',         label: 'Phone / WhatsApp', type: 'tel', placeholder: '+44 7XXX XXXXXX' },
                  { id: 'email',         label: 'Email address',  type: 'email', placeholder: 'you@yourbusiness.co.uk', required: true },
                  { id: 'monthly_spend', label: 'Estimated monthly spend', type: 'text', placeholder: 'E.g. £200–500' },
                ].map(({ id, label, type, placeholder, required }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {label}{required && <span className="text-brand ml-0.5">*</span>}
                    </label>
                    <input
                      id={id} type={type} placeholder={placeholder} required={required}
                      value={form[id]} onChange={set(id)}
                      className="w-full px-4 py-3 border-2 border-neutral-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="business_type" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Business type<span className="text-brand ml-0.5">*</span>
                  </label>
                  <select
                    id="business_type" required
                    value={form.business_type} onChange={set('business_type')}
                    className="w-full px-4 py-3 border-2 border-neutral-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors bg-white"
                  >
                    <option value="">Select type…</option>
                    {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">Additional notes (optional)</label>
                  <textarea
                    id="message" rows={3} placeholder="Any specific products, quantities, or questions?"
                    value={form.message} onChange={set('message')}
                    className="w-full px-4 py-3 border-2 border-neutral-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again or WhatsApp us directly.</p>
                )}

                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
                  {status === 'loading' ? 'Sending…' : 'Send enquiry'}
                </button>
                <p className="text-xs text-neutral-muted text-center">We respond within 1 working day.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
