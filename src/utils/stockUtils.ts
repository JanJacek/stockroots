import type { StockData, ChartDataPoint } from '../types/stock';

export const COLORS = [
  '#1976D2',
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
];

export function getStockColor(index: number): string {
  return COLORS[index % COLORS.length] || '#1976D2';
}

export function processHistoricalData(historicalData: StockData[]): ChartDataPoint[] {
  return historicalData
    .slice(0, 100) // Ostatnie 100 dni
    .reverse() // Od najstarszej do najnowszej daty
    .map((item: StockData) => ({
      x: new Date(item.date).getTime(),
      y: item.close,
    }));
}

export function validateSymbol(symbol: string): boolean {
  return symbol.trim().length > 0 && /^[A-Z]{1,5}$/.test(symbol.trim().toUpperCase());
}
