<template>
  <div>
    <div class="page-header">
      <h2 class="section-title" style="margin-bottom:0">Products</h2>
      <button class="btn btn--primary" @click="showAdd = true"><Icon name="plus" :size="14" />Add product</button>
    </div>

    <div class="filters card" style="margin-bottom:16px">
      <div class="filters__row">
        <input type="search" v-model="search" placeholder="Search products..." class="filter-input" />
        <select v-model="categoryFilter" class="filter-select">
          <option value="">All categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <div class="product-grid">
      <button
        v-for="product in filtered"
        :key="product.id"
        class="product-card card"
        @click="editing = { ...product }"
      >
        <img class="product-card__image" :src="product.image" :alt="product.name" loading="lazy" />
        <div class="product-card__body">
          <p class="product-card__name">{{ product.name }}</p>
          <p class="product-card__category">{{ product.category }}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${{ product.price }}</span>
            <span class="badge" :class="product.stock > 0 ? 'badge--success' : 'badge--danger'">
              {{ product.stock > 0 ? `${product.stock} in stock` : 'Sold out' }}
            </span>
          </div>
        </div>
      </button>
      <p v-if="filtered.length === 0" class="empty-msg">No products match your search.</p>
    </div>

    <!-- Modal: nuevo producto -->
    <Modal :open="showAdd" title="Add product" @close="showAdd = false">
      <form class="form" @submit.prevent="createProduct">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input v-model="newProduct.name" type="text" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <input v-model="newProduct.category" type="text" class="form-field" required list="category-options" />
          <datalist id="category-options">
            <option v-for="cat in categories" :key="cat" :value="cat" />
          </datalist>
        </div>
        <div class="form-group">
          <label class="form-label">Price ($)</label>
          <input v-model="newProduct.price" type="number" step="0.01" min="0" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Stock</label>
          <input v-model="newProduct.stock" type="number" min="0" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Image URL</label>
          <input v-model="newProduct.image" type="url" class="form-field" placeholder="https://..." required />
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%; justify-content:center; margin-top:6px">Add product</button>
      </form>
    </Modal>

    <!-- Modal: editar / eliminar producto -->
    <Modal :open="!!editing" title="Edit product" @close="editing = null">
      <form v-if="editing" class="form" @submit.prevent="saveEdit">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input v-model="editing.name" type="text" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <input v-model="editing.category" type="text" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Price ($)</label>
          <input v-model="editing.price" type="text" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Stock</label>
          <input v-model.number="editing.stock" type="number" min="0" class="form-field" required />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn--primary" style="flex:1; justify-content:center">Save changes</button>
          <button type="button" class="btn btn--ghost" @click="removeProduct">Delete</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Icon from '@/components/Icon.vue';
import Modal from '@/components/Modal.vue';
import { PRODUCTS, genProductId } from '@/data/mock.js';

const search = ref('');
const categoryFilter = ref('');

const categories = computed(() => [...new Set(PRODUCTS.map(p => p.category))]);

const filtered = computed(() => PRODUCTS.filter(p => {
  const term = search.value.trim().toLowerCase();
  const matchesSearch = !term || p.name.toLowerCase().includes(term);
  const matchesCategory = !categoryFilter.value || p.category === categoryFilter.value;
  return matchesSearch && matchesCategory;
}));

// ——— Nuevo producto ———
const showAdd = ref(false);
const newProduct = ref({ name: '', category: '', price: '', stock: '', image: '' });

function createProduct() {
  PRODUCTS.unshift({
    id: genProductId(),
    name: newProduct.value.name,
    category: newProduct.value.category,
    price: Number(newProduct.value.price).toFixed(2),
    stock: Number(newProduct.value.stock),
    image: newProduct.value.image,
  });
  newProduct.value = { name: '', category: '', price: '', stock: '', image: '' };
  showAdd.value = false;
}

// ——— Editar / eliminar producto ———
const editing = ref(null);

function saveEdit() {
  const target = PRODUCTS.find(p => p.id === editing.value.id);
  if (target) Object.assign(target, editing.value);
  editing.value = null;
}

function removeProduct() {
  const index = PRODUCTS.findIndex(p => p.id === editing.value.id);
  if (index !== -1) PRODUCTS.splice(index, 1);
  editing.value = null;
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters__row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-input,
.filter-select {
  padding: 7px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  background: var(--bg-page);
  color: var(--text-primary);
  outline: none;
  transition: border-color 150ms;
}

.filter-input { min-width: 220px; }
.filter-input:focus,
.filter-select:focus { border-color: var(--color-info); }

.empty-msg {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--text-muted);
  padding: 32px 0;
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
  text-align: left;
  border: 1px solid var(--border);
  background: var(--bg-card);
  cursor: pointer;
  font-family: inherit;
}

.product-card:hover { box-shadow: var(--shadow-md); }

.product-card__image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  background: var(--bg-page);
  display: block;
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

/* Modales */
.form { display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 12px; font-weight: 500; color: var(--text-secondary); }
.form-field {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  background: var(--bg-page);
  color: var(--text-primary);
  outline: none;
  font-family: inherit;
  transition: border-color 150ms;
}
.form-field:focus { border-color: var(--color-info); }
.form-actions { display: flex; gap: 10px; margin-top: 6px; }
</style>
