import { useRef, useEffect, FC } from 'react';
import ChartJS from 'chart.js';

import { colors } from '../constants';

ChartJS.defaults.scale.gridLines.drawOnChartArea = false;

export type Props = {
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
  const convasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const chartInstance = new ChartJS(convasRef.current!, {
      type,
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors }]
      },
      options: {
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
      }
    });

    return () => {
      chartInstance.destroy();
    };
  }, [labels, data, type, displayLegend, displayXAxis, displayYAxis]);

  return (
    <div>
      <canvas
        data-testid="chart-canvas"
        ref={convasRef}
        style={{ background: backgroundColor }}
        width="100%"
        height={height}
      />
    </div>
  );
};

export default Chart;
