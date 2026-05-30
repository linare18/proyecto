function ProductPrice({ price }) {
  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);

  return (    
    <div className="text-base font-bold text-brand-emerald mb-1">
      {formatted}
    </div>
  );
}
export default ProductPrice;