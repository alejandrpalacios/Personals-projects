<template>
  <div>
    <div class="page-header">
      <h2 class="section-title" style="margin-bottom:0">Productos</h2>
      <button class="btn btn--primary">+ Añadir producto</button>
    </div>

    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card card">
        <!-- Imagen placeholder -->
        <div class="product-card__image" :style="{ background: product.color }">
          <span>{{ product.emoji }}</span>
        </div>
        <div class="product-card__body">
          <p class="product-card__name">{{ product.name }}</p>
          <p class="product-card__category">{{ product.category }}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${{ product.price }}</span>
            <span class="badge" :class="product.stock > 0 ? 'badge--success' : 'badge--danger'">
              {{ product.stock > 0 ? `${product.stock} en stock` : 'Agotado' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Datos demo — reemplazar con fetch a API / CMS
const products = [
  { id: 1, name: 'Vestido Lino Arena',     category: 'Vestidos',   price: '189.00', stock: 24, color: '#f5ede3', emoji: '👗' },
  { id: 2, name: 'Blazer Crudo Oversize',  category: 'Chaquetas',  price: '245.00', stock: 8,  color: '#f0ece5', emoji: '🧥' },
  { id: 3, name: 'Pantalón Sastre Negro',  category: 'Pantalones', price: '165.00', stock: 15, color: '#e8e8e8', emoji: '👖' },
  { id: 4, name: 'Camisa Popelín Blanca',  category: 'Camisas',    price: '110.00', stock: 0,  color: '#f7f7f7', emoji: '👔' },
  { id: 5, name: 'Falda Plisada Midi',     category: 'Faldas',     price: '135.00', stock: 20, color: '#e8edf5', emoji: '🛍️' },
  { id: 6, name: 'Jersey Cashmere Beige',  category: 'Jerseys',    price: '290.00', stock: 5,  color: '#f5f0e8', emoji: '🧶' },
];
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.product-card {
  padding: 0;
  overflow: hidden;
  transition: box-shadow 150ms;
}

.product-card:hover { box-shadow: var(--shadow-md); }

.product-card__image {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.product-card__body {
  padding: 14px;
}

.product-card__name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 2px;
}

.product-card__category {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-card__price {
  font-size: 14px;
  font-weight: 700;
}
</style>
