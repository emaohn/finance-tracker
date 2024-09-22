import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function DonutGraph({ data }) {
  console.log(data)

  return (
    <PieChart
      series={[
        {
            data: data,
            innerRadius: 100,
            outerRadius: 145,
            paddingAngle: 3,
            cornerRadius: 5,
            cx: 145,
            cy: 150,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        }
      ]}
      width={300}
      height={300}
      slotProps={{ legend: { hidden: true } }}
    />
  );
}