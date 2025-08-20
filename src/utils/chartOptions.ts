export const createChartOptions = () => ({
  chart: {
    id: 'stock-comparison-chart',
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  xaxis: {
    type: 'datetime' as const,
    title: {
      text: 'Data',
    },
  },
  yaxis: {
    title: {
      text: 'Cena (USD)',
    },
    labels: {
      formatter: function (value: number) {
        return '$' + value.toFixed(2);
      },
    },
  },
  stroke: {
    curve: 'straight' as const,
    width: 2,
  },
  title: {
    text: 'Porównanie cen akcji',
    align: 'left' as const,
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5,
    },
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
    y: {
      formatter: function (value: number) {
        return '$' + value.toFixed(2);
      },
    },
  },
  legend: {
    position: 'top' as const,
    horizontalAlign: 'right' as const,
  },
});
