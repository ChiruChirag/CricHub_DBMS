import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HighScoringMatchesList = () => {
  const [highScoringMatches, setHighScoringMatches] = useState([]);
  const [showMatches, setShowMatches] = useState(false);

  useEffect(() => {
    // Fetch high-scoring matches data from the backend API endpoint
    axios.get('http://localhost:3001/matches/players-with-high-scores')
      .then((response) => {
        setHighScoringMatches(response.data);
      })
      .catch((error) => {
        console.error('Error fetching high-scoring matches:', error);
      });
  }, []);

  const handleButtonClick = () => {
    setShowMatches(!showMatches);
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6">High-Scoring Matches</h2>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out mb-4"
      >
        {showMatches ? 'Hide Matches' : 'View Matches'}
      </button>
      {showMatches && (
        <ul>
          {highScoringMatches.map((match) => (
            <li key={match.match_id} className="mb-2">
              Match ID: {match.match_id}, Team 1: {match.team1_name}, Team 2: {match.team2_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HighScoringMatchesList;
