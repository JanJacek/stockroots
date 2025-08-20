import { boot } from 'quasar/wrappers';
import VueApexCharts from 'vue3-apexcharts';

export default boot(({ app }) => {
  // Rejestracja komponentu ApexCharts globalnie
  app.component('apex-chart', VueApexCharts);
});
