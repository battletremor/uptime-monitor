import React, { useEffect, useState } from 'react';

const Summary = () => {
  const [uptimeData, setUptimeData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('uptimeData')) || {};
    const summaries = Object.entries(storedData).map(([url, data]) => {
      const totalChecks = data.responseTimes.length;
      const successfulChecks = data.responseTimes.filter(time => time <= 500).length; // Assuming success is within 500ms
      const uptimePercentage = ((successfulChecks / totalChecks) * 100).toFixed(2);
      const avgResponseTime = (data.responseTimes.reduce((acc, cur) => acc + cur, 0) / totalChecks || 0).toFixed(2);
      
      return { url, uptimePercentage, avgResponseTime };
    });
    setUptimeData(summaries);
  }, []);

  return (
    <div>
      <h2>Uptime Summary</h2>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Uptime (%)</th>
            <th>Average Response Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {uptimeData.map((data, index) => (
            <tr key={index}>
              <td>{data.url}</td>
              <td>{data.uptimePercentage}</td>
              <td>{data.avgResponseTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
