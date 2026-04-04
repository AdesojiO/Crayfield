import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ShoppingBag, ChevronLeft, ShieldCheck, Truck, PackageCheck, RotateCcw, Check } from 'lucide-react'
import { getProduct } from '../lib/api'
import { useCartStore } from '../store/cartStore'
import { IMAGES } from '../lib/images'

const TRUST_BADGES = [
  { icon: ShieldCheck,  text: 'Hand-cleaned and graded' },
  { icon: PackageCheck, text: 'Hermetically sealed for freshness' },
  { icon: ShieldCheck,  text: 'Batch ID & best-before on every pack' },
  { icon: Truck,        text: 'Orders before 12pm dispatched same day' },
]

export default function Product() {
  const { slug }   = useParams()
  const addItem    = useCartStore(s => s.addItem)
  const [selectedVariantId, setSelectedVariantId] = useState(null)
  const [qty, setQty]   = useState(1)
  const [added, setAdded] = useState(false)

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug),
  })

  useEffect(() => {
    if (product?.name) {
      document.title = `${product.name} | Crayfield`
    }
  }, [product?.name])

  if (isLoading) return (
    <div className="page-container py-16 animate-pulse grid md:grid-cols-2 gap-12">
      <div className="aspect-square bg-gray-100 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-100 rounded-full w-1/3" />
        <div className="h-8 bg-gray-100 rounded-full w-3/4" />
        <div className="h-6 bg-gray-100 rounded-full w-1/4" />
      </div>
    </div>
  )

  if (isError || !product) return (
    <div className="page-container py-20 text-center">
      <p className="text-neutral-muted mb-4">Product not found.</p>
      <Link to="/shop" className="btn-outline">Back to shop</Link>
    </div>
  )

  const activeVariantId = selectedVariantId ?? product.variants?.[0]?.id
  const activeVariant   = product.variants?.find(v => v.id === activeVariantId) ?? product.variants?.[0]
  const price           = activeVariant?.price ?? product.price
  const imgSrc          = product.image_url || IMAGES.groundCrayfish

  const handleAddToCart = () => {
    addItem(product, activeVariantId, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="page-container py-10 md:py-16">

      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-muted hover:text-brand transition-colors">
          <ChevronLeft size={16} /> Back to shop
        </Link>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

        {/* ── Image ── */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-brand-light shadow-card">
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          {/* Thumbnail row (placeholder for multiple images) */}
          <div className="flex gap-2">
            {[imgSrc, IMAGES.spicesMarket].map((src, i) => (
              <div key={i} className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${i === 0 ? 'border-brand' : 'border-neutral-border hover:border-brand/50'}`}>
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Details ── */}
        <div>
          <p className="section-eyebrow capitalize mb-1">{product.category}</p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-black text-brand">£{(price / 100).toFixed(2)}</span>
            {product.variants?.length > 1 && <span className="text-sm text-neutral-muted">for {activeVariant?.label}</span>}
          </div>

          <p className={`text-sm font-semibold mb-6 flex items-center gap-1.5 ${product.in_stock ? 'text-green-600' : 'text-red-500'}`}>
            <span className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-400'}`} />
            {product.in_stock ? 'In stock — ready to dispatch' : 'Out of stock'}
          </p>

          {product.description && (
            <p className="text-neutral-muted leading-relaxed mb-4 text-sm">{product.description}</p>
          )}

          {/* Allergen warning — always visible, never hidden in accordion */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6" role="alert">
            <p className="text-amber-900 font-semibold text-sm">
              Contains shellfish (crayfish). Not suitable for people with shellfish allergies.
            </p>
          </div>

          {/* Variant selector */}
          {product.variants?.length > 1 && (
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-3">Select weight</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Select weight variant">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all
                      ${v.id === activeVariantId
                        ? 'bg-brand text-white border-brand shadow-btn'
                        : 'bg-white text-gray-700 border-neutral-border hover:border-brand hover:text-brand'
                      }`}
                    aria-pressed={v.id === activeVariantId}
                  >
                    {v.label}
                    <span className={`ml-2 text-xs ${v.id === activeVariantId ? 'text-white/80' : 'text-neutral-muted'}`}>
                      £{(v.price / 100).toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border-2 border-neutral-border rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-12 text-xl font-bold text-gray-600 hover:bg-brand-light transition-colors" aria-label="Decrease quantity">−</button>
              <span className="w-10 text-center font-bold text-gray-900" aria-live="polite">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-11 h-12 text-xl font-bold text-gray-600 hover:bg-brand-light transition-colors" aria-label="Increase quantity">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className={`btn-primary flex-1 disabled:opacity-50 transition-all ${added ? 'bg-green-600 border-green-600' : ''}`}
            >
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              {added ? 'Added to cart!' : product.in_stock ? 'Add to cart' : 'Sold out'}
            </button>
          </div>

          {/* Trust badges */}
          <div className="bg-brand-light rounded-xl p-4 mb-6 space-y-2.5">
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-sm text-neutral-muted font-medium">
                <Icon size={15} className="text-brand shrink-0" strokeWidth={2} />
                {text}
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div className="divide-y divide-neutral-border">
            {[
              { icon: ShieldCheck,  title: 'Allergen detail',       content: 'Contains shellfish (crayfish). May contain traces of other shellfish. Store away from other allergens if cooking for others.' },
              { icon: PackageCheck, title: 'Storage guidance',      content: 'Keep in a cool, dry place away from direct sunlight and moisture. Once opened, store in an airtight container and use within 3 months.' },
              { icon: RotateCcw,    title: 'Delivery & returns',    content: 'UK-wide delivery via Royal Mail / DPD. Orders placed before 12pm ship same day (Mon–Fri). Returns accepted within 14 days for unopened items.' },
            ].map(({ icon: Icon, title, content }) => (
              <details key={title} className="py-4 group">
                <summary className="font-semibold text-sm cursor-pointer flex justify-between items-center list-none gap-2">
                  <span className="flex items-center gap-2">
                    <Icon size={15} className="text-brand shrink-0" strokeWidth={1.8} />
                    {title}
                  </span>
                  <ChevronLeft size={16} className="text-neutral-muted -rotate-90 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <p className="text-sm text-neutral-muted mt-3 leading-relaxed pl-6">{content}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
