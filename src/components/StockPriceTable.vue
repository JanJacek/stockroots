<template>
  <div style="width: 800px">
    <!-- Stock Input Component -->
    <StockInput />

    <!-- Stock Chips Component -->
    <StockChips />

    <!-- Chart -->
    <apex-chart
      v-if="
        stockStore.hasStocks &&
        stockStore.series.length > 0 &&
        stockStore.series[0] &&
        stockStore.series[0].data.length > 0
      "
      type="line"
      height="400"
      :options="chartOptions"
      :series="stockStore.series"
    />

    <div v-else class="text-center q-pa-md text-grey">
      Dodaj spółki żeby zobaczyć wykres porównawczy
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStockStore } from '../stores/stockStore';
import { createChartOptions } from '../utils/chartOptions';
import StockInput from './StockInput.vue';
import StockChips from './StockChips.vue';

const stockStore = useStockStore();
const chartOptions = createChartOptions();

onMounted(() => {
  // Inicjalizacja danych dla domyślnie dodanych spółek
  void stockStore.initializeStocks();
});
</script>

<style scoped></style>
