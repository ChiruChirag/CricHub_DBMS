import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Scorecard from './Scorecard';
 // Initialize useHistory hook

// ... (import statements and other code)
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router

const Matches = () => {
  // State variables
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // Fetch match data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/matches')
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error('Error fetching match details:', error);
      });
  }, []);

  // Function to handle match item click
  const handleMatchClick = (matchId) => {
    // Fetch player data for the selected match
    axios.get(`http://localhost:3001/match/${matchId}/players`)
      .then((response) => {
        const { team1Players, team2Players } = response.data;
        
        setTeam1Players(team1Players);
        setTeam2Players(team2Players);
        setSelectedMatch(matchId);
        loading={loading}
        error={error}

        // Navigate to the /match/:matchId/players route after fetching data
        navigate(`/match/${matchId}/players`);
      })
      .catch((error) => {
        console.error('Error fetching player details:', error);
      });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header component */}
        <Header />

        <div className="flex flex-1 p-8">
          {/* Matches container */}
          <div className="matches-container w-1/3 bg-gray-200 p-4">
            <h2 className="text-xl font-bold mb-4">Match Details</h2>
            {matches.map((match) => (
              <div key={match.match_id} className="match-item cursor-pointer p-2 mb-2 rounded hover:bg-gray-300" onClick={() => handleMatchClick(match.match_id)}>
                {match.team1_name} vs {match.team2_name}
              </div>
            ))}
          </div>
          
          {/* Scorecard container */}
          <div className="scorecard-container flex-1 p-4">
            {selectedMatch && (
              <Scorecard matchDetails={matches.find(match => match.match_id === selectedMatch)} team1Players={team1Players} team2Players={team2Players} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
