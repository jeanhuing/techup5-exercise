import db from '../src/utils/db.js';
import { TSHIRT_COLLECTION } from '../src/utils/tshirt.js';

const sizes = ['S', 'M', 'L', 'XL'];
const getRandomSize = () => sizes[Math.floor(Math.random() * sizes.length)];
const getRandomPrice = () => Math.floor(Math.random() * (100 - 10 + 1)) + 10;

async function seedProducts() {
  try {
    // First, clear existing products
    await db`DELETE FROM products`;
    
    // Insert the products with random sizes and prices
    for (const tshirt of TSHIRT_COLLECTION) {
      await db`
        INSERT INTO products (id, title, color, size, price)
        VALUES (${tshirt.id}, ${tshirt.title}, ${tshirt.color}, ${getRandomSize()}, ${getRandomPrice()})
      `;
    }
    
    console.log('Successfully seeded products table');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await db.end();
  }
}

seedProducts();