function ProductImage({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-xl bg-neutral-800 mb-3">
      <img src={src} alt={alt} className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-500" />
    </div>
  );
}
export default ProductImage;