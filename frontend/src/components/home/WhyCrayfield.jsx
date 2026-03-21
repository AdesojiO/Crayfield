import { HandMetal, PackageCheck, ScanBarcode, Zap } from 'lucide-react'

const PILLARS = [
  {
    icon: HandMetal,
    color: 'bg-amber-50 text-amber-600',
    title: 'Hand-Cleaned',
    text: 'Each batch is hand-sorted to remove shells, sand, and debris before packing.',
  },
  {
    icon: PackageCheck,
    color: 'bg-green-50 text-green-600',
    title: 'Sealed Fresh',
    text: 'Hermetically sealed packaging locks in aroma and freshness from source to your kitchen.',
  },
  {
    icon: ScanBarcode,
    color: 'bg-blue-50 text-blue-600',
    title: 'Batch-Traced',
    text: 'Every pack carries a batch ID and best-before date for complete traceability.',
  },
  {
    icon: Zap,
    color: 'bg-brand/10 text-brand',
    title: 'Fast Dispatch',
    text: 'UK-wide dispatch — most orders shipped within 24 hours of placement.',
  },
]

export default function WhyCrayfield() {
  return (
    <section className="py-16 md:py-24 bg-neutral-bg" aria-label="Why Crayfield">
      <div className="page-container">

        <div className="text-center mb-14">
          <p className="section-eyebrow">Quality Promise</p>
          <h2 className="section-title mb-3">Why Choose Crayfield?</h2>
          <p className="section-subtitle mx-auto">
            Every pack meets our strict quality standard before it ever leaves our hands.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {PILLARS.map(({ icon: Icon, color, title, text }) => (
            <li
              key={title}
              className="bg-white rounded-2xl p-6 shadow-card hover:-translate-y-1.5 transition-transform duration-200 flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-sm text-neutral-muted leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
