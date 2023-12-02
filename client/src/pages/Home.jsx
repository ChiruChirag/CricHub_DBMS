import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

const Home = () => {
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    // Fetch the latest message from the backend when the component mounts
    const fetchLatestMessage = async () => {
      try {
        const response = await axios.get('http://localhost:3001/messages/latest');
        setLatestMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching latest message:', error);
      }
    };

    fetchLatestMessage(); // Call the function to fetch the latest message
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-8">
        <Header />
        <section className="bg-gray-100 rounded p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Matches</h2>
          {/* Content for Matches */}
        </section>
        <section className="bg-gray-100 rounded p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Tournament Registration</h2>
          <p className="text-xl font-bold mb-4">Create your Tournament Now !!!</p>
          <Link to="/tournamentRegistration" className="bg-violet-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
             Register Here
          </Link>
        </section>
        <section className="bg-gray-100 rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Latest Message</h2>
          {latestMessage ? <p className="text-xl">{latestMessage}</p> : <p className="text-xl">No new messages available</p>}
        </section>
      </div>
    </div>
  );
};

export default Home;
