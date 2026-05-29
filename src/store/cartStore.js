import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "template-cart-store";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      discountPercent: 0,

      addItem: (product, quantity = 1) => {
        const parsedQuantity = Math.max(1, Number(quantity) || 1);
        const existing = get().items.find(
          (item) => Number(item.product.id) === Number(product.id),
        );

        if (existing) {
          set({
            items: get().items.map((item) =>
              Number(item.product.id) === Number(product.id)
                ? { ...item, quantity: item.quantity + parsedQuantity }
                : item,
            ),
          });
          return;
        }

        set({ items: [...get().items, { product, quantity: parsedQuantity }] });
      },

      updateItemQuantity: (id, quantity) => {
        const parsedQuantity = Number(quantity) || 0;
        if (parsedQuantity <= 0) {
          set({
            items: get().items.filter(
              (item) => Number(item.product.id) !== Number(id),
            ),
          });
          return;
        }

        set({
          items: get().items.map((item) =>
            Number(item.product.id) === Number(id)
              ? { ...item, quantity: parsedQuantity }
              : item,
          ),
        });
      },

      incrementItem: (id) => {
        const item = get().items.find(
          (cartItem) => Number(cartItem.product.id) === Number(id),
        );
        if (!item) return;
        get().updateItemQuantity(id, item.quantity + 1);
      },

      decrementItem: (id) => {
        const item = get().items.find(
          (cartItem) => Number(cartItem.product.id) === Number(id),
        );
        if (!item) return;
        get().updateItemQuantity(id, item.quantity - 1);
      },

      removeItem: (id) => {
        set({
          items: get().items.filter(
            (item) => Number(item.product.id) !== Number(id),
          ),
        });
      },

      clearCart: () => set({ items: [], coupon: null, discountPercent: 0 }),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + Number(item.quantity), 0),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + Number(item.product.price) * Number(item.quantity),
          0,
        ),

      applyCoupon: (code) => {
        const cleaned = code.trim().toUpperCase();
        if (cleaned === "DESCUENTO10") {
          set({ coupon: cleaned, discountPercent: 10 });
          return { success: true, percent: 10 };
        } else if (cleaned === "FLORAL20") {
          set({ coupon: cleaned, discountPercent: 20 });
          return { success: true, percent: 20 };
        }
        return { success: false, message: "Cupón no válido." };
      },

      removeCoupon: () => set({ coupon: null, discountPercent: 0 }),

      getDiscountAmount: () => {
        const subtotal = get().getTotalPrice();
        return subtotal * (get().discountPercent / 100);
      },

      getTaxAmount: () => {
        const subtotal = get().getTotalPrice();
        const discount = get().getDiscountAmount();
        const taxable = subtotal - discount;
        return taxable * 0.19; // 19% IVA
      },

      getShippingCost: () => {
        const subtotal = get().getTotalPrice();
        const discount = get().getDiscountAmount();
        const taxable = subtotal - discount;
        if (taxable <= 0) return 0;
        return taxable > 150000 ? 0 : 12000; // Envío gratis a partir de $150.000 COP, sino $12.000 COP
      },

      getFinalTotal: () => {
        const subtotal = get().getTotalPrice();
        const discount = get().getDiscountAmount();
        const taxable = subtotal - discount;
        const tax = get().getTaxAmount();
        const shipping = get().getShippingCost();
        return taxable + tax + shipping;
      }
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
