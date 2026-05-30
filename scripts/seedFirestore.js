import process from 'node:process';
import app from '../src/firebase/firebase.config.js';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';

const db = getFirestore(app);

const MOCK_PRODUCTS = [
  { id: 1, title: "Orquídea Phalaenopsis Premium", description: "Elegante orquídea de interior con hermosas flores en tonos rosa y blanco. Requiere luz indirecta y riego moderado. Ideal para dar un toque sofisticado a cualquier espacio de tu hogar.", price: "120000", rate: 4.8, image: "01_item.jpg", category: "Flores de Interior" },
  { id: 2, title: "Anturio Rojo Brillante", description: "Planta tropical de interior muy resistente, conocida por sus llamativas hojas/flores rojas brillantes con forma de corazón y espádice amarillo. Ayuda a purificar el aire.", price: "80000", rate: 4.5, image: "02_item.jpg", category: "Flores de Interior" },
  { id: 3, title: "Espatifilo Cuna de Moisés", description: "Hermosa planta de interior de hojas verde oscuro brillante y elegantes flores blancas en forma de vela. Destaca por su alta capacidad de purificación de aire y bajo mantenimiento.", price: "62000", rate: 4.7, image: "03_item.jpg", category: "Flores de Interior" },
  { id: 4, title: "Violeta Africana Aterciopelada", description: "Planta compacta ideal para mesas y estanterías, con hojas carnosas aterciopeladas y ramilletes continuos de flores de un violeta vibrante. Muy fácil de cuidar.", price: "48000", rate: 4.3, image: "04_item.jpg", category: "Flores de Interior" },
  { id: 5, title: "Bromelia Guzmania Exótica", description: "Exótica planta tropical con una bráctea central en forma de estrella de color naranja brillante. Aporta un toque selvático, colorido y de muy larga duración a tu hogar.", price: "88000", rate: 4.4, image: "05_item.jpg", category: "Flores de Interior" },
];

async function seedProducts() {
  console.log('Starting seed process...');
  const productsRef = collection(db, 'products');

  try {
    for (const product of MOCK_PRODUCTS) {
      // Usamos el ID del mock como ID del documento (convertido a string) 
      // para mantener el orden, o podríamos usar id aleatorios.
      // Usaremos id como string para tener control exacto
      const docRef = doc(productsRef, product.id.toString());
      await setDoc(docRef, product);
      console.log(`Seeded Product: ${product.title}`);
    }
    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database: ', error);
    process.exit(1);
  }
}

seedProducts();
