import { ref, computed } from 'vue';

export const defaultLang = 'en';

export const languages = {
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
  fr: { label: 'Français', flag: '🇫🇷' },
};

const ui = {
  en: {
    // Sidebar nav
    'nav.dashboard':    'Overview',
    'nav.orders':       'Orders',
    'nav.products':     'Products',
    'nav.customers':    'Customers',
    'nav.settings':     'Settings',
    // TopBar
    'topbar.search':    'Search...',
    // Dashboard
    'dash.revenue':     'Total revenue',
    'dash.orders':      'Orders',
    'dash.new-customers':'New customers',
    'dash.conversion':  'Conversion rate',
    'dash.chart-title': 'Monthly sales',
    'dash.chart-hint':  '[ Bar chart — integrate Chart.js or ApexCharts here ]',
    'dash.chart-npm':   'npm install apexcharts vue3-apexcharts',
    'dash.recent':      'Recent orders',
    'dash.view-all':    'View all',
    'dash.col-order':   'Order',
    'dash.col-customer':'Customer',
    'dash.col-total':   'Total',
    'dash.col-status':  'Status',
    // Orders
    'orders.title':     'All orders',
    'orders.new':       '+ New order',
    'orders.search':    'Search by ID or customer...',
    'orders.all-status':'All statuses',
    'orders.export':    'Export CSV',
    'orders.select-all':'Select all',
    'orders.col-date':  'Date',
    'orders.actions':   'Actions',
    'orders.showing':   'Showing 1–10 of 1,284 orders',
    'orders.prev':      'Previous',
    'orders.next':      'Next',
    'orders.pending':   'Pending',
    'orders.shipped':   'Shipped',
    'orders.delivered': 'Delivered',
    'orders.cancelled': 'Cancelled',
    // Settings
    'settings.title':   'Settings',
    'settings.tab-general': 'General',
    'settings.tab-notif':   'Notifications',
    'settings.tab-payments':'Payments',
    'settings.tab-integrations': 'Integrations',
    'settings.tab-security': 'Security',
    'settings.company-name': 'Company name',
    'settings.contact-email':'Contact email',
    'settings.phone':   'Phone',
    'settings.currency':'Currency',
    'settings.save':    'Save changes',
    'settings.cancel':  'Cancel',
    'settings.section': 'Company profile',
    'settings.notif-section': 'Notification preferences',
    'settings.placeholder': 'Section "%s" — content to implement',
  },
  es: {
    'nav.dashboard':    'Resumen',
    'nav.orders':       'Pedidos',
    'nav.products':     'Productos',
    'nav.customers':    'Clientes',
    'nav.settings':     'Configuración',
    'topbar.search':    'Buscar...',
    'dash.revenue':     'Ingresos totales',
    'dash.orders':      'Pedidos',
    'dash.new-customers':'Clientes nuevos',
    'dash.conversion':  'Tasa conversión',
    'dash.chart-title': 'Ventas mensuales',
    'dash.chart-hint':  '[ Gráfico de barras — integrar Chart.js o ApexCharts aquí ]',
    'dash.chart-npm':   'npm install apexcharts vue3-apexcharts',
    'dash.recent':      'Pedidos recientes',
    'dash.view-all':    'Ver todos',
    'dash.col-order':   'Pedido',
    'dash.col-customer':'Cliente',
    'dash.col-total':   'Total',
    'dash.col-status':  'Estado',
    'orders.title':     'Todos los pedidos',
    'orders.new':       '+ Nuevo pedido',
    'orders.search':    'Buscar por ID o cliente...',
    'orders.all-status':'Todos los estados',
    'orders.export':    'Exportar CSV',
    'orders.select-all':'Seleccionar todos',
    'orders.col-date':  'Fecha',
    'orders.actions':   'Acciones',
    'orders.showing':   'Mostrando 1–10 de 1.284 pedidos',
    'orders.prev':      'Anterior',
    'orders.next':      'Siguiente',
    'orders.pending':   'Pendiente',
    'orders.shipped':   'Enviado',
    'orders.delivered': 'Entregado',
    'orders.cancelled': 'Cancelado',
    'settings.title':   'Configuración',
    'settings.tab-general': 'General',
    'settings.tab-notif':   'Notificaciones',
    'settings.tab-payments':'Pagos',
    'settings.tab-integrations': 'Integraciones',
    'settings.tab-security': 'Seguridad',
    'settings.company-name': 'Nombre de la empresa',
    'settings.contact-email':'Email de contacto',
    'settings.phone':   'Teléfono',
    'settings.currency':'Moneda',
    'settings.save':    'Guardar cambios',
    'settings.cancel':  'Cancelar',
    'settings.section': 'Perfil de la empresa',
    'settings.notif-section': 'Preferencias de notificación',
    'settings.placeholder': 'Sección "%s" — contenido por implementar',
  },
  fr: {
    'nav.dashboard':    'Vue d\'ensemble',
    'nav.orders':       'Commandes',
    'nav.products':     'Produits',
    'nav.customers':    'Clients',
    'nav.settings':     'Paramètres',
    'topbar.search':    'Rechercher...',
    'dash.revenue':     'Chiffre d\'affaires',
    'dash.orders':      'Commandes',
    'dash.new-customers':'Nouveaux clients',
    'dash.conversion':  'Taux de conversion',
    'dash.chart-title': 'Ventes mensuelles',
    'dash.chart-hint':  '[ Graphique — intégrer Chart.js ou ApexCharts ici ]',
    'dash.chart-npm':   'npm install apexcharts vue3-apexcharts',
    'dash.recent':      'Commandes récentes',
    'dash.view-all':    'Voir tout',
    'dash.col-order':   'Commande',
    'dash.col-customer':'Client',
    'dash.col-total':   'Total',
    'dash.col-status':  'Statut',
    'orders.title':     'Toutes les commandes',
    'orders.new':       '+ Nouvelle commande',
    'orders.search':    'Rechercher par ID ou client...',
    'orders.all-status':'Tous les statuts',
    'orders.export':    'Exporter CSV',
    'orders.select-all':'Sélectionner tout',
    'orders.col-date':  'Date',
    'orders.actions':   'Actions',
    'orders.showing':   'Affichage 1–10 sur 1 284 commandes',
    'orders.prev':      'Précédent',
    'orders.next':      'Suivant',
    'orders.pending':   'En attente',
    'orders.shipped':   'Expédié',
    'orders.delivered': 'Livré',
    'orders.cancelled': 'Annulé',
    'settings.title':   'Paramètres',
    'settings.tab-general': 'Général',
    'settings.tab-notif':   'Notifications',
    'settings.tab-payments':'Paiements',
    'settings.tab-integrations': 'Intégrations',
    'settings.tab-security': 'Sécurité',
    'settings.company-name': 'Nom de l\'entreprise',
    'settings.contact-email':'Email de contact',
    'settings.phone':   'Téléphone',
    'settings.currency':'Devise',
    'settings.save':    'Enregistrer',
    'settings.cancel':  'Annuler',
    'settings.section': 'Profil de l\'entreprise',
    'settings.notif-section': 'Préférences de notification',
    'settings.placeholder': 'Section "%s" — contenu à implémenter',
  },
};

// Store reactivo global — un solo ref para toda la app
const currentLang = ref(
  (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || defaultLang
);

export function useLang() {
  const lang = currentLang;

  function setLang(newLang) {
    currentLang.value = newLang;
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  }

  const t = computed(() => (key) => {
    return ui[currentLang.value]?.[key] ?? ui[defaultLang]?.[key] ?? key;
  });

  return { lang, setLang, t };
}
