import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'all')
    setVisible(false)
  }

  const essentialOnly = () => {
    localStorage.setItem('cookie_consent', 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl"
    >
      <div className="page-container py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="flex-1 text-sm text-gray-700 leading-relaxed">
          We use cookies to run the site and, with your consent, to improve it with analytics.
          Read our{' '}
          <Link to="/policies/cookies" className="text-brand font-semibold hover:underline">
            Cookie Policy
          </Link>{' '}
          for details.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={essentialOnly}
            className="px-4 py-2.5 text-sm font-semibold border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-500 transition-colors"
          >
            Essential only
          </button>
          <button
            onClick={accept}
            className="px-4 py-2.5 text-sm font-semibold bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
