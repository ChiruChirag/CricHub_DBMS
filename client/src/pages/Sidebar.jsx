import React from 'react';
import { Link } from 'react-router-dom';
import Stats from './Stats'; // Import your Stats component

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-purple-800 h-screen w-1/9 p-4 text-white">
        <ul>
          {/* Sidebar Links */}
          <li className="mb-2 pb-2 border-b">
            <Link to="/" className="text-lg py-2 px-4 block hover:bg-slate-50 hover:text-black transition duration-300 rounded">Dashboard</Link>
          </li>
          <li className="mb-2 pb-2 border-b">
            <Link to="/home" className="text-lg py-2 px-4 block hover:bg-slate-50 hover:text-black transition duration-300 rounded">Home</Link>
          </li>
          <li className="mb-2 pb-2 border-b">
            <Link to="/matches" className="text-lg py-2 px-4 block hover:bg-slate-50 hover:text-black transition duration-300 rounded">Matches</Link>
          </li>
          <li className="mb-2 pb-2 border-b">
            <Link to="/tournamentRegistration" className="text-lg py-2 px-4 block hover:bg-slate-50 hover:text-black transition duration-300 rounded">Tournament Registration</Link>
          </li>
          {/* Stats Section */}
          <li className="mb-2 pb-2 border-b">
            <Link to="/stats" className="text-lg py-2 px-4 block hover:bg-slate-50 hover:text-black transition duration-300 rounded">Stats</Link>
          </li>
          {/* Add more sidebar sections as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        {/* Add your routing logic here */}
        {/* For example, use React Router to display the appropriate component based on the route */}
        {/* <Route path="/stats" component={Stats} /> */}
      </div>
    </div>
  );
};

export default Sidebar;
