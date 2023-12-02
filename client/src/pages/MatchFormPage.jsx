import React, { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const MatchFormPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [matchDetails, setMatchDetails] = useState({
    tournament_id: localStorage.getItem('tournamentId'), // Get tournamentId from localStorage
    stadium_id: 1, // Replace with actual stadium ID
    team1: '',
    team2: '',
    runs_team1: '',
    runs_team2: '',
    wickets_team1: '',
    wickets_team2: '',
  });
  

   console.log(matchDetails);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMatchDetails({ ...matchDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Create team1 record in teams table and get its ID
      const team1Response = await axios.post('http://localhost:3001/teams', {
        team_name: matchDetails.team1,
      });
      const team1Id = team1Response.data.teamId;
  
      // Create team2 record in teams table and get its ID
      const team2Response = await axios.post('http://localhost:3001/teams', {
        team_name: matchDetails.team2,
      });
      const team2Id = team2Response.data.teamId;
  
      // Use team1Id and team2Id to create a record in matches table
      const matchResponse = await axios.post('http://localhost:3001/match/add', {
         // You can remove this line if you're fetching tournament_id from localStorage
         // You can remove this line if you're fetching stadium_id from localStorage
        
        team1_id: team1Id,
        team2_id: team2Id,
        stadium_id: matchDetails.stadium_id,
        tournament_id: matchDetails.tournament_id,
        team1:matchDetails.team1,
        team2:matchDetails.team2,
        runs_team1:matchDetails.runs_team1,
        runs_team2: matchDetails.runs_team2,
        wickets_team1: matchDetails.wickets_team1,
        wickets_team2: matchDetails.wickets_team2
      });
  
      const newMatchId = matchResponse.data.newMatchId;
      localStorage.setItem('matchId', newMatchId);
      navigate(`/PlayerDetails/${newMatchId}`);
    } catch (error) {
      console.error('Error occurred while submitting match details:', error);
      // Handle errors
    }
  };
  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Match {matchId} Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Team 1</label>
          <input
            type="text"
            id="team1"
            name="team1"
            value={matchDetails.team1}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Team 2</label>
          <input
            type="text"
            id="team2"
            name="team2"
            value={matchDetails.team2}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Runs Team 1</label>
          <input
            type="number"
            id="runs_team1"
            name="runs_team1"
            value={matchDetails.runs_team1}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Runs Team 2</label>
          <input
            type="number"
            id="runs_team2"
            name="runs_team2"
            value={matchDetails.runs_team2}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Wickets Team 1</label>
          <input
            type="number"
            id="wickets_team1"
            name="wickets_team1"
            value={matchDetails.wicketsTeam1}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Wickets Team 2</label>
          <input
            type="number"
            id="wickets_team2"
            name="wickets_team2"
            value={matchDetails.wicketsTeam2}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Stadium Name</label>
          <input
            type="text"
            id="stadiumName"
            name="stadiumName"
            value={matchDetails.stadiumName}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Submit Match Details
        </button>
      </form>
    </div>
  );
};

export default MatchFormPage;
