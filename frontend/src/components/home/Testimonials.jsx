import { Quote, Star } from 'lucide-react'

const REVIEWS = [
  {
    stars: 5,
    quote: 'Freshest crayfish I have ever ordered online. Properly cleaned, sealed well and arrived fast.',
    name: 'Amaka O.',
    role: 'London',
    initial: 'A',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    stars: 5,
    quote: 'We stock Crayfield in our shop and customers keep coming back. Consistent quality every time.',
    name: 'Tunde A.',
    role: 'Shop owner, Birmingham',
    initial: 'T',
    color: 'bg-green-100 text-green-600',
  },
  {
    stars: 5,
    quote: 'The ground crayfish is incredible — you can smell the freshness through the packaging. Will never go back to supermarket brands.',
    name: 'Ngozi K.',
    role: 'Manchester',
    initial: 'N',
    color: 'bg-blue-100 text-blue-600',
  },
]

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24" aria-label="Customer reviews">
      <div className="page-container">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-eyebrow">Reviews</p>
          <h2 className="section-title mb-3">What Our Customers Say</h2>
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800">4.9 / 5.0</span>
            <span className="text-sm text-neutral-muted">from 120+ reviews</span>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          {REVIEWS.map(({ stars, quote, name, role, initial, color }) => (
            <li key={name} className="bg-white rounded-2xl p-7 shadow-card flex flex-col border border-neutral-border hover:border-brand/30 hover:shadow-lg transition-all duration-200">

              {/* Quote icon */}
              <div className="mb-4">
                <Quote size={28} className="text-brand/20 fill-brand/10" />
              </div>

              <StarRow count={stars} />

              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">
                "{quote}"
              </blockquote>

              {/* Reviewer */}
              <footer className="flex items-center gap-3 pt-4 border-t border-neutral-border">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${color}`}>
                  {initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{name}</p>
                  <p className="text-xs text-neutral-muted">{role}</p>
                </div>
              </footer>

            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
