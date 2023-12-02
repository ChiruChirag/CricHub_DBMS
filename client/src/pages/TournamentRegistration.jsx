import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
const TournamentRegistration = () => {
  const navigate = useNavigate();

  const [tournamentDetails, setTournamentDetails] = useState({
    tournament_name: '',
    start_date: '',
    end_date: '',
    num_matches: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTournamentDetails({ ...tournamentDetails, [name]: value });
  };

    
  const handleSubmit = (event) => {
    event.preventDefault();
    const numMatches = tournamentDetails.num_matches; // Get numMatches from user input
    axios
      .post('http://localhost:3001/tournament/register', tournamentDetails)
      .then((response) => {
        console.log(response.data);
        const tournamentId = response.data.tournamentId;
        localStorage.setItem('tournamentId', tournamentId);
        
        navigate(`/matchDetails/${numMatches}`); // Pass numMatches as a parameter in the URL
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-8">
        <Header />
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register Tournament</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="tournament_name" className="block text-sm font-medium text-gray-600">
            Tournament Name
          </label>
          <input
            type="text"
            id="tournament_name"
            name="tournament_name"
            value={tournamentDetails.tournament_name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={tournamentDetails.start_date}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-600">
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={tournamentDetails.end_date}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="num_matches" className="block text-sm font-medium text-gray-600">
            Number of Matches
          </label>
          <input
            type="number"
            id="num_matches"
            name="num_matches"
            value={tournamentDetails.num_matches}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-purple-800 text-white p-2 rounded hover:bg-purple-500">
          Register Tournament
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default TournamentRegistration;
