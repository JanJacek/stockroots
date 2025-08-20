export interface StockData {
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export interface ChartDataPoint {
  x: number;
  y: number;
}

export interface Stock {
  symbol: string;
  color: string;
  data: ChartDataPoint[];
}

export interface StockSeries {
  name: string;
  data: ChartDataPoint[];
  color: string;
}
