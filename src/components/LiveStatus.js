import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Make sure to install chart.js and react-chartjs-2

const LiveStatus = ({ url }) => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchResponseTimes = async () => {
      const storedData = JSON.parse(localStorage.getItem('uptimeData')) || {};
      const urlData = storedData[url] || { responseTimes: [] };
      setResponseData(urlData.responseTimes);
    };

    fetchResponseTimes();
  }, [url]);

  const chartData = {
    labels: responseData.map((data, index) => `Check ${index + 1}`),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: responseData,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Live Status for {url}</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LiveStatus;
