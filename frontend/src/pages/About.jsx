import { Link } from 'react-router-dom'
import { ShieldCheck, PackageCheck, ScanBarcode, Truck, ShoppingBag, Building2 } from 'lucide-react'
import { IMAGES } from '../lib/images'

const QUALITY_POINTS = [
  { icon: ShieldCheck,  title: 'Hand-Cleaned',  text: 'Shells, debris, and undersized pieces removed before packing.' },
  { icon: PackageCheck, title: 'Sealed Fresh',  text: 'Every pack is hermetically sealed to preserve aroma and flavour.' },
  { icon: ScanBarcode,  title: 'Batch-Traced',  text: 'Batch ID and best-before date on every single pack.' },
  { icon: Truck,        title: 'Fast Dispatch', text: 'Same or next-day dispatch. Tracked delivery UK-wide.' },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brand-light overflow-hidden py-16 md:py-24">
        <div className="page-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-eyebrow">Our Story</p>
            <h1 className="section-title mb-5">
              Quality Nigerian Crayfish,<br />Done Properly
            </h1>
            <p className="text-lg text-neutral-muted leading-relaxed">
              Crayfield started with a simple frustration: crayfish bought in the UK was often gritty,
              inconsistently cleaned, and poorly packaged. We set out to change that — sourcing direct,
              cleaning thoroughly, and sealing properly before it ever reaches your kitchen.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img
              src={IMAGES.marketStall}
              alt="Vibrant African spice and ingredient market stall"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Quality standard */}
      <section className="py-16 md:py-20 bg-neutral-bg">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Quality Standard</p>
            <h2 className="section-title">How We Ensure Every Pack is Right</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUALITY_POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-white rounded-2xl p-6 shadow-card flex flex-col gap-4">
                <div className="w-11 h-11 bg-brand-light rounded-xl flex items-center justify-center">
                  <Icon size={20} className="text-brand" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-neutral-muted leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-16 md:py-20">
        <div className="page-container max-w-3xl">
          <h2 className="text-2xl font-bold mb-5">Who We Are</h2>
          <p className="text-neutral-muted leading-relaxed mb-6">
            Crayfield Global Ltd is a UK-registered business supplying premium Nigerian crayfish to
            households, African grocery shops, restaurants, and caterers across the UK. We believe the
            African pantry deserves the same sourcing rigour as any premium food category.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
            <p className="text-sm font-bold text-amber-800 mb-1 flex items-center gap-2">
              <ShieldCheck size={15} /> Allergen Notice
            </p>
            <p className="text-sm text-amber-700">
              All Crayfield products contain shellfish (crayfish). Please check individual product labels
              for specific allergen information before purchase.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">
              <ShoppingBag size={17} />
              Shop now
            </Link>
            <Link to="/wholesale" className="btn-outline">
              <Building2 size={17} />
              Wholesale enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
