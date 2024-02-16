import React from 'react';
import HomePage from '../HomePage';
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
          <Route path="/" element={<HomePage />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="/People" element={<People />} />
          <Route path="/Matches" element={<Matches />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
