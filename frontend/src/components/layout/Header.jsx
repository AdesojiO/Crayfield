import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, Wheat } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

const NAV_LINKS = [
  { to: '/shop',      label: 'Shop' },
  { to: '/wholesale', label: 'Wholesale' },
  { to: '/about',     label: 'About' },
  { to: '/contact',   label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const totalItems = useCartStore(s => s.items.reduce((n, i) => n + i.quantity, 0))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'border-b border-neutral-border'}`}>
      <div className="page-container h-20 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="Crayfield home"
        >
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <Wheat size={16} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            Cray<span className="text-brand">field</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors
                 ${isActive
                   ? 'text-brand bg-brand-light'
                   : 'text-gray-600 hover:text-brand hover:bg-brand-light'
                 }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <Link
            to="/shop"
            aria-label="Search products"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-brand hover:bg-brand-light transition-colors"
          >
            <Search size={19} />
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-brand hover:bg-brand-light transition-colors"
          >
            <ShoppingBag size={19} />
            {totalItems > 0 && (
              <span
                className="absolute top-0.5 right-0.5 bg-brand text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none"
                aria-hidden="true"
              >
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-neutral-border bg-white" aria-label="Mobile navigation">
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3.5 font-semibold transition-colors text-sm
                     ${isActive ? 'text-brand bg-brand-light' : 'text-gray-700 hover:text-brand'}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
