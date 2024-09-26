const axios = require('axios');
const fs = require('fs');

// URLs to monitor
const urls = [
  { url: 'https://google.com', name: 'Google' },
  { url: 'https://amazon.com', name: 'Amazon' }
];

// Path to store the uptime data
const uptimeFile = './uptime.json';

(async function checkUptime() {
  let uptimeData = [];
  
  // Try to read existing uptime data
  try {
    uptimeData = JSON.parse(fs.readFileSync(uptimeFile, 'utf8'));
  } catch (e) {
    console.log('No previous uptime data found, starting fresh.');
  }

  // Check each URL
  for (const { url, name } of urls) {
    try {
      const start = Date.now();
      const response = await axios.get(url);
      const responseTime = Date.now() - start;

      uptimeData.push({
        name,
        url,
        status: 'up',
        responseTime,
        timestamp: new Date().toISOString()
      });

      console.log(`${name} is up. Response time: ${responseTime}ms`);
    } catch (error) {
      uptimeData.push({
        name,
        url,
        status: 'down',
        responseTime: null,
        timestamp: new Date().toISOString()
      });

      console.log(`${name} is down.`);
    }
  }

  // Save updated data to file
  fs.writeFileSync(uptimeFile, JSON.stringify(uptimeData, null, 2));
})();
