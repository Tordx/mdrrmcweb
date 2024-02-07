import { BarChart } from '@mui/x-charts';
import React from 'react';
import { barangay } from './barangay';

type Props = {
  chartdata: string[];
};

const Graph = ({ chartdata }: Props) => {
  return (
    <div className='chart-container'>
      <h1>Alumni Income Per Bracket</h1>
      <BarChart
        xAxis={[{ scaleType: 'band', data: barangay }]}
        width={750}
        height={250}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
          },
        }}
        series={[
        //   { data: processedData, color: '#2F5288'},
        ]}
      />
    </div>
  );
};

export default Graph;
