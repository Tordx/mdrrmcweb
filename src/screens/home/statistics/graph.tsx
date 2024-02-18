import { BarChart } from '@mui/x-charts';
import React from 'react';
import { barangay } from './barangay';
import { registrationdata } from 'types/interfaces';
import './statistics.css'
type Props = {
  chartdata: registrationdata[];
};

const Graph = ({ chartdata }: Props) => {

  const processedData = barangay.map(barangay => {
    const index = chartdata.findIndex(data => data.address === barangay);
    return index !== -1 ? index + 1 : 0; // Adding 1 to index to match the desired output
  });
console.log(processedData);
  return (
    <div className='chart-container'>
      <span>
      <h2>Total Number of Families:</h2><h1>{' '}{chartdata.length || 0}</h1>
      </span>
      <BarChart
        xAxis={[{ scaleType: 'band', data: barangay }]}
        width={1000}
        height={250}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
          },
        }}
        series={[
          { data: processedData, color: '#2F5288'},
        ]}
      />
    </div>
  );
};

export default Graph;
