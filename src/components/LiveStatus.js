import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

const LiveStatus = ({ url }) => {
  const [responseTimes, setResponseTimes] = useState([]);

  useEffect(() => {
    // Fetch response time data for the selected URL
  }, [url]);

  const data = {
    labels: responseTimes.map((_, index) => `Request ${index + 1}`),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: responseTimes,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h5">Live Status for {url}</Typography>
      <Line data={data} />
    </Box>
  );
};

export default LiveStatus;
