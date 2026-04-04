import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2, RotateCcw } from 'lucide-react'
import { createOrder, createPaymentIntent } from '../lib/api'
import { useCartStore } from '../store/cartStore'
import { IMAGES } from '../lib/images'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? '')

const INPUT = 'w-full px-4 py-3 border-2 border-neutral-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors bg-white'
const LABEL = 'block text-sm font-semibold text-gray-700 mb-1.5'

function Field({ id, label, required, children }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}{required && <span className="text-brand ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

function OrderSummary({ items, subtotal }) {
  const FREE_THRESHOLD = 3000
  const SHIPPING = 299
  const shipping = subtotal >= FREE_THRESHOLD ? 0 : SHIPPING
  const total = subtotal + shipping

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 h-fit sticky top-24">
      <h2 className="font-bold text-lg mb-4">Order Summary</h2>
      <ul className="space-y-3 mb-5">
        {items.map(({ product, variantId, quantity }) => {
          const variant = product.variants?.find(v => v.id === variantId)
          const price   = variant?.price ?? product.price
          const img     = product.image_url || IMAGES.groundCrayfish
          return (
            <li key={`${product.id}-${variantId ?? 'base'}`} className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-light shrink-0">
                <img src={img} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                {variant && <p className="text-xs text-neutral-muted">{variant.label}</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">£{(price / 100).toFixed(2)}</p>
                <p className="text-xs text-neutral-muted">×{quantity}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="space-y-2 text-sm border-t border-neutral-border pt-4 mb-3">
        <div className="flex justify-between text-neutral-muted">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">£{(subtotal / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-muted">
          <span>Shipping</span>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? <span className="text-green-600">Free</span> : `£${(shipping / 100).toFixed(2)}`}
          </span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-lg border-t border-neutral-border pt-3">
        <span>Total</span>
        <span className="text-brand">£{(total / 100).toFixed(2)}</span>
      </div>
      {subtotal < FREE_THRESHOLD && (
        <p className="text-xs text-neutral-muted mt-3">
          Spend £{((FREE_THRESHOLD - subtotal) / 100).toFixed(2)} more for free shipping.
        </p>
      )}
      <div className="mt-4 pt-4 border-t border-neutral-border space-y-2">
        <div className="flex items-center gap-2 text-xs text-neutral-muted">
          <ShieldCheck size={13} className="text-brand shrink-0" />
          Secure, encrypted checkout
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-muted">
          <RotateCcw size={13} className="text-brand shrink-0" />
          Free returns on unopened items
        </div>
      </div>
    </div>
  )
}

function DetailsForm({ onSubmit, submitting }) {
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', customer_phone: '',
    address_line1: '', address_line2: '', city: '', postcode: '', country: 'GB',
    notes: '',
  })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form) }} className="space-y-6">
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Contact details</h2>
        <div className="space-y-4">
          <Field id="customer_name" label="Full name" required>
            <input id="customer_name" type="text" required autoComplete="name"
              placeholder="Jane Smith" value={form.customer_name} onChange={set('customer_name')}
              className={INPUT} />
          </Field>
          <Field id="customer_email" label="Email address" required>
            <input id="customer_email" type="email" required autoComplete="email"
              placeholder="jane@example.com" value={form.customer_email} onChange={set('customer_email')}
              className={INPUT} />
          </Field>
          <Field id="customer_phone" label="Phone number (optional)">
            <input id="customer_phone" type="tel" autoComplete="tel"
              placeholder="+44 7700 000000" value={form.customer_phone} onChange={set('customer_phone')}
              className={INPUT} />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery address</h2>
        <div className="space-y-4">
          <Field id="address_line1" label="Address line 1" required>
            <input id="address_line1" type="text" required autoComplete="address-line1"
              placeholder="123 High Street" value={form.address_line1} onChange={set('address_line1')}
              className={INPUT} />
          </Field>
          <Field id="address_line2" label="Address line 2 (optional)">
            <input id="address_line2" type="text" autoComplete="address-line2"
              placeholder="Flat, suite, unit…" value={form.address_line2} onChange={set('address_line2')}
              className={INPUT} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field id="city" label="City / Town" required>
              <input id="city" type="text" required autoComplete="address-level2"
                placeholder="London" value={form.city} onChange={set('city')}
                className={INPUT} />
            </Field>
            <Field id="postcode" label="Postcode" required>
              <input id="postcode" type="text" required autoComplete="postal-code"
                placeholder="SW1A 1AA" value={form.postcode} onChange={set('postcode')}
                className={INPUT} />
            </Field>
          </div>
          <Field id="country" label="Country" required>
            <select id="country" required autoComplete="country"
              value={form.country} onChange={set('country')} className={INPUT}>
              <option value="GB">United Kingdom</option>
              <option value="IE">Ireland</option>
            </select>
          </Field>
        </div>
      </section>

      <section>
        <Field id="notes" label="Order notes (optional)">
          <textarea id="notes" rows={3}
            placeholder="Any delivery instructions or special requests?"
            value={form.notes} onChange={set('notes')}
            className={`${INPUT} resize-none`} />
        </Field>
      </section>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting
          ? <><Loader2 size={18} className="animate-spin" /> Creating order…</>
          : <>Continue to payment <ArrowRight size={16} /></>}
      </button>
    </form>
  )
}

