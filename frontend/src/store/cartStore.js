import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem(product, variantId, quantity = 1) {
        const existing = get().items.find(i => i.variantId === variantId)
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.variantId === variantId
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

      removeItem(variantId) {
        set(state => ({ items: state.items.filter(i => i.variantId !== variantId) }))
      },

      updateQuantity(variantId, quantity) {
        if (quantity < 1) return get().removeItem(variantId)
        set(state => ({
          items: state.items.map(i =>
            i.variantId === variantId ? { ...i, quantity } : i
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
