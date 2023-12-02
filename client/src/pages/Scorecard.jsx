import React from 'react';

const Scorecard = ({ matchDetails, team1Players, team2Players, loading, error }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!matchDetails || !team1Players || !team2Players) {
    return <div>No data available</div>;
  }

  return (
    <div className="scorecard p-4 bg-gray-200 rounded">
      <h2 className="text-xl font-bold mb-4">Match Details</h2>
      <h3 className="text-lg mb-2">{matchDetails.team1_name} vs {matchDetails.team2_name}</h3>
      
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Team A</h4>
        <p>Runs: {matchDetails.runs_team1}, Wickets: {matchDetails.wickets_team1}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Team B</h4>
        <p>Runs: {matchDetails.runs_team2}, Wickets: {matchDetails.wickets_team2}</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-2">Team A Players</h4>
        <ul>
          {team1Players.map((player, index) => (
            <li key={index} className="mb-2">{player.player_name} - Runs: {player.runs}, Wickets: {player.wickets}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-2">Team B Players</h4>
        <ul>
          {team2Players.map((player, index) => (
            <li key={index} className="mb-2">{player.player_name} - Runs: {player.runs}, Wickets: {player.wickets}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Scorecard;
