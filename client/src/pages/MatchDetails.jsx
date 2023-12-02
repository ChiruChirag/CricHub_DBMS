import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const MatchDetailsPage = () => {
  const { numMatches } = useParams();

  const generateMatchForms = () => {
    const forms = [];
    for (let i = 1; i <= numMatches; i++) {
      forms.push(
        <div key={i} className="container mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Match {i} Details</h2>
          <Link to={`/matchFormPage/${i}`}>
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
              Go to Match {i} Details
            </button>
          </Link>
        </div>
      );
    }
    return forms;
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Match Details</h2>
      {generateMatchForms()}
    </div>
  );
};

export default MatchDetailsPage;
