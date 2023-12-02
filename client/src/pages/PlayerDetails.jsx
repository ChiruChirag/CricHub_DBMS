import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlayerDetails = () => {
  const [team1Players, setTeam1Players] = useState(Array(11).fill({ name: '', runs: '', wickets: '' }));
  const [team2Players, setTeam2Players] = useState(Array(11).fill({ name: '', runs: '', wickets: '' }));
  const [matchId, setMatchId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedMatchId = localStorage.getItem('matchId');
    if (storedMatchId) {
      setMatchId(storedMatchId);
    }
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  const handlePlayerInputChange = (event, index, field, team) => {
    const updatedPlayers = team === 1 ? [...team1Players] : [...team2Players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: event.target.value,
    };

    if (team === 1) {
      setTeam1Players(updatedPlayers);
    } else {
      setTeam2Players(updatedPlayers);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const allPlayers = [...team1Players, ...team2Players].filter(player => player.name && player.runs && player.wickets);
    console.log('All Players:', allPlayers);
    console.log('Match ID:', matchId);
  
    axios
      .post(`http://localhost:3001/match/${matchId}/players/add`, { players: allPlayers }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Player Details Submitted:', response.data);
        const newMatchId = response.data.newMatchId; // Ensure the response key matches the one sent from the server
        localStorage.setItem('matchId', newMatchId);
        console.log(newMatchId);

        navigate(`/MatchDetails/${newMatchId}`);
        // Handle success, maybe redirect or show a success message
      })
      .catch((error) => {
        console.error('Error occurred while submitting player details:', error);
        // Handle errors
      });
  };
  


  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Player Details Form for Match {matchId}</h2>
      <form onSubmit={handleSubmit}>
        {/* Team 1 Players */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Team 1 Players</h3>
          {team1Players.map((player, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-600">
                Player {index + 1} Name (Team 1)
              </label>
              <input
                type="text"
                value={player.name}
                onChange={(event) => handlePlayerInputChange(event, index, 'name', 1)}
                className="mt-1 p-2 border rounded w-full"
              />
              <label className="block text-sm font-medium text-gray-600">Runs</label>
              <input
                type="number"
                value={player.runs}
                onChange={(event) => handlePlayerInputChange(event, index, 'runs', 1)}
                className="mt-1 p-2 border rounded w-full"
              />
              <label className="block text-sm font-medium text-gray-600">Wickets</label>
              <input
                type="number"
                value={player.wickets}
                onChange={(event) => handlePlayerInputChange(event, index, 'wickets', 1)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
          ))}
        </div>

        {/* Team 2 Players */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Team 2 Players</h3>
          {team2Players.map((player, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-600">
                Player {index + 1} Name (Team 2)
              </label>
              <input
                type="text"
                value={player.name}
                onChange={(event) => handlePlayerInputChange(event, index, 'name', 2)}
                className="mt-1 p-2 border rounded w-full"
              />
              <label className="block text-sm font-medium text-gray-600">Runs</label>
              <input
                type="number"
                value={player.runs}
                onChange={(event) => handlePlayerInputChange(event, index, 'runs', 2)}
                className="mt-1 p-2 border rounded w-full"
              />
              <label className="block text-sm font-medium text-gray-600">Wickets</label>
              <input
                type="number"
                value={player.wickets}
                onChange={(event) => handlePlayerInputChange(event, index, 'wickets', 2)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Submit Player Details
        </button>
      </form>
    </div>
  );
};

export default PlayerDetails;
