import React, { useState } from 'react';
import Summary from './components/Summary';
import LiveStatus from './components/LiveStatus';

const App = () => {
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleUrlSelect = (url) => {
    setSelectedUrl(url);
  };

  return (
    <div>
      <h1>Uptime Monitor</h1>
      <Summary />
      {selectedUrl && <LiveStatus url={selectedUrl} />}
      <div>
        {/* Example buttons or links to select URLs, adjust based on your actual data */}
        <button onClick={() => handleUrlSelect('http://example.com')}>Show Live Status for example.com</button>
        {/* Add more buttons for other URLs as needed */}
      </div>
    </div>
  );
};

export default App;
