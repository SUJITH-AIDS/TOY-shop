export type ProductCategory = 'all' | 'furniture' | 'lighting' | 'ceramics' | 'objects';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'furniture' | 'lighting' | 'ceramics' | 'objects';
  designer: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  editionText?: string; // e.g. "Limited Edition · 150 pieces"
  description: string;
  story: string;
  materials: string[];
  dimensions: string;
  colors: ProductColor[];
  image: string;
  secondaryImage?: string;
  leadTime: string;
  care: string;
}

export interface CartItem {
  id: string; // unique cart item id: `${productId}-${colorName}`
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'confirmed' | 'crafting' | 'quality_check' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'apple_pay' | 'cod';
}
