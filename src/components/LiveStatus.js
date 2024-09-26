// src/components/LiveStatus.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LiveStatus = ({ url }) => {
  const [responseTimes, setResponseTimes] = useState([]);

  useEffect(() => {
    // Fetch stored response times for the URL from localStorage
    const storedData = JSON.parse(localStorage.getItem('uptimeData')) || {};
    if (storedData[url]) {
      setResponseTimes(storedData[url].responseTimes);
    }
  }, [url]);

  const chartData = {
    labels: responseTimes.map((_, idx) => `Check ${idx + 1}`),
    datasets: [
      {
        label: `Response Time for ${url}`,
        data: responseTimes,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Live Status: {url}</h2>
      {responseTimes.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No response time data available.</p>
      )}
    </div>
  );
};

export default LiveStatus;
