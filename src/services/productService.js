import axios from "axios";

// Catálogo botánico detallado para mapear los 20 elementos de FakeStore API
const BOTANICAL_CATALOG = {
  1: {
    title: "Orquídea Phalaenopsis Premium",
    description: "Elegante orquídea de interior con hermosas flores en tonos rosa y blanco. Requiere luz indirecta y riego moderado. Ideal para dar un toque sofisticado a cualquier espacio de tu hogar.",
    image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  2: {
    title: "Anturio Rojo Brillante",
    description: "Planta tropical de interior muy resistente, conocida por sus llamativas hojas/flores rojas brillantes con forma de corazón y espádice amarillo. Ayuda a purificar el aire.",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  3: {
    title: "Espatifilo Cuna de Moisés",
    description: "Hermosa planta de interior de hojas verde oscuro brillante y elegantes flores blancas en forma de vela. Destaca por su alta capacidad de purificación de aire y bajo mantenimiento.",
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  4: {
    title: "Violeta Africana Aterciopelada",
    description: "Planta compacta ideal para mesas y estanterías, con hojas carnosas aterciopeladas y ramilletes continuos de flores de un violeta vibrante. Muy fácil de cuidar.",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  5: {
    title: "Bromelia Guzmania Exótica",
    description: "Exótica planta tropical con una bráctea central en forma de estrella de color naranja brillante. Aporta un toque selvático, colorido y de muy larga duración a tu hogar.",
    image: "https://images.unsplash.com/photo-1616781297120-d4cfd9111c15?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  6: {
    title: "Lirio de la Paz Sensation",
    description: "Variedad gigante de Espatifilo con espectaculares hojas anchas y flores blancas grandes. Excelente para rincones con sombra o luz moderada, creando ambientes frescos.",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
    category: "Follaje y Sombra"
  },
  7: {
    title: "Begonia de Flor Rosa",
    description: "Planta de interior con abundantes racimos de flores dobles de color rosa pálido. Prefiere temperaturas templadas, humedad constante y luz indirecta.",
    image: "https://images.unsplash.com/photo-1512428813824-f713c2448492?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  8: {
    title: "Gardenia Perfumada",
    description: "Famosa por su fragancia embriagadora y sus flores de color blanco cremoso sobre un follaje verde oscuro brillante. Aporta elegancia natural y aroma fresco.",
    image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  9: {
    title: "Regadera de Cobre Vintage",
    description: "Regadera de diseño clásico y boquilla fina para riego de precisión. Fabricada en cobre puro de alta resistencia. Un objeto decorativo y sumamente útil.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
    category: "Herramientas y Cuidado"
  },
  10: {
    title: "Sustrato Orgánico Premium",
    description: "Mezcla profesional aireada con fibra de coco, humus de lombriz y perlita. Ideal para asegurar el drenaje óptimo y la nutrición prolongada de tus plantas de interior.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    category: "Herramientas y Cuidado"
  },
  11: {
    title: "Maceta de Cerámica Artesanal",
    description: "Maceta modelada y esmaltada a mano con un acabado en color verde oliva y base porosa. Incluye plato de drenaje a juego para evitar derrames en tus muebles.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    category: "Herramientas y Cuidado"
  },
  12: {
    title: "Kit de Tijeras de Precisión",
    description: "Juego de dos tijeras de acero al carbono de alta calidad para podar hojas marchitas, tallos delgados y dar forma detallada a tus plantas de interior y bonsáis.",
    image: "https://images.unsplash.com/photo-1508780709619-79562169bc51?auto=format&fit=crop&w=600&q=80",
    category: "Herramientas y Cuidado"
  },
  13: {
    title: "Humidificador Ultrasónico",
    description: "Dispositivo silencioso que mantiene la humedad ambiental ideal (entre 50% y 60%) para plantas tropicales exigentes como helechos, anturios y orquídeas en interiores.",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
    category: "Herramientas y Cuidado"
  },
  14: {
    title: "Luz LED de Crecimiento",
    description: "Luz de espectro completo ajustable para estimular la fotosíntesis en rincones sombríos de la casa. Con soporte ajustable y temporizador inteligente integrado.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    category: "Herramientas y Cuidado"
  },
  15: {
    title: "Kalanchoe de Flor Amarilla",
    description: "Planta suculenta muy fácil de cuidar, con hojas carnosas de color verde intenso y abundantes ramilletes de pequeñas flores de un amarillo radiante y duradero.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  16: {
    title: "Jazmín de Madagascar",
    description: "Planta trepadora de interior con hermosas flores blancas cerosas en forma de estrella que desprenden una fragancia dulce, suave y relajante.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  17: {
    title: "Anturio Rosa Exótico",
    description: "Variedad poco común de anturio con flores en tonalidades rosa pastel y follaje denso. Muy decorativo para escritorios, salas y zonas de lectura.",
    image: "https://images.unsplash.com/photo-1566786816466-614c274b09ad?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  18: {
    title: "Ciclamen Blanco Elegante",
    description: "Planta de floración invernal con pétalos blancos curvados hacia arriba que parecen flotar sobre sus hojas plateadas con hermosas nervaduras.",
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e6e4053?auto=format&fit=crop&w=600&q=80",
    category: "Flores de Interior"
  },
  19: {
    title: "Calathea Triostar",
    description: "Espectacular planta de hojas ornamentales con patrones verdes, crema y un envés rosa fucsia sumamente llamativo. Excelente purificadora de aire.",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
    category: "Follaje y Sombra"
  },
  20: {
    title: "Monstera Deliciosa (Costilla de Adán)",
    description: "La reina de las plantas de interior, famosa por sus grandes hojas verdes brillantes con hermosas fenestraciones naturales. Aporta frescura tropical inmediata.",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
    category: "Follaje y Sombra"
  }
};

const USD_TO_COP_RATE = 4000;

// Mapea un producto crudo de FakeStore API al catálogo botánico en COP
const mapToBotanicalProduct = (fakeProd) => {
  const id = Number(fakeProd.id);
  const botInfo = BOTANICAL_CATALOG[id] || {
    title: fakeProd.title,
    description: fakeProd.description,
    image: fakeProd.image,
    category: "Otros"
  };

  // Convertir precio a COP multiplicando por la tasa de cambio y redondeando a la centena más cercana
  const originalPriceUSD = Number(fakeProd.price) || 20;
  const priceCOP = Math.round((originalPriceUSD * USD_TO_COP_RATE) / 100) * 100;

  return {
    id: id,
    title: botInfo.title,
    description: botInfo.description,
    price: priceCOP, // precio numérico en COP
    rate: fakeProd.rating ? fakeProd.rating.rate : 4.5,
    image: botInfo.image,
    category: botInfo.category
  };
};

export const getProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data.map(mapToBotanicalProduct);
  } catch (error) {
    console.error("Error fetching products from FakeStore API, returning fallback data:", error);
    // Fallback con datos locales si la API está fuera de servicio o no hay conexión
    return Object.keys(BOTANICAL_CATALOG).map(id => {
      const botInfo = BOTANICAL_CATALOG[id];
      // precios de prueba realistas en COP
      const mockPrices = { 1: 120000, 2: 80000, 3: 62000, 4: 48000, 5: 88000, 6: 150000, 7: 68000, 8: 98000, 9: 160000, 10: 40000, 11: 45000, 12: 52000, 13: 110000, 14: 130000, 15: 42000, 16: 95000, 17: 85000, 18: 75000, 19: 92000, 20: 140000 };
      return {
        id: Number(id),
        ...botInfo,
        price: mockPrices[id] || 75000,
        rate: 4.5
      };
    });
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    if (response.data) {
      return mapToBotanicalProduct(response.data);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching product ${id} from FakeStore API, returning fallback:`, error);
    const botInfo = BOTANICAL_CATALOG[id];
    if (botInfo) {
      const mockPrices = { 1: 120000, 2: 80000, 3: 62000, 4: 48000, 5: 88000, 6: 150000, 7: 68000, 8: 98000, 9: 160000, 10: 40000, 11: 45000, 12: 52000, 13: 110000, 14: 130000, 15: 42000, 16: 95000, 17: 85000, 18: 75000, 19: 92000, 20: 140000 };
      return {
        id: Number(id),
        ...botInfo,
        price: mockPrices[id] || 75000,
        rate: 4.5
      };
    }
    return null;
  }
};

