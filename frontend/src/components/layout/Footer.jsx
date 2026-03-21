import { Link } from 'react-router-dom'
import { Wheat, Mail, MessageCircle, ShieldCheck, PackageCheck, Truck } from 'lucide-react'

const SHOP_LINKS    = [
  { to: '/shop',                    label: 'All Products' },
  { to: '/shop?category=ground',    label: 'Ground Crayfish' },
  { to: '/shop?category=whole',     label: 'Whole Crayfish' },
  { to: '/shop?category=bulk',      label: 'Bulk Packs' },
]
const COMPANY_LINKS = [
  { to: '/about',     label: 'About Us' },
  { to: '/wholesale', label: 'Wholesale' },
  { to: '/contact',   label: 'Contact' },
]
const POLICY_LINKS  = [
  { to: '/policies/delivery', label: 'Delivery & Returns' },
  { to: '/policies/privacy',  label: 'Privacy Policy' },
  { to: '/policies/terms',    label: 'Terms & Conditions' },
  { to: '/policies/cookies',  label: 'Cookie Policy' },
]

const TRUST = [
  { icon: ShieldCheck, label: 'Cleaned & sorted' },
  { icon: PackageCheck, label: 'Sealed freshness' },
  { icon: Truck, label: 'UK-wide delivery' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white/70 mt-20" role="contentinfo">
      <div className="page-container pt-14 pb-6">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4" aria-label="Crayfield home">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <Wheat size={15} className="text-white" strokeWidth={2} />
              </div>
              <span className="text-lg font-black text-white tracking-tight">Crayfield</span>
            </Link>
            <p className="text-sm text-white/50 mb-5 leading-relaxed max-w-[26ch]">
              Premium Nigerian crayfish. Cleaned, sealed and delivered UK‑wide.
            </p>
            <ul className="space-y-2">
              {TRUST.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-white/50">
                  <Icon size={13} className="text-brand shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@crayfield.co.uk"
                  className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
                >
                  <Mail size={14} className="shrink-0" />
                  hello@crayfield.co.uk
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#25D366] hover:text-[#1ebe5d] transition-colors font-semibold"
                >
                  <MessageCircle size={14} className="shrink-0" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/35">&copy; {new Date().getFullYear()} Crayfield Global Ltd. All rights reserved.</p>
            <p className="text-xs text-white/25 mt-0.5">Company No. [XXXXXXXX] &middot; United Kingdom</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {POLICY_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="text-xs text-white/35 hover:text-white/65 transition-colors">{label}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
