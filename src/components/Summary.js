// src/components/Summary.js
import React, { useState, useEffect } from 'react';

const Summary = ({ urls }) => {
  const [uptimeData, setUptimeData] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  useEffect(() => {
    // Fetch uptime data from localStorage
    const storedData = JSON.parse(localStorage.getItem('uptimeData')) || {};
    setUptimeData(storedData);
  }, []);

  const calculateUptimePercentage = (url) => {
    const data = uptimeData[url]?.statuses || [];
    const totalChecks = data.length;
    const successfulChecks = data.filter((status) => status === 'up').length;
    return totalChecks > 0 ? ((successfulChecks / totalChecks) * 100).toFixed(2) : 'N/A';
  };

  const calculateAverageResponseTime = (url) => {
    const times = uptimeData[url]?.responseTimes || [];
    const totalResponseTime = times.reduce((acc, time) => acc + time, 0);
    return times.length > 0 ? (totalResponseTime / times.length).toFixed(2) : 'N/A';
  };

  return (
    <div>
      <h2>Uptime Summary</h2>
      <label htmlFor="filter">Filter by period:</label>
      <select id="filter" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
        <option value="all">All Time</option>
        <option value="day">Last 24 hours</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Uptime Percentage</th>
            <th>Average Response Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url}>
              <td>{url}</td>
              <td>{calculateUptimePercentage(url)}%</td>
              <td>{calculateAverageResponseTime(url)} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
