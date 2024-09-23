import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Summary from './components/Summary';
import LiveStatus from './components/LiveStatus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/status/:url" element={<LiveStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
