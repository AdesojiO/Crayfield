import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChefHat, Clock, ArrowRight, MessageCircle } from 'lucide-react'
import { subscribeNewsletter } from '../../lib/api'
import { IMAGES } from '../../lib/images'

const RECIPES = [
  {
    image:    IMAGES.egusiSoup,
    tag:      'Soup',
    title:    'Egusi Soup',
    desc:     'Rich, hearty egusi soup elevated with hand-cleaned ground crayfish.',
    time:     '45 min',
  },
  {
    image:    IMAGES.jollofRice,
    tag:      'Rice',
    title:    'Jollof Rice',
    desc:     'The secret ingredient in every great jollof — a generous pinch of Crayfield crayfish.',
    time:     '50 min',
  },
  {
    image:    IMAGES.ogbonoStew,
    tag:      'Stew',
    title:    'Ogbono Stew',
    desc:     'Silky ogbono with the depth that only freshly ground crayfish can give.',
    time:     '40 min',
  },
]

const WA_NUMBER  = '447000000000'
const WA_MESSAGE = encodeURIComponent('Hi Crayfield, please add me to your WhatsApp updates list.')

export default function RecipeCards() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      await subscribeNewsletter(email)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-16 md:py-24 bg-neutral-bg" aria-label="Recipes and newsletter">
      <div className="page-container">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-eyebrow">Inspiration</p>
          <h2 className="section-title mb-3">Recipe Ideas with Crayfield</h2>
          <p className="section-subtitle mx-auto">
            From everyday soups to party jollof — see how our crayfish transforms every dish.
          </p>
        </div>

        {/* Recipe grid */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" role="list">
          {RECIPES.map(({ image, tag, title, desc, time }) => (
            <li key={title} className="bg-white rounded-2xl overflow-hidden shadow-card group hover:-translate-y-1 transition-transform duration-200">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Tag pill */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              </div>
              {/* Body */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{title}</h3>
                  <span className="flex items-center gap-1 text-xs text-neutral-muted font-medium shrink-0">
                    <Clock size={12} />
                    {time}
                  </span>
                </div>
                <p className="text-sm text-neutral-muted leading-relaxed mb-4">{desc}</p>
                <Link
                  to="/recipes"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all"
                >
                  Read recipe <ArrowRight size={14} />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* Signup strip */}
        <div className="bg-white rounded-2xl shadow-card border border-neutral-border p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">

            {/* Text */}
            <div className="md:flex-[0_0_38%]">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat size={20} className="text-brand" />
                <h3 className="text-xl font-bold text-gray-900">Get Recipes &amp; Alerts</h3>
              </div>
              <p className="text-sm text-neutral-muted leading-relaxed">
                Exclusive recipes, new product launches, and wholesale news delivered to your inbox.
              </p>
            </div>

            {/* Actions */}
            <div className="flex-1 w-full flex flex-col gap-3">
              {status === 'success' ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold text-sm py-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs">✓</span>
                  You're subscribed! We'll be in touch soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      aria-label="Email address"
                      className="flex-1 min-w-0 px-4 py-3 border-2 border-neutral-border rounded-pill text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary text-sm shrink-0 disabled:opacity-60"
                    >
                      {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                  )}
                  <p className="text-xs text-neutral-muted">Recipes and offers only. Unsubscribe anytime.</p>
                </form>
              )}

              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-muted font-semibold">or</span>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-sm py-2.5"
                >
                  <MessageCircle size={16} />
                  Join WhatsApp updates
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
