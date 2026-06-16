export type Product = {
  id: string
  image: string
  name: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  badge?: 'NEW' | '25% OFF'
  description: string
  details: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    image: '/products/product-1.jpg',
    name: 'Fashionable Leather Backpack',
    category: 'Bags',
    price: 120.00,
    oldPrice: 150.00,
    rating: 4,
    reviews: 12,
    badge: '25% OFF',
    description: 'A premium leather backpack crafted for everyday style and function. Features multiple compartments, padded laptop sleeve, and adjustable straps for all-day comfort.',
    details: [
      'Material: Genuine leather outer, polyester lining',
      'Dimensions: 45cm x 30cm x 15cm',
      'Laptop sleeve fits up to 15.6 inches',
      'Multiple interior and exterior pockets',
      'Adjustable padded shoulder straps',
    ],
  },
  {
    id: 'p2',
    image: '/products/product-2.jpg',
    name: "Elegant Women's Dress",
    category: 'Apparel',
    price: 85.00,
    rating: 5,
    reviews: 25,
    badge: 'NEW',
    description: 'A beautifully crafted elegant dress perfect for both casual and formal occasions. Made with breathable fabric and a flattering silhouette.',
    details: [
      'Material: 95% Polyester, 5% Elastane',
      'Available in sizes XS, S, M, L, XL',
      'Machine washable at 30°C',
      'Floral print with adjustable waist tie',
      'Knee-length cut with flutter sleeves',
    ],
  },
  {
    id: 'p3',
    image: '/products/product-3.jpg',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 60.00,
    rating: 4,
    reviews: 8,
    description: 'High-quality wireless headphones with deep bass, crystal-clear sound, and up to 30 hours of battery life. Foldable design for easy portability.',
    details: [
      'Bluetooth 5.0 connectivity',
      'Battery life: up to 30 hours',
      'Driver size: 40mm',
      'Foldable over-ear design',
      'Built-in microphone for calls',
    ],
  },
  {
    id: 'p4',
    image: '/products/product-4.jpg',
    name: "Classic Men's Watch",
    category: 'Accessories',
    price: 199.00,
    oldPrice: 249.00,
    rating: 4,
    reviews: 15,
    description: "A timeless classic men's watch with stainless steel case, sapphire crystal glass, and genuine leather strap. Water-resistant up to 50 meters.",
    details: [
      'Case material: 316L stainless steel',
      'Glass: Sapphire crystal',
      'Strap: Genuine leather, 22mm',
      'Water resistance: 50 meters',
      'Movement: Japanese quartz',
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}