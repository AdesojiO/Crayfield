import { Link } from 'react-router-dom'
import { ShoppingCart, PackageCheck, Truck } from 'lucide-react'

const STEPS = [
  {
    icon: ShoppingCart,
    title: 'Choose Your Pack',
    text: 'Browse our range and select your size — 50g up to bulk wholesale cases.',
  },
  {
    icon: PackageCheck,
    title: 'We Pack & Seal',
    text: 'Your order is freshness-checked, sealed, and labelled with batch and best-before.',
  },
  {
    icon: Truck,
    title: 'Fast UK Delivery',
    text: 'Dispatched same or next working day. Tracked to your door, UK-wide.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-brand-light" aria-label="How it works">
      <div className="page-container">

        <div className="text-center mb-14">
          <p className="section-eyebrow">Simple Process</p>
          <h2 className="section-title">Order in 3 Easy Steps</h2>
        </div>

        {/* Steps */}
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" role="list">
          {/* Desktop connector line */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px"
            style={{ background: 'repeating-linear-gradient(90deg,#C0622A 0,#C0622A 8px,transparent 8px,transparent 16px)' }}
            aria-hidden="true"
          />

          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="bg-white rounded-2xl p-7 shadow-card relative z-10 flex flex-col items-center text-center gap-4">
              {/* Step number ring */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center shadow-btn">
                  <Icon size={26} className="text-white" strokeWidth={1.8} />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-brand text-brand text-xs font-black flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
                <p className="text-sm text-neutral-muted leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="text-center mt-12">
          <Link to="/shop" className="btn-primary">
            <ShoppingCart size={18} />
            Shop now
          </Link>
        </div>

      </div>
    </section>
  )
}
