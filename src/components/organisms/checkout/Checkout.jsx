import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";

const formatCOP = (val) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);
};

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getTaxAmount = useCartStore((state) => state.getTaxAmount);
  const getShippingCost = useCartStore((state) => state.getShippingCost);
  const getFinalTotal = useCartStore((state) => state.getFinalTotal);
  const discountPercent = useCartStore((state) => state.discountPercent);
  const clearCart = useCartStore((state) => state.clearCart);

  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const subtotal = getTotalPrice();
  const discount = getDiscountAmount();
  const tax = getTaxAmount();
  const shipping = getShippingCost();
  const total = getFinalTotal();

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center shadow-lg">
          <div className="w-16 h-16 bg-emerald-950/40 text-brand-emerald border border-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✓
          </div>
          <h2 className="text-3xl font-serif font-bold text-neutral-100 mb-2">Compra Confirmada</h2>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            ¡Tu pedido simulado en FloraStore ha sido procesado! Nos pondremos en contacto contigo para coordinar el envío de tus plantas.
          </p>
          <Link
            to="/gallery"
            className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-teal-600 text-neutral-950 font-bold hover:brightness-110 active:scale-95 shadow-md shadow-emerald-500/10 transition-all cursor-pointer"
          >
            Volver a la galería
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center shadow-lg">
          <svg className="w-16 h-16 mx-auto text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-neutral-100 mb-2">
            No hay productos para pagar
          </h2>
          <p className="text-neutral-400 mb-8">Agrega hermosas plantas a tu carrito antes de ir al checkout.</p>
          <Link
            to="/gallery"
            className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-teal-600 text-neutral-950 font-bold hover:brightness-110 active:scale-95 shadow-md shadow-emerald-500/10 transition-all cursor-pointer"
          >
            Ir a productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-serif font-bold text-neutral-50 mb-8">Finalizar Compra (Simulado)</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Formulario de Checkout */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-lg"
        >
          <h3 className="text-xl font-serif font-semibold text-neutral-100 pb-2 border-b border-neutral-800">
            Datos de Envío y Contacto
          </h3>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Nombre Completo</label>
            <input
              required
              type="text"
              name="fullName"
              placeholder="Ej. Juan Pérez"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Correo Electrónico</label>
            <input
              required
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Dirección de Entrega</label>
            <input
              required
              type="text"
              name="address"
              placeholder="Calle 100 # 15 - 30, Bogotá"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-emerald via-emerald-600 to-teal-500 text-neutral-950 font-bold text-base hover:brightness-110 active:scale-95 shadow-md shadow-emerald-500/10 transition-all cursor-pointer"
          >
            Confirmar Pedido Simulador ({formatCOP(total)})
          </button>
        </form>

        {/* Panel Resumen Lateral */}
        <aside className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 h-fit shadow-lg">
          <h3 className="text-xl font-serif font-semibold text-neutral-100 mb-6 pb-2 border-b border-neutral-800">
            Tu Pedido
          </h3>
          <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 divide-y divide-neutral-800/40">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm pt-3 first:pt-0">
                <div className="max-w-[70%]">
                  <p className="text-neutral-200 font-medium truncate">{product.title}</p>
                  <p className="text-neutral-500 text-xs">Cant: {quantity}</p>
                </div>
                <span className="font-semibold text-neutral-300">
                  {formatCOP(Number(product.price) * Number(quantity))}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-xs mb-6 border-t border-neutral-800 pt-4 text-neutral-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCOP(subtotal)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-brand-emerald">
                <span>Descuento ({discountPercent}%)</span>
                <span>-{formatCOP(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>IVA (19%)</span>
              <span>{formatCOP(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>{shipping === 0 ? "Gratis" : formatCOP(shipping)}</span>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-4 flex justify-between text-lg font-bold text-neutral-50">
            <span>Total</span>
            <span className="text-brand-emerald">{formatCOP(total)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

