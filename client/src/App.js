import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import MatchDetails from './pages/MatchDetails';
import MatchFormPage from './pages/MatchFormPage';
import Matches from './pages/Matches';
import Scorecard from './pages/Scorecard';
import Stats from './pages/Stats';

import PlayerDetails from './pages/PlayerDetails';

import TournamentRegistration from './pages/TournamentRegistration';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} /> {/* Render LoginPage component for the root path */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tournamentRegistration" element={<TournamentRegistration />} />
        <Route path="/matchDetails/:numMatches" element={<MatchDetails />} />
        <Route path="/MatchFormPage/:matchId" element={<MatchFormPage />} />
        <Route path="/matches" element={<Matches/>} />
        <Route path="/PlayerDetails/:matchId" element={<PlayerDetails />} />
        <Route path="/match/:matchId/players" element={<Scorecard />} />
        <Route path="/Stats" element={<Stats/>} />

        
      </Routes>
    </Router>
  );
};

export default App;
