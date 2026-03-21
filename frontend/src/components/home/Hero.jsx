import { Link } from 'react-router-dom'
import { ShoppingBag, Building2, ShieldCheck, Truck, Sparkles } from 'lucide-react'
import { IMAGES } from '../../lib/images'

export default function Hero() {
  return (
    <section className="relative bg-brand-light overflow-hidden" aria-label="Hero">

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(circle, #C0622A 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="page-container relative py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Content ── */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles size={12} />
              Premium Nigerian Crayfish
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight mb-5 text-gray-900">
              Clean Crayfish.<br />
              Sealed Fresh.<br />
              <span className="text-brand">Delivered UK‑wide.</span>
            </h1>

            <p className="text-lg text-neutral-muted mb-7 max-w-[44ch] leading-relaxed">
              Hand-sorted, batch-traced, and hermetically sealed — straight from source to your kitchen.
            </p>

            {/* Trust bullets */}
            <div className="flex flex-wrap gap-x-5 gap-y-2.5 mb-8">
              {[
                { icon: ShieldCheck, label: 'Cleaned & sorted' },
                { icon: ShieldCheck, label: 'Sealed freshness' },
                { icon: Building2,   label: 'Wholesale available' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-sm font-semibold text-neutral-muted">
                  <Icon size={15} className="text-brand shrink-0" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/shop" className="btn-primary">
                <ShoppingBag size={18} />
                Shop now
              </Link>
              <Link to="/wholesale" className="btn-outline">
                <Building2 size={18} />
                Wholesale enquiry
              </Link>
            </div>

            {/* Delivery promise */}
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-muted">
              <Truck size={16} className="text-brand shrink-0" />
              Orders placed before 12pm dispatched same day
            </div>
          </div>

          {/* ── Image ── */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={IMAGES.hero}
                alt="Premium crayfish spices displayed at a vibrant market"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              {/* Overlay gradient for text legibility on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
            </div>

            {/* Floating quality badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-light rounded-lg flex items-center justify-center">
                <ShieldCheck size={18} className="text-brand" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Premium Clean</p>
                <p className="text-[11px] text-neutral-muted">Batch-traced grade</p>
              </div>
            </div>

            {/* Floating review badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-4 py-3 text-center">
              <p className="text-amber-400 text-base leading-none">★★★★★</p>
              <p className="text-xs font-bold text-gray-900 mt-1">4.9 / 5.0</p>
              <p className="text-[11px] text-neutral-muted">120+ reviews</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
