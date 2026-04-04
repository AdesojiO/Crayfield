import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { getProducts } from '../lib/api'
import { useCartStore } from '../store/cartStore'
import { IMAGES } from '../lib/images'

const CATEGORIES = [
  { value: '',       label: 'All Products' },
  { value: 'ground', label: 'Ground' },
  { value: 'whole',  label: 'Whole' },
  { value: 'bulk',   label: 'Bulk' },
]

const FALLBACK_IMAGES = [IMAGES.groundCrayfish, IMAGES.wholeCrayfish, IMAGES.bulkCrayfish, IMAGES.spicesMarket]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? ''
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    document.title = 'Shop | Crayfield'
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', category],
    queryFn: () => getProducts({ category: category || undefined }),
  })

  const setCategory = (value) => {
    if (value) {
      setSearchParams({ category: value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="py-12">
      <div className="page-container">

        {/* Header */}
        <div className="mb-10">
          <p className="section-eyebrow">Crayfield Store</p>
          <h1 className="section-title mb-2">Shop</h1>
          <p className="section-subtitle">Premium Nigerian crayfish — cleaned, sealed, and ready to cook.</p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 flex-wrap mb-10">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-muted mr-1">
            <SlidersHorizontal size={15} />
            Filter:
          </div>
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className={`px-4 py-2 rounded-pill text-sm font-semibold border-2 transition-colors
                ${category === value
                  ? 'bg-brand text-white border-brand shadow-btn'
                  : 'bg-white text-gray-600 border-neutral-border hover:border-brand hover:text-brand'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isError ? (
          <div className="text-center py-20">
            <p className="text-gray-900 font-semibold mb-2">Unable to load products</p>
            <p className="text-neutral-muted text-sm mb-6">Please check your connection and try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-outline text-sm"
            >
              Retry
            </button>
          </div>
        ) : isLoading ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 space-y-2.5">
                  <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-5 bg-gray-100 rounded-full w-1/4" />
                </div>
                <div className="px-4 pb-4"><div className="h-11 bg-gray-100 rounded-pill" /></div>
              </li>
            ))}
          </ul>
        ) : data?.items?.length === 0 ? (
          <p className="text-center py-20 text-neutral-muted">No products in this category yet.</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {data?.items?.map((product, i) => {
              const imgSrc = product.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]
              return (
                <li key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-card group flex flex-col hover:shadow-lg transition-shadow">
                  <Link to={`/shop/${product.slug}`} className="flex-1">
                    <div className="relative aspect-square bg-brand-light overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        loading="lazy"
                      />
                      {product.featured && product.in_stock && (
                        <span className="absolute top-2.5 right-2.5 bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-neutral-muted mb-1 capitalize">{product.category}</p>
                      <h2 className="font-bold text-gray-900 mb-1.5 leading-snug">{product.name}</h2>
                      <p className="font-black text-brand text-lg">£{(product.price / 100).toFixed(2)}</p>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    {product.variants?.length > 1 ? (
                      <Link to={`/shop/${product.slug}`} className="btn-outline w-full text-sm">Choose options</Link>
                    ) : (
                      <button
                        onClick={() => addItem(product, product.variants?.[0]?.id ?? undefined, 1)}
                        disabled={!product.in_stock}
                        className="btn-primary w-full text-sm disabled:opacity-50"
                      >
                        <ShoppingBag size={15} />
                        {product.in_stock ? 'Add to cart' : 'Sold out'}
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
