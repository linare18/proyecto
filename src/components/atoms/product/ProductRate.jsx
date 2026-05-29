function ProductRate({ rate }) {
  return (
    <div className="flex items-center text-xs"> 
        <span className="text-amber-400 mr-1">★</span>
        <span className="text-neutral-400 font-medium">{rate}</span>
    </div>
  );
}
export default ProductRate;