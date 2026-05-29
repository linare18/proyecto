import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import { imageMap } from "../../assets/imageMap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const resolvedImage = imageMap[product.image] ?? product.image;

    return (
        <Link 
            to={`/product/${product.id}`} 
            className="group block border border-neutral-800 bg-neutral-900/40 rounded-2xl p-4 shadow-sm w-[220px] m-2 hover:border-brand-emerald/30 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1.5 transition-all duration-300"
        >
            <ProductImage src={resolvedImage} alt={product.title}  />
            <ProductTitle title={product.title} />
            <ProductPrice price={product.price} />
            <ProductRate rate={product.rate} />
        </Link>
    );
}
export default ProductCard;

