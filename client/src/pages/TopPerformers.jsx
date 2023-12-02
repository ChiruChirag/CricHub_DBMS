import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopPerformers = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [showPerformers, setShowPerformers] = useState(false);

  useEffect(() => {
    if (showPerformers) {
      // Fetch top performers data from the backend API endpoint when the button is clicked
      axios.get('http://localhost:3001/players/top-performers')
        .then((response) => {
          setTopPerformers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching top performers:', error);
        });
    }
  }, [showPerformers]);

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6">Top Performers</h2>
      <button
        onClick={() => setShowPerformers(!showPerformers)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out mb-4"
      >
        {showPerformers ? 'Hide Performers' : 'Show Performers'}
      </button>
      {showPerformers && (
        <ul>
          {topPerformers.map((player, index) => (
            <li key={index} className="mb-2">
              Player Name: {player.player_name}, Total Runs: {player.total_runs}, Total Wickets: {player.total_wickets}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopPerformers;
