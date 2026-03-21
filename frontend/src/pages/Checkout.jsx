import { Link } from 'react-router-dom'

// Stripe Elements integration — wired up once backend is running
// and VITE_STRIPE_PUBLIC_KEY is set in .env
export default function Checkout() {
  return (
    <div className="page-container py-16 max-w-2xl text-center">
      <p className="text-5xl mb-4">💳</p>
      <h1 className="text-2xl font-bold mb-3">Checkout</h1>
      <p className="text-neutral-muted mb-8">
        Stripe payment integration is ready to connect. Add your{' '}
        <code className="bg-neutral-bg px-1.5 py-0.5 rounded text-sm font-mono">VITE_STRIPE_PUBLIC_KEY</code>{' '}
        to <code className="bg-neutral-bg px-1.5 py-0.5 rounded text-sm font-mono">frontend/.env</code> and your{' '}
        <code className="bg-neutral-bg px-1.5 py-0.5 rounded text-sm font-mono">STRIPE_SECRET_KEY</code>{' '}
        to <code className="bg-neutral-bg px-1.5 py-0.5 rounded text-sm font-mono">backend/.env</code> to activate.
      </p>
      <Link to="/cart" className="btn-outline">Back to cart</Link>
    </div>
  )
}
