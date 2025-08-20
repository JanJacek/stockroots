declare module 'vue3-apexcharts' {
  import type { DefineComponent } from 'vue';

  const VueApexCharts: DefineComponent<{
    type: string;
    height?: number | string;
    width?: number | string;
    series: Record<string, unknown>[];
    options: Record<string, unknown>;
    [key: string]: unknown;
  }>;

  export default VueApexCharts;
}

declare module 'apexcharts' {
  export * from 'apexcharts';
}
