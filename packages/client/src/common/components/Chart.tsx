import { useRef, useEffect, FC } from 'react';
import ChartJS from 'chart.js';

import { colors } from '../constants';

ChartJS.defaults.scale.gridLines.drawOnChartArea = false;

type Props = {
  type: string;
  labels: Array<string>;
  data: Array<any>;
  height?: string;
  backgroundColor?: string;
  displayLegend?: boolean;
  displayYAxis?: boolean;
  displayXAxis?: boolean;
};

const Chart: FC<Props> = ({
  type,
  labels,
  data,
  backgroundColor = '',
  height = '40px',
  displayLegend = false,
  displayYAxis = false,
  displayXAxis = false
}) => {
  const convasElement = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const chartOptions = {
      legend: {
        display: displayLegend
      },
      scales: {
        yAxes: [
          {
            display: displayYAxis,
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          }
        ],
        xAxes: [{ display: displayXAxis }]
      },
      responsive: true
    };

    const chartData = {
      labels,
      datasets: [{ data, backgroundColor: colors }]
    };

    const chartInstance = new ChartJS(
      convasElement.current as HTMLCanvasElement,
      {
        type,
        data: chartData,
        options: chartOptions
      }
    );

    return () => {
      chartInstance.destroy();
    };
  }, [labels, data, type, displayLegend, displayXAxis, displayYAxis]);

  return (
    <div>
      <canvas
        ref={convasElement}
        style={{ background: backgroundColor }}
        width="100%"
        height={height}
      />
    </div>
  );
};

export default Chart;
