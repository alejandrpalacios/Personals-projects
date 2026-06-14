// Tipos compartidos en toda la tienda

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;        // precio con descuento (opcional)
  images: string[];          // array de URLs — primera es la principal
  sizes: string[];
  colors: Color[];
  description: string;
  details: string[];         // lista de características / materiales
  isNew?: boolean;
  isSoldOut?: boolean;
}

export interface Color {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}
