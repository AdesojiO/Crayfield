import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '../../lib/api'
import { useCartStore } from '../../store/cartStore'
import { IMAGES } from '../../lib/images'

// Fallback images while real product photos are being sourced
const FALLBACK_IMAGES = [IMAGES.groundCrayfish, IMAGES.wholeCrayfish, IMAGES.bulkCrayfish, IMAGES.spicesMarket]

function ProductCard({ product, index }) {
  const addItem = useCartStore(s => s.addItem)
  const firstVariant = product.variants?.[0]
  const imgSrc = product.image_url || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]

  return (
    <li className="bg-white rounded-2xl overflow-hidden shadow-card group flex flex-col hover:shadow-lg transition-shadow duration-200">
      <Link to={`/shop/${product.slug}`} className="flex-1" aria-label={product.name}>

        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-brand-light">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            loading="lazy"
          />
          {!product.in_stock && (
            <span className="absolute top-2.5 left-2.5 bg-gray-800/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Sold out
            </span>
          )}
          {product.featured && product.in_stock && (
            <span className="absolute top-2.5 right-2.5 bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-muted mb-1">{product.category}</p>
          <h3 className="font-bold text-gray-900 mb-2 leading-snug">{product.name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-brand">£{(product.price / 100).toFixed(2)}</span>
            {product.variants?.length > 1 && (
              <span className="text-xs text-neutral-muted">from</span>
            )}
          </div>
        </div>
      </Link>

      {/* CTA */}
      <div className="px-4 pb-4">
        {product.variants?.length > 1 ? (
          <Link to={`/shop/${product.slug}`} className="btn-outline w-full text-sm">
            Choose options
          </Link>
        ) : (
          <button
            onClick={() => addItem(product, firstVariant?.id ?? product.id, 1)}
            disabled={!product.in_stock}
            className="btn-primary w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={15} />
            {product.in_stock ? 'Add to cart' : 'Sold out'}
          </button>
        )}
      </div>
    </li>
  )
}

function SkeletonCard() {
  return (
    <li className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 bg-gray-100 rounded-full w-1/3" />
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-5 bg-gray-100 rounded-full w-1/4" />
      </div>
      <div className="px-4 pb-4"><div className="h-11 bg-gray-100 rounded-pill" /></div>
    </li>
  )
}

export default function Bestsellers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  })

  return (
    <section className="py-16 md:py-24" aria-label="Bestsellers">
      <div className="page-container">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="section-eyebrow">Shop</p>
            <h2 className="section-title">Our Bestsellers</h2>
          </div>
          <Link to="/shop" className="btn-outline text-sm shrink-0">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {isError && (
          <p className="text-center text-neutral-muted py-16 border-2 border-dashed border-neutral-border rounded-2xl">
            Unable to load products. <Link to="/shop" className="text-brand font-semibold underline">Browse the full shop</Link>
          </p>
        )}

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : data?.items?.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
          }
        </ul>

      </div>
    </section>
  )
}
