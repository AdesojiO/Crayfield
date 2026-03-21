import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// ── Products ──────────────────────────────────────────────
export const getProducts = (params) =>
  api.get('/products', { params }).then(r => r.data)

export const getProduct = (slug) =>
  api.get(`/products/${slug}`).then(r => r.data)

export const getFeaturedProducts = () =>
  api.get('/products', { params: { featured: true, limit: 6 } }).then(r => r.data)

// ── Orders ────────────────────────────────────────────────
export const createOrder = (payload) =>
  api.post('/orders', payload).then(r => r.data)

// ── Payments ──────────────────────────────────────────────
export const createPaymentIntent = (payload) =>
  api.post('/payments/create-intent', payload).then(r => r.data)

// ── Wholesale ─────────────────────────────────────────────
export const submitWholesaleEnquiry = (payload) =>
  api.post('/wholesale/enquiry', payload).then(r => r.data)

// ── Newsletter ────────────────────────────────────────────
export const subscribeNewsletter = (email) =>
  api.post('/newsletter/subscribe', { email }).then(r => r.data)
