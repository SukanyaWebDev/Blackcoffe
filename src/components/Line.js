import React, { useEffect } from 'react';

import { Chart, registerables } from 'chart.js';
import './Chart.css'

Chart.register(...registerables);


const Topic = (props) => {
  const { chartData } = props
  const labels = chartData.map(item => item.startYear);
  const uniqueLabels = labels.filter((value, index, self) => self.indexOf(value) === index)
  const intensityData = chartData.map(item => item.intensity);
  let labelCounts = {}
  chartData.forEach(label => {
    labelCounts[label.startYear] = (labelCounts[label.startYear] || 0) + 1;
  });
  uniqueLabels.sort()

  const countsArray = Object.values(labelCounts);
  

  const colorsArray = []
  for (let i = 0; i < countsArray.length; i++) {
    const r = Math.floor(Math.random() * 256); // Random red value between 0 and 255
    const g = Math.floor(Math.random() * 256); // Random green value between 0 and 255
    const b = Math.floor(Math.random() * 256); // Random blue value between 0 and 255
    const color = `rgb(${r}, ${g}, ${b})`;
    colorsArray.push(color);
  }


  const data = {
    labels: uniqueLabels,
    datasets: [{
      label: "startYear",
      data: countsArray,
      backgroundColor: colorsArray,
      hoverOffset: 0,
    }]
  };

  useEffect(() => {
    const ctx = document.getElementById('line');
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            position: 'left' // Position legend on the right side
          }
        }
      }
    });ck
    return () => chart.destroy();
  }, [data]);

  return <canvas id="line" style={{height:"200px"}}/>;
};


export default Topic;
