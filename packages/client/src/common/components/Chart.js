import React, { useRef, useEffect } from 'react';
import ChartJS from 'chart.js';
import { colors } from '../constants';

ChartJS.defaults.scale.gridLines.drawOnChartArea = false;

const Chart = ({
  type,
  labels,
  data,
  height,
  backgroundColor,
  displayLegend,
  displayYAxis,
  displayXAxis
}) => {
  const convasElement = useRef(null);

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

    const chartInstance = new ChartJS(convasElement.current, {
      type,
      data: chartData,
      options: chartOptions
    });

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

Chart.defaultProps = {
  displayLegend: false,
  displayXAxis: false,
  displayYAxis: false,
  height: '40px'
};

export default Chart;
