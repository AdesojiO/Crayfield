import { useEffect } from 'react'
import { MessageCircle, Mail, Building2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const WA_NUMBER = import.meta.env.VITE_WA_NUMBER ?? '447000000000'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hi%20Crayfield%2C%20I%20have%20a%20question.`

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact | Crayfield'
  }, [])

  return (
    <div className="page-container py-16 max-w-2xl">
      <p className="section-eyebrow">Get in touch</p>
      <h1 className="section-title mb-2">Contact Us</h1>
      <p className="section-subtitle mb-10">
        We're a small team — WhatsApp is the fastest way to reach us.
        Expect a reply within a few hours on weekdays.
      </p>

      <div className="space-y-4 mb-10">
        {/* WhatsApp */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card border-2 border-transparent hover:border-[#25D366] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0">
            <MessageCircle size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">WhatsApp</p>
            <p className="text-sm text-neutral-muted">Fastest response · Usually within 1–2 hours</p>
          </div>
          <ArrowRight size={18} className="text-neutral-muted group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
        </a>

        {/* Email */}
        <a
          href="mailto:hello@crayfield.co.uk"
          className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card border-2 border-transparent hover:border-brand hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
            <Mail size={22} className="text-brand" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">Email</p>
            <p className="text-sm text-neutral-muted">hello@crayfield.co.uk · Reply within 1 working day</p>
          </div>
          <ArrowRight size={18} className="text-neutral-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
        </a>
      </div>

      {/* Wholesale redirect */}
      <div className="bg-neutral-bg rounded-xl p-5 flex items-start gap-3">
        <Building2 size={18} className="text-brand mt-0.5 shrink-0" />
        <div>
          <p className="font-bold text-gray-800 text-sm mb-1">Trade &amp; Wholesale enquiries</p>
          <p className="text-sm text-neutral-muted">
            For case pricing and wholesale accounts, please use the{' '}
            <Link to="/wholesale" className="text-brand font-semibold hover:underline">wholesale page</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
