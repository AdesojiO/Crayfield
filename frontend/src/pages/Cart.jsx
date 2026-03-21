import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, RotateCcw } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { IMAGES } from '../lib/images'

export default function Cart() {
  const items          = useCartStore(s => s.items)
  const removeItem     = useCartStore(s => s.removeItem)
  const updateQuantity = useCartStore(s => s.updateQuantity)
  const subtotal       = useCartStore(s => s.subtotal)

  if (items.length === 0) return (
    <div className="page-container py-24 text-center">
      <div className="w-20 h-20 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-5">
        <ShoppingBag size={32} className="text-brand" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
      <p className="text-neutral-muted mb-8">Add some crayfish and come back!</p>
      <Link to="/shop" className="btn-primary">Browse the shop</Link>
    </div>
  )

  return (
    <div className="page-container py-12">
      <h1 className="text-3xl font-extrabold mb-10">Your Cart</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">

        {/* Items */}
        <ul className="space-y-3">
          {items.map(({ product, variantId, quantity }) => {
            const variant  = product.variants?.find(v => v.id === variantId)
            const price    = variant?.price ?? product.price
            const imgSrc   = product.image_url || IMAGES.groundCrayfish
            return (
              <li key={variantId} className="bg-white rounded-2xl p-4 shadow-card flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-brand-light shrink-0">
                  <img src={imgSrc} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{product.name}</p>
                  {variant && <p className="text-sm text-neutral-muted">{variant.label}</p>}
                  <p className="font-black text-brand mt-1">£{(price / 100).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border-2 border-neutral-border rounded-xl overflow-hidden text-sm">
                    <button onClick={() => updateQuantity(variantId, quantity - 1)} className="w-9 h-9 font-bold text-gray-600 hover:bg-brand-light transition-colors">−</button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <button onClick={() => updateQuantity(variantId, quantity + 1)} className="w-9 h-9 font-bold text-gray-600 hover:bg-brand-light transition-colors">+</button>
                  </div>
                  <button
                    onClick={() => removeItem(variantId)}
                    aria-label={`Remove ${product.name}`}
                    className="w-9 h-9 flex items-center justify-center text-neutral-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow-card p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm mb-5">
            <div className="flex justify-between text-neutral-muted">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">£{(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-muted">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">Calculated at checkout</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-neutral-border pt-4 mb-5">
            <span>Total</span>
            <span className="text-brand">£{(subtotal / 100).toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-primary w-full mb-3">
            Checkout <ArrowRight size={16} />
          </Link>
          <Link to="/shop" className="btn-outline w-full text-sm">Continue shopping</Link>
          <div className="mt-5 space-y-2 pt-4 border-t border-neutral-border">
            <div className="flex items-center gap-2 text-xs text-neutral-muted">
              <ShieldCheck size={13} className="text-brand shrink-0" />
              Secure checkout
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-muted">
              <RotateCcw size={13} className="text-brand shrink-0" />
              Free returns on unopened items
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
