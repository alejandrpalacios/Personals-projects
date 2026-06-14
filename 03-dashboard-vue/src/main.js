import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/main.css';

const app = createApp(App);

// Directiva global click-outside — usada por LangSelector
app.directive('click-outside', {
  mounted(el, binding) {
    el.__clickOutside__ = (e) => {
      if (!el.contains(e.target)) binding.value(e);
    };
    document.addEventListener('click', el.__clickOutside__);
  },
  unmounted(el) {
    document.removeEventListener('click', el.__clickOutside__);
  },
});

app.use(router).mount('#app');
