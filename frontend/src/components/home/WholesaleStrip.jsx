import { Link } from 'react-router-dom'
import { Store, Clock, MapPin, CreditCard, MessageCircle, FileText } from 'lucide-react'
import { IMAGES } from '../../lib/images'

const BUYER_TYPES = [
  'African grocery shops',
  'Restaurants & suya spots',
  'Caterers & event chefs',
  'Market traders',
]

const STATS = [
  { icon: Store,      value: '50+',     label: 'Trade accounts' },
  { icon: Clock,      value: '24h',     label: 'Avg dispatch' },
  { icon: MapPin,     value: 'UK-wide', label: 'Delivery' },
  { icon: CreditCard, value: '£150',    label: 'Min. order' },
]

const WA_NUMBER  = '447000000000'
const WA_MESSAGE = encodeURIComponent("Hi Crayfield, I'd like to enquire about wholesale pricing.")

export default function WholesaleStrip() {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white overflow-hidden relative" aria-label="Wholesale">

      {/* Background image with overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={IMAGES.wholesale}
          alt=""
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
      </div>

      <div className="page-container relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Content ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
              Trade &amp; Wholesale
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Supply Your Shop,<br />Restaurant, or<br />Catering Business
            </h2>
            <p className="text-white/65 leading-relaxed mb-6 max-w-[46ch]">
              Competitive case prices, fast turnaround, and consistent quality. Trusted by African grocers and restaurants across the UK.
            </p>

            {/* Buyer type tags */}
            <ul className="flex flex-wrap gap-2 mb-8" role="list">
              {BUYER_TYPES.map(t => (
                <li key={t} className="flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
                  <Store size={13} className="text-brand-muted" />
                  {t}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/wholesale" className="btn-dark-outline">
                <FileText size={17} />
                Request price list
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={17} />
                WhatsApp us
              </a>
            </div>
          </div>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-brand/20 flex items-center justify-center">
                  <Icon size={20} className="text-brand-muted" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white leading-none">{value}</p>
                  <p className="text-xs text-white/50 font-medium mt-1 uppercase tracking-wider">{label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
