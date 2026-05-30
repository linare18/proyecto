import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";
import { imageMap } from "../../../assets/imageMap";

const formatCOP = (val) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);
};

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  
  const coupon = useCartStore((state) => state.coupon);
  const discountPercent = useCartStore((state) => state.discountPercent);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getTaxAmount = useCartStore((state) => state.getTaxAmount);
  const getShippingCost = useCartStore((state) => state.getShippingCost);
  const getFinalTotal = useCartStore((state) => state.getFinalTotal);

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");
    if (!couponInput.trim()) return;

    const result = applyCoupon(couponInput);
    if (result.success) {
      setCouponSuccess(`¡Cupón aplicado! Descuento del ${result.percent}%.`);
      setCouponInput("");
    } else {
      setCouponError(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponSuccess("");
    setCouponError("");
  };

  const subtotal = getTotalPrice();
  const discount = getDiscountAmount();
  const tax = getTaxAmount();
  const shipping = getShippingCost();
  const finalTotal = getFinalTotal();

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center shadow-lg">
          <svg className="w-16 h-16 mx-auto text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-2xl font-bold text-neutral-100 mb-2">Tu carrito está vacío</h2>
          <p className="text-neutral-400 mb-8 max-w-sm mx-auto">
            Explora nuestra colección botánica y agrega plantas hermosas para decorar tu hogar.
          </p>
          <Link
            to="/gallery"
            className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-teal-600 text-neutral-950 font-bold hover:brightness-110 active:scale-95 shadow-md shadow-emerald-500/10 transition-all cursor-pointer"
          >
            Ver catálogo de plantas
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-serif font-bold text-neutral-50 mb-8">Tu Carrito de Compras</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Lista de productos */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl divide-y divide-neutral-800/60 shadow-lg overflow-hidden">
          {items.map(({ product, quantity }) => {
            const resolvedImage = imageMap[product.image] ?? product.image;
            const itemSubtotal = Number(product.price) * Number(quantity);
            return (
              <article key={product.id} className="p-5 flex flex-col sm:flex-row gap-5 items-center justify-between">
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  <img
                    src={resolvedImage}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-xl border border-neutral-800"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-neutral-100 truncate text-base">{product.title}</h3>
                    <p className="text-xs text-brand-emerald bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/20 w-fit mt-1 mb-1">
                      {product.category}
                    </p>
                    <p className="text-sm text-neutral-400">{formatCOP(product.price)} c/u</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-neutral-500">Subtotal artículo</p>
                    <p className="text-base font-bold text-neutral-200">
                      {formatCOP(itemSubtotal)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => decrementItem(product.id)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-neutral-100">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => incrementItem(product.id)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="text-sm font-semibold text-brand-rose hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Resumen y Cupones */}
        <div className="space-y-6">
          {/* Panel Resumen */}
          <aside className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-serif font-semibold text-neutral-100 mb-6 pb-2 border-b border-neutral-800">
              Resumen de Compra
            </h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({items.length} tipo(s) de planta)</span>
                <span className="text-neutral-200 font-medium">{formatCOP(subtotal)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-brand-emerald bg-emerald-950/20 px-3 py-1.5 rounded border border-emerald-900/20">
                  <span>Descuento ({discountPercent}%)</span>
                  <span>-{formatCOP(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>IVA (19%)</span>
                <span className="text-neutral-200 font-medium">{formatCOP(tax)}</span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>Envío</span>
                {shipping === 0 ? (
                  <span className="text-brand-emerald font-semibold uppercase text-xs bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">Gratis</span>
                ) : (
                  <span className="text-neutral-200 font-medium">{formatCOP(shipping)}</span>
                )}
              </div>
              
              {shipping > 0 && (
                <p className="text-[11px] text-neutral-500 italic">
                  * Envío gratis para compras mayores a {formatCOP(150000)} (neto de descuento).
                </p>
              )}
            </div>

            <div className="flex justify-between text-lg font-bold text-neutral-50 pt-4 border-t border-neutral-800 mb-6">
              <span>Total Estimado</span>
              <span className="text-brand-emerald">{formatCOP(finalTotal)}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full inline-flex justify-center py-4 rounded-xl bg-gradient-to-r from-brand-emerald via-emerald-600 to-teal-500 text-neutral-950 font-bold text-base hover:brightness-110 active:scale-95 shadow-md shadow-emerald-500/10 transition-all cursor-pointer"
            >
              Proceder al Pago
            </Link>
          </aside>

          {/* Cupones */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-lg">
            <h4 className="text-base font-semibold text-neutral-200 mb-3">¿Tienes un cupón de descuento?</h4>
            
            {coupon ? (
              <div className="flex items-center justify-between bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-xl">
                <div>
                  <p className="text-xs text-neutral-400">Cupón activo</p>
                  <p className="text-sm font-bold text-brand-emerald">{coupon}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-xs font-semibold text-brand-rose hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Quitar cupón
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Ej. FLORAL20"
                    className="flex-1 px-4 py-2 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-brand-emerald"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Aplicar
                  </button>
                </div>
                {couponError && <p className="text-xs text-brand-rose">{couponError}</p>}
                <p className="text-[11px] text-neutral-500">
                  Tip: Prueba con <code className="text-brand-emerald font-semibold">DESCUENTO10</code> (10% desc.) o <code className="text-brand-emerald font-semibold">FLORAL20</code> (20% desc.).
                </p>
              </div>
            )}
            
            {couponSuccess && <p className="text-xs text-brand-emerald mt-2">{couponSuccess}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

