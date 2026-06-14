<template>
  <div class="dashboard-layout">
    <Sidebar />
    <div class="dashboard-content">
      <TopBar />
      <main class="page-body">
        <!-- RouterView renderiza la vista activa según la ruta -->
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import TopBar from '@/components/TopBar.vue';
</script>

<style>
/* Transición suave al cambiar de página */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
