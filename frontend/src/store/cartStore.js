import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Deduplication key combines productId and variantId so that two different
// products with no variants (variantId === undefined) do not collide.
const itemKey = (productId, variantId) => `${productId}-${variantId ?? 'base'}`

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem(product, variantId, quantity = 1) {
        const key = itemKey(product.id, variantId)
        const existing = get().items.find(i => itemKey(i.product.id, i.variantId) === key)
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              itemKey(i.product.id, i.variantId) === key
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          }))
        } else {
          set(state => ({
            items: [...state.items, { product, variantId, quantity }],
          }))
        }
      },

      removeItem(productId, variantId) {
        const key = itemKey(productId, variantId)
        set(state => ({ items: state.items.filter(i => itemKey(i.product.id, i.variantId) !== key) }))
      },

      updateQuantity(productId, variantId, quantity) {
        if (quantity < 1) return get().removeItem(productId, variantId)
        const key = itemKey(productId, variantId)
        set(state => ({
          items: state.items.map(i =>
            itemKey(i.product.id, i.variantId) === key ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart() {
        set({ items: [] })
      },

      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      get subtotal() {
        return get().items.reduce((sum, i) => {
          const variant = i.product.variants?.find(v => v.id === i.variantId)
          return sum + (variant?.price ?? i.product.price) * i.quantity
        }, 0)
      },
    }),
    { name: 'crayfield-cart' }
  )
)
