import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const COOKIE_TYPES = [
  {
    name: 'Essential cookies',
    required: true,
    examples: 'Session cookie, shopping cart, cookie consent preference',
    purpose: 'These cookies are necessary for the website to function. They enable core features such as the shopping cart, checkout session, and remembering your cookie consent choice. The site cannot function properly without them.',
    retention: 'Session or up to 1 year',
    canOptOut: false,
  },
  {
    name: 'Analytics cookies',
    required: false,
    examples: 'Google Analytics (_ga, _ga_*)',
    purpose: 'These cookies help us understand how visitors use the website — which pages are most visited, how long people stay, and where they came from. This helps us improve the site. Google Analytics data is anonymised and aggregated. These cookies are only set after you give consent.',
    retention: 'Up to 26 months',
    canOptOut: true,
  },
  {
    name: 'Marketing cookies',
    required: false,
    examples: 'Meta Pixel (_fbp, _fbc)',
    purpose: 'These cookies are set by Meta (Facebook/Instagram) and allow us to measure the effectiveness of our advertising campaigns and show you relevant ads on social media. These cookies are only set after you give consent.',
    retention: 'Up to 90 days',
    canOptOut: true,
  },
]

export default function Cookies() {
  useEffect(() => {
    document.title = 'Cookie Policy | Crayfield'
  }, [])

  const handleManage = () => {
    localStorage.removeItem('cookie_consent')
    window.location.reload()
  }

  return (
    <div className="page-container py-16 max-w-3xl">
      <p className="section-eyebrow">Legal</p>
      <h1 className="section-title mb-2">Cookie Policy</h1>
      <p className="text-sm text-neutral-muted mb-10">Last updated: March 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed text-sm">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">What are cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website.
            They allow the website to remember your actions and preferences over a period of time,
            so you don't have to re-enter information each time you visit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Cookies we use</h2>
          <div className="space-y-5">
            {COOKIE_TYPES.map(({ name, required, examples, purpose, retention, canOptOut }) => (
              <div key={name} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className={`flex items-center justify-between px-4 py-3 ${required ? 'bg-gray-50' : 'bg-white'}`}>
                  <h3 className="font-semibold text-gray-900">{name}</h3>
                  {!canOptOut ? (
                    <span className="text-xs bg-gray-200 text-gray-600 font-semibold px-2.5 py-0.5 rounded-full">Always on</span>
                  ) : (
                    <span className="text-xs bg-brand-light text-brand font-semibold px-2.5 py-0.5 rounded-full">Consent required</span>
                  )}
                </div>
                <div className="px-4 py-3 space-y-2">
                  <p><span className="font-medium">Purpose:</span> {purpose}</p>
                  <p><span className="font-medium">Examples:</span> {examples}</p>
                  <p><span className="font-medium">Retention:</span> {retention}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Managing your cookie preferences</h2>
          <p className="mb-3">
            When you first visit the website, a cookie banner lets you choose "Accept all" or
            "Essential only". Your preference is saved and non-essential cookies are only loaded
            based on your choice.
          </p>
          <p className="mb-4">
            You can change your preference at any time by clearing your saved choice:
          </p>
          <button
            onClick={handleManage}
            className="btn-outline text-sm"
          >
            Reset my cookie preferences
          </button>
          <p className="mt-4">
            You can also manage or delete cookies directly in your browser settings. Visit{' '}
            <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
              aboutcookies.org
            </a>{' '}
            for guidance on all major browsers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">More information</h2>
          <p>
            For full details about how we handle your personal data, please read our{' '}
            <Link to="/policies/privacy" className="text-brand hover:underline">Privacy Policy</Link>.
            If you have questions about our use of cookies, contact us at{' '}
            <a href="mailto:hello@crayfield.co.uk" className="text-brand hover:underline">hello@crayfield.co.uk</a>.
          </p>
        </section>

      </div>
    </div>
  )
}
