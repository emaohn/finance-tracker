import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  const data = [2500, 4000, 3000, 3900, 3500]
  const labels = ["Jan", "Feb", "Mar", "Apr", "Jun"]
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: labels, categoryGapRatio: 0.9 }]}
      series={[{ data: data }]}
      height={150}
      margin={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      leftAxis={null}
      bottomAxis={null}
    />
  );
}