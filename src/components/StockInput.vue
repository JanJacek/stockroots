<template>
  <div class="stock-input">
    <div class="row q-col-gutter-sm">
      <div class="col">
        <q-input
          v-model="symbolInput"
          :label="label"
          :placeholder="placeholder"
          outlined
          dense
          :error="!!error"
          :error-message="error || undefined"
          @keyup.enter="handleAddStock"
          @input="clearError"
        />
      </div>
      <div class="col-auto">
        <q-btn
          color="primary"
          :label="buttonLabel"
          @click="handleAddStock"
          :loading="loading"
          :disabled="!symbolInput.trim()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStockStore } from '../stores/stockStore';

interface Props {
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
}

withDefaults(defineProps<Props>(), {
  label: 'Symbol spółki',
  placeholder: 'np. GOOGL, AAPL, MSFT',
  buttonLabel: 'Dodaj',
});

const stockStore = useStockStore();
const symbolInput = ref('');

const loading = computed(() => stockStore.loading);
const error = computed(() => stockStore.error);

const clearError = () => {
  stockStore.clearError();
};

const handleAddStock = async () => {
  if (!symbolInput.value.trim()) return;

  const success = await stockStore.addStock(symbolInput.value);
  if (success) {
    symbolInput.value = '';
  }
};
</script>

<style scoped>
.stock-input {
  margin-bottom: 1rem;
}
</style>
