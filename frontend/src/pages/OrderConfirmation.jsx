import { useEffect } from 'react'
import { useLocation, useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, XCircle, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams()
  const location       = useLocation()
  const clearCart      = useCartStore(s => s.clearCart)

  // In-page success comes via React Router navigate state
  const stateSuccess = location.state?.success
  const stateRef     = location.state?.ref

  // Redirect-based success: Stripe appends redirect_status to the return_url
  const redirectStatus = searchParams.get('redirect_status')
  const urlRef         = searchParams.get('ref')

  const isSuccess = stateSuccess === true || redirectStatus === 'succeeded'
  const orderRef  = stateRef || urlRef

  useEffect(() => {
    if (isSuccess) clearCart()
    // only run once on mount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isSuccess) {
    return (
      <div className="page-container py-24 text-center max-w-xl mx-auto">
        <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-extrabold mb-3">Order confirmed!</h1>
        {orderRef && (
          <p className="text-neutral-muted mb-2 text-sm">
            Reference: <span className="font-mono font-bold text-gray-900">{orderRef}</span>
          </p>
        )}
        <p className="text-neutral-muted mb-8 leading-relaxed">
          Thank you for your order. We'll send a confirmation email shortly and dispatch
          your crayfish within 24–48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="btn-primary">
            <ShoppingBag size={16} /> Continue shopping
          </Link>
          <Link to="/" className="btn-outline">Back to home</Link>
        </div>
      </div>
    )
  }

  // Payment failed or unknown status
  return (
    <div className="page-container py-24 text-center max-w-xl mx-auto">
      <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <XCircle size={40} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-extrabold mb-3">Payment unsuccessful</h1>
      <p className="text-neutral-muted mb-8 leading-relaxed">
        Your payment could not be completed. No money has been taken. Please try again
        or contact us if the problem persists.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/checkout" className="btn-primary">Try again</Link>
        <Link to="/contact" className="btn-outline">Contact us</Link>
      </div>
    </div>
  )
}
