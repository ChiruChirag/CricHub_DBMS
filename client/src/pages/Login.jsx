import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the 'registerowner' route
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/login', { email, password })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === 'Login Success') {
          const userId = res.data.user_id;

          // Store user id in local storage
          localStorage.setItem('user_id', userId);

          // Redirect to /home page on successful login
          navigate('/home');
        } else {
          setErrorMessage('Invalid Email or Password');
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('Error occurred while logging in');
      });
  };

  return (
<div className="flex min-h-screen items-center justify-center bg-gradient-to-bl from-purple-900 via-pink-600 to-orange-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Log in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">Email address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-indigo-600 focus:outline-none"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{' '}
          <span className="font-semibold text-blue-600 cursor-pointer" onClick={handleRegisterClick}>
            Register Now
          </span>
        </p>
        {errorMessage && <p className="mt-2 text-center text-sm text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}
