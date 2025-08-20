<template>
  <div class="stock-chips">
    <div class="row q-col-gutter-sm">
      <div v-for="(stock, index) in stocks" :key="stock.symbol" class="col-auto">
        <q-chip
          :color="stock.color"
          text-color="white"
          removable
          @remove="handleRemoveStock(index)"
          :label="stock.symbol"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStockStore } from '../stores/stockStore';
import type { Stock } from '../types/stock';

const stockStore = useStockStore();

const stocks = computed<Stock[]>(() => stockStore.stocks);

const handleRemoveStock = (index: number) => {
  stockStore.removeStock(index);
};
</script>

<style scoped>
.stock-chips {
  margin-bottom: 1rem;
}
</style>
