import React, { useState } from 'react';
import axios from 'axios';
import HighScoringMatchesList from './HighScoringMatchesList'; // Import the new component
import TopPerformers from './TopPerformers';

const TournamentStats = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [teamRuns, setTeamRuns] = useState([]);
  const [error, setError] = useState(null);

  const fetchRunsByTournament = async () => {
    try {
      const encodedTournamentName = encodeURIComponent(tournamentName);
      const response = await axios.get(`http://localhost:3001/tournament/${encodedTournamentName}/runs`);
      setTeamRuns(response.data);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      console.error('Error fetching team runs:', error);
      setError('Error fetching team runs. Please try again.'); // Set error state on fetch error
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6">Tournament Stats</h2>
      <div className="mb-4 flex items-center">
        <label htmlFor="tournamentName" className="mr-2">Enter Tournament Name: </label>
        <input
          type="text"
          id="tournamentName"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          className="border border-gray-400 px-2 py-1 rounded"
        />
        <button
          onClick={fetchRunsByTournament}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
        >
          Get Runs
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Team Runs</h2>
        <ul>
          {teamRuns.map((team, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{team.team_name}:</span> {team.total_runs} runs<br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PlayerStats = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerRuns, setPlayerRuns] = useState(null);
  const [error, setError] = useState(null);

  const fetchPlayerRuns = async () => {
    try {
      const encodedTournamentName = encodeURIComponent(tournamentName);
      const encodedPlayerName = encodeURIComponent(playerName);
      const response = await axios.get(`http://localhost:3001/tournament/${encodedTournamentName}/player/${encodedPlayerName}/runs`);
      setPlayerRuns(response.data.totalRuns);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      console.error('Error fetching player runs:', error);
      setError('Error fetching player runs. Please try again.'); // Set error state on fetch error
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6">Player Stats</h2>
      <div className="mb-4 flex items-center">
        <label htmlFor="tournamentName" className="mr-2">Enter Tournament Name: </label>
        <input
          type="text"
          id="tournamentName"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          className="border border-gray-400 px-2 py-1 rounded"
        />
        <label htmlFor="playerName" className="ml-4 mr-2">Enter Player Name: </label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border border-gray-400 px-2 py-1 rounded"
        />
        <button
          onClick={fetchPlayerRuns}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
        >
          Get Player Runs
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {playerRuns !== null && (
        <div>
          <h3 className="text-2xl font-semibold mb-2">Player Runs</h3>
          <p><span className="font-semibold">{playerName}:</span> {playerRuns} runs</p>
        </div>
      )}
    </div>
  );
};

const Stats = () => {
  return (
    <div className="container mx-auto p-8 mt-8 bg-gray-100 rounded-lg shadow-lg">
      <TournamentStats />
      <PlayerStats />
      <HighScoringMatchesList />
      <TopPerformers />
    </div>
  );
};

export default Stats;
