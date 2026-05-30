import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../molecules/ProductCard";
import { getProducts } from "../../../services/productService";

const ITEMS_PER_PAGE = 8; // Aumentado para mejor visualización del catálogo de 20 productos

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = ["Todas", "Flores de Interior", "Follaje y Sombra", "Herramientas y Cuidado"];

  const processedProducts = useMemo(() => {
    let result = [...products];

    // Filtro de categoría
    if (selectedCategory !== "Todas") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Filtro de búsqueda
    const normalized = searchTerm.trim().toLowerCase();
    if (normalized) {
      result = result.filter((product) => {
        return (
          product.title.toLowerCase().includes(normalized) ||
          product.description.toLowerCase().includes(normalized)
        );
      });
    }

    // Ordenamiento
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-desc") {
      result.sort((a, b) => b.rate - a.rate);
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOption]);

  const totalPages = Math.max(1, Math.ceil(processedProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = processedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-emerald"></div>
        <p className="text-sm text-brand-muted animate-pulse">Cargando nuestro vivero virtual...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      {/* Encabezado Principal */}
      <div className="text-center md:text-left mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-50 mb-2">
          Nuestra Colección Botánica
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl font-light">
          Plantas de interior seleccionadas a mano para llenar tu hogar de flores, colores y aire puro.
        </p>
      </div>

      {/* Controles de Filtros y Búsqueda */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8 pb-6 border-b border-neutral-800">
        {/* Categorías (Tabs) */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full lg:w-auto">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-brand-emerald text-neutral-950 font-semibold shadow-md shadow-emerald-500/20 scale-105"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200 hover:border-neutral-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Búsqueda y Ordenamiento */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto sm:items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar plantas o herramientas..."
            className="w-full sm:w-72 px-4 py-2 bg-neutral-900 rounded-xl border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all"
          />

          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-4 py-2 bg-neutral-900 rounded-xl border border-neutral-800 text-neutral-100 focus:outline-none focus:border-brand-emerald cursor-pointer"
          >
            <option value="default">Sin ordenar</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating-desc">Calificación: Más populares</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-brand-muted">
          Mostrando <span className="text-brand-emerald font-semibold">{processedProducts.length}</span> plantas encontradas
        </p>
      </div>

      {/* Grid de Productos */}
      {processedProducts.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-16 text-center text-neutral-400">
          <svg className="w-16 h-16 mx-auto text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-semibold text-neutral-200 mb-1">Sin resultados</h3>
          <p className="text-neutral-500">Prueba con otra búsqueda o cambia la categoría de tu filtro.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl border border-neutral-800 text-sm font-medium text-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-900 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                      page === currentPage
                        ? "border-brand-emerald bg-brand-emerald text-neutral-950 shadow-md shadow-emerald-500/20 scale-105"
                        : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl border border-neutral-800 text-sm font-medium text-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-900 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

