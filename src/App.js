// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Summary from './components/Summary';
import LiveStatus from './components/LiveStatus';

const App = () => {
  const urls = ['https://google.com', 'https://amazon.com']; // Add more URLs as needed

  return (
    <Router>
      <div>
        <h1>Uptime Monitor</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Summary</Link>
            </li>
            {urls.map((url, index) => (
              <li key={index}>
                <Link to={`/status/${encodeURIComponent(url)}`}>Live Status: {url}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Summary urls={urls} />} />
          <Route path="/status/:url" element={<LiveStatus url={decodeURIComponent(window.location.pathname.split('/').pop())} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
