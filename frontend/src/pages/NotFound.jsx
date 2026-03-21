import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-container py-24 text-center">
      <p className="text-6xl mb-4">🦐</p>
      <h1 className="text-3xl font-extrabold mb-3">Page not found</h1>
      <p className="text-neutral-muted mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">Go home</Link>
    </div>
  )
}
