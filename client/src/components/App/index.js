import React from 'react';
import Profile from '../Profile';
import People from '../People';
import Matches from '../Matches';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
  <>
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/People" element={<People />} />
          <Route path="/Matches" element={<Matches />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
