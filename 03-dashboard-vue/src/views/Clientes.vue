<template>
  <div>
    <div class="page-header">
      <h2 class="section-title" style="margin-bottom:0">Clientes</h2>
      <button class="btn btn--primary">+ Añadir cliente</button>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Email</th>
            <th>Pedidos</th>
            <th>Total gastado</th>
            <th>Último pedido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>
              <div class="client-cell">
                <div class="client-avatar">{{ initials(client.name) }}</div>
                <span>{{ client.name }}</span>
              </div>
            </td>
            <td>{{ client.email }}</td>
            <td>{{ client.orders }}</td>
            <td>${{ client.spent }}</td>
            <td>{{ client.lastOrder }}</td>
            <td>
              <button class="action-link">Ver perfil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const clients = [
  { id: 1, name: 'María García',   email: 'maria@email.com',   orders: 14, spent: '1,840.00', lastOrder: 'hace 2 días'  },
  { id: 2, name: 'Carlos López',   email: 'carlos@email.com',  orders: 7,  spent: '890.50',   lastOrder: 'hace 3 días'  },
  { id: 3, name: 'Laura Martínez', email: 'laura@email.com',   orders: 22, spent: '3,210.00', lastOrder: 'ayer'         },
  { id: 4, name: 'Andrés Ruiz',    email: 'andres@email.com',  orders: 3,  spent: '310.00',   lastOrder: 'hace 1 semana'},
  { id: 5, name: 'Sofia Jiménez',  email: 'sofia@email.com',   orders: 18, spent: '2,680.00', lastOrder: 'hace 4 días'  },
];

function initials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.client-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.client-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-info);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-link {
  background: none;
  border: none;
  color: var(--color-info);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}
</style>
