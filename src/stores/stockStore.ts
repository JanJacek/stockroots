import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../boot/axios';
import type { Stock, StockData, StockSeries } from '../types/stock';
import { getStockColor, processHistoricalData, validateSymbol } from '../utils/stockUtils';

export const useStockStore = defineStore('stock', () => {
  const stocks = ref<Stock[]>([
    { symbol: 'NVO', color: getStockColor(0), data: [] },
    { symbol: 'GOOGL', color: getStockColor(1), data: [] },
  ]);

  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed properties
  const series = computed<StockSeries[]>(() =>
    stocks.value.map((stock: Stock) => ({
      name: stock.symbol,
      data: stock.data,
      color: stock.color,
    })),
  );

  const hasStocks = computed(() => stocks.value.length > 0);
  const stockCount = computed(() => stocks.value.length);

  // Actions
  const fetchStockData = async (symbol: string, stockIndex: number) => {
    try {
      const apiKey = import.meta.env.VITE_FMP_API_KEY;
      if (!apiKey) {
        throw new Error('Brak klucza API FMP. Sprawdź plik .env');
      }

      const response = await api.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`,
      );

      if (response.data && response.data.historical) {
        const historicalData = response.data.historical as StockData[];
        const chartData = processHistoricalData(historicalData);

        if (stocks.value[stockIndex]) {
          stocks.value[stockIndex].data = chartData;
        }
      }
    } catch (err) {
      const errorMessage = `Błąd podczas pobierania danych dla ${symbol}: ${err instanceof Error ? err.message : 'Nieznany błąd'}`;
      console.error(errorMessage);
      error.value = errorMessage;
    }
  };

  const addStock = async (symbol: string) => {
    if (!validateSymbol(symbol)) {
      error.value = 'Nieprawidłowy symbol spółki';
      return false;
    }

    const upperSymbol = symbol.trim().toUpperCase();

    // Sprawdź czy spółka już istnieje
    if (stocks.value.find((s: Stock) => s.symbol === upperSymbol)) {
      error.value = 'Spółka już została dodana';
      return false;
    }

    loading.value = true;
    error.value = null;

    try {
      // Dodaj nową spółkę
      const newStock: Stock = {
        symbol: upperSymbol,
        color: getStockColor(stocks.value.length),
        data: [],
      };

      stocks.value.push(newStock);

      // Pobierz dane dla nowej spółki
      await fetchStockData(upperSymbol, stocks.value.length - 1);

      return true;
    } catch {
      // Usuń spółkę jeśli nie udało się pobrać danych
      stocks.value.pop();
      error.value = `Nie udało się dodać spółki ${upperSymbol}`;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const removeStock = (index: number) => {
    if (index >= 0 && index < stocks.value.length) {
      stocks.value.splice(index, 1);
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const initializeStocks = async () => {
    loading.value = true;
    error.value = null;

    try {
      const promises = stocks.value.map((stock: Stock, index: number) =>
        fetchStockData(stock.symbol, index),
      );

      await Promise.all(promises);
    } catch {
      error.value = 'Błąd podczas inicjalizacji danych spółek';
    } finally {
      loading.value = false;
    }
  };

  return {
    // State
    stocks,
    loading,
    error,

    // Computed
    series,
    hasStocks,
    stockCount,

    // Actions
    fetchStockData,
    addStock,
    removeStock,
    clearError,
    initializeStocks,
  };
});
