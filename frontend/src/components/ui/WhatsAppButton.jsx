import { MessageCircle } from 'lucide-react'

const WA_NUMBER  = import.meta.env.VITE_WA_NUMBER ?? '447000000000'
const WA_MESSAGE = encodeURIComponent('Hi Crayfield, I have a question about my order.')

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Crayfield on WhatsApp"
      className="md:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-pill px-4 py-3 font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle size={18} className="fill-white/20" />
      WhatsApp
    </a>
  )
}
