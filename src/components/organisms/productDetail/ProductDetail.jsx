import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../../services/productService';
import { imageMap } from '../../../assets/imageMap';
import useCartStore from '../../../store/cartStore';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        getProductById(id).then((data) => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    const handleAddToCart = () => {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const renderStars = (rate) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.round(rate) ? 'text-amber-400' : 'text-neutral-700'}>
                ★
            </span>
        ));
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-96 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-emerald"></div>
                <p className="text-sm text-brand-muted">Cargando detalles...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <p className="text-xl text-neutral-400">Producto no encontrado.</p>
                <button
                    onClick={() => navigate('/gallery')}
                    className="px-6 py-3 bg-gradient-to-r from-brand-emerald to-teal-600 text-neutral-950 font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                >
                    Volver a la galería
                </button>
            </div>
        );
    }

    const resolvedImage = imageMap[product.image] ?? product.image;
    const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(product.price);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Botón de retorno */}
            <button
                onClick={() => navigate('/gallery')}
                className="flex items-center gap-2 text-neutral-400 hover:text-brand-emerald transition-colors mb-6 group cursor-pointer"
            >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a la galería
            </button>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl shadow-xl overflow-hidden backdrop-blur-sm">
                <div className="md:flex">
                    {/* Imagen */}
                    <div className="md:w-1/2 relative bg-neutral-950 flex items-center justify-center">
                        <img
                            src={resolvedImage}
                            alt={product.title}
                            className="w-full h-96 md:h-full object-cover max-h-[550px]"
                        />
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-brand-emerald to-teal-500 text-neutral-950 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md">
                            PREMIUM
                        </div>
                    </div>

                    {/* Información */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-bold text-brand-emerald tracking-wider uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/30">
                                {product.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-50 mt-4 mb-3">{product.title}</h1>

                            {/* Calificación */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="text-xl flex">{renderStars(product.rate)}</div>
                                <span className="text-sm text-neutral-400 font-medium">({product.rate} / 5)</span>
                            </div>

                            {/* Precio */}
                            <p className="text-4xl font-extrabold text-neutral-50 mb-6 font-sans">
                                {formattedPrice}
                            </p>

                            {/* Descripción */}
                            <p className="text-neutral-300 leading-relaxed font-light mb-8">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Selector de cantidad */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-neutral-300">Cantidad:</span>
                                <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 transition-colors text-lg font-bold cursor-pointer"
                                    >
                                        −
                                    </button>
                                    <span className="w-12 text-center font-semibold text-neutral-100">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 transition-colors text-lg font-bold cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Botón de añadir al carrito */}
                            <button
                                onClick={handleAddToCart}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 cursor-pointer ${
                                    added
                                        ? 'bg-emerald-500 text-neutral-950 scale-[0.98]'
                                        : 'bg-gradient-to-r from-brand-emerald via-emerald-600 to-teal-500 text-neutral-950 hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95'
                                }`}
                            >
                                {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