function PaymentForm({ orderTotal, orderRef, orderToken, onBack }) {
  const stripe   = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const clearCart = useCartStore(s => s.clearCart)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState(null)

  const handlePay = async e => {
    e.preventDefault()
    if (!stripe || !elements) return
    setConfirming(true)
    setError(null)

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation?ref=${orderRef}&token=${orderToken}`,
      },
      redirect: 'if_required',
    })

    if (stripeError) {
      setError(stripeError.message)
      setConfirming(false)
    } else if (paymentIntent?.status === 'succeeded') {
      clearCart()
      navigate('/order-confirmation', {
        state: { ref: orderRef, token: orderToken, success: true },
      })
    }
  }

  return (
    <form onSubmit={handlePay} className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900">Payment</h2>
      <div className="border-2 border-neutral-border rounded-xl p-4">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      <button type="submit" disabled={!stripe || confirming} className="btn-primary w-full">
        {confirming
          ? <><Loader2 size={18} className="animate-spin" /> Processing…</>
          : <>Pay £{(orderTotal / 100).toFixed(2)} <ShieldCheck size={16} /></>}
      </button>
      <button type="button" onClick={onBack} className="btn-outline w-full text-sm">
        <ArrowLeft size={14} /> Back to details
      </button>
      <p className="text-xs text-neutral-muted text-center flex items-center justify-center gap-1">
        <ShieldCheck size={12} className="text-brand" />
        Secured by Stripe — your card details are never stored on our servers.
      </p>
    </form>
  )
}

export default function Checkout() {
  const items    = useCartStore(s => s.items)
  const subtotal = useCartStore(s => s.subtotal)

  const [step, setStep]               = useState('details')
  const [clientSecret, setClientSecret] = useState(null)
  const [orderRef, setOrderRef]         = useState(null)
  const [orderToken, setOrderToken]     = useState(null)
  const [orderTotal, setOrderTotal]     = useState(null)
  const [errorMsg, setErrorMsg]         = useState(null)

  if (items.length === 0) {
    return (
      <div className="page-container py-24 text-center">
        <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-neutral-muted mb-8">Add some products before checking out.</p>
        <Link to="/shop" className="btn-primary">Browse the shop</Link>
      </div>
    )
  }

  const handleDetailsSubmit = async form => {
    setStep('loading')
    setErrorMsg(null)
    try {
      const order  = await createOrder({
        ...form,
        items: items.map(i => ({
          product_id: i.product.id,
          variant_id: i.variantId ?? null,
          quantity:   i.quantity,
        })),
      })
      const intent = await createPaymentIntent({ order_id: order.id })
      setClientSecret(intent.client_secret)
      setOrderRef(order.reference)
      setOrderToken(order.order_token)
      setOrderTotal(order.total)
      setStep('payment')
    } catch (err) {
      const detail = err.response?.data?.detail
      setErrorMsg(Array.isArray(detail)
        ? detail.map(d => d.msg).join(' ')
        : detail || 'Something went wrong. Please try again.')
      setStep('error')
    }
  }

  const stripeOptions = clientSecret ? {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: { colorPrimary: '#e85d04', borderRadius: '8px', fontFamily: 'inherit' },
    },
  } : null

  return (
    <div className="page-container py-12">
      <div className="mb-8 flex items-center gap-3">
        <Link to="/cart" className="text-neutral-muted hover:text-brand text-sm flex items-center gap-1">
          <ArrowLeft size={14} /> Cart
        </Link>
        <span className="text-neutral-muted/50">/</span>
        <span className="text-sm font-semibold">Checkout</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
        <div>
          {step === 'details' && (
            <DetailsForm onSubmit={handleDetailsSubmit} submitting={false} />
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-24 text-neutral-muted gap-4">
              <Loader2 size={40} className="animate-spin text-brand" />
              <p className="text-sm">Creating your order…</p>
            </div>
          )}

          {step === 'payment' && stripeOptions && (
            <Elements stripe={stripePromise} options={stripeOptions}>
              <PaymentForm
                orderTotal={orderTotal}
                orderRef={orderRef}
                orderToken={orderToken}
                onBack={() => setStep('details')}
              />
            </Elements>
          )}

          {step === 'error' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-700 font-semibold mb-2">Something went wrong</p>
              <p className="text-sm text-red-600 mb-5">{errorMsg}</p>
              <button onClick={() => setStep('details')} className="btn-outline text-sm">
                Try again
              </button>
            </div>
          )}
        </div>

        <OrderSummary items={items} subtotal={subtotal} />
      </div>
    </div>
  )
}
