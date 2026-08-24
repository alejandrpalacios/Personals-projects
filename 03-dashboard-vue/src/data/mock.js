// Datos de demo centralizados — reemplazar con llamadas a la API real.
// Antes vivían duplicados dentro de cada vista; ahora hay una sola fuente de verdad
// para que el buscador del TopBar y las vistas individuales muestren siempre lo mismo.
// reactive() para que agregar un pedido/producto/cliente en una vista se refleje en todas.
import { reactive } from 'vue';

export const ORDERS = reactive([
  { id: '4821', customer: 'María García',    dateISO: '2025-06-14', total: '128.00', status: 'Enviado'   },
  { id: '4820', customer: 'Carlos López',    dateISO: '2025-06-14', total: '89.50',  status: 'Pendiente' },
  { id: '4819', customer: 'Laura Martínez',  dateISO: '2025-06-13', total: '245.00', status: 'Entregado' },
  { id: '4818', customer: 'Andrés Ruiz',     dateISO: '2025-06-13', total: '67.00',  status: 'Cancelado' },
  { id: '4817', customer: 'Sofia Jiménez',   dateISO: '2025-06-12', total: '312.80', status: 'Enviado'   },
  { id: '4816', customer: 'Pedro Navarro',   dateISO: '2025-06-12', total: '56.20',  status: 'Entregado' },
  { id: '4815', customer: 'Ana Rodríguez',   dateISO: '2025-06-11', total: '199.90', status: 'Pendiente' },
]);

export const PRODUCTS = reactive([
  { id: 1, name: 'Sand Linen Dress',        category: 'Dresses',  price: '189.00', stock: 24, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400' },
  { id: 2, name: 'Oversized Raw Blazer',    category: 'Jackets',  price: '245.00', stock: 8,  image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
  { id: 3, name: 'Black Tailored Trousers', category: 'Trousers', price: '165.00', stock: 15, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400' },
  { id: 4, name: 'White Poplin Shirt',      category: 'Shirts',   price: '110.00', stock: 0,  image: 'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=400' },
  { id: 5, name: 'Pleated Midi Skirt',      category: 'Skirts',   price: '135.00', stock: 20, image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400' },
  { id: 6, name: 'Beige Cashmere Sweater',  category: 'Sweaters', price: '290.00', stock: 5,  image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400' },
]);

export const CLIENTS = reactive([
  { id: 1, name: 'María García',   email: 'maria@email.com',   orders: 14, spent: '1,840.00', lastOrder: '2 days ago',  memberSince: 'Jan 2023', favoriteCategory: 'Dresses'   },
  { id: 2, name: 'Carlos López',   email: 'carlos@email.com',  orders: 7,  spent: '890.50',   lastOrder: '3 days ago',  memberSince: 'Mar 2023', favoriteCategory: 'Jackets'    },
  { id: 3, name: 'Laura Martínez', email: 'laura@email.com',   orders: 22, spent: '3,210.00', lastOrder: 'yesterday',   memberSince: 'Jun 2022', favoriteCategory: 'Dresses'   },
  { id: 4, name: 'Andrés Ruiz',    email: 'andres@email.com',  orders: 3,  spent: '310.00',   lastOrder: '1 week ago',  memberSince: 'Oct 2024', favoriteCategory: 'Trousers'  },
  { id: 5, name: 'Sofia Jiménez',  email: 'sofia@email.com',   orders: 18, spent: '2,680.00', lastOrder: '4 days ago',  memberSince: 'Feb 2023', favoriteCategory: 'Sweaters'   },
]);

const STATUS_LABELS = { Enviado: 'Shipped', Pendiente: 'Pending', Entregado: 'Delivered', Cancelado: 'Cancelled' };
const STATUS_BADGES = { Enviado: 'badge--info', Pendiente: 'badge--warning', Entregado: 'badge--success', Cancelado: 'badge--danger' };

export function statusLabel(status) {
  return STATUS_LABELS[status] ?? status;
}

export function statusBadge(status) {
  return STATUS_BADGES[status] ?? '';
}

let nextOrderId = 4822;
export function genOrderId() {
  return String(nextOrderId++);
}

let nextProductId = 7;
export function genProductId() {
  return nextProductId++;
}

let nextClientId = 6;
export function genClientId() {
  return nextClientId++;
}

// Notificaciones — se marcan como leídas al abrir el panel en el TopBar
export const NOTIFICATIONS = reactive([
  { id: 1, title: 'New order #4821',         desc: 'María García just placed an order for $128.00.', time: '5 min ago',  read: false },
  { id: 2, title: 'Low stock',               desc: 'White Poplin Shirt is sold out.',                  time: '1 hour ago', read: false },
  { id: 3, title: 'Payment received',        desc: 'Sofia Jiménez — $312.80 via card.',                time: '3 hours ago', read: false },
  { id: 4, title: 'New customer review',     desc: 'Laura Martínez left a 5-star review.',             time: 'Yesterday',  read: true  },
  { id: 5, title: 'Weekly summary ready',    desc: 'Your business metrics for last week are in.',      time: '2 days ago', read: true  },
]);
