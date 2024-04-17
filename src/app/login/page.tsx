'use client'

import React, { useState } from 'react';
import firebase from '../../firebase/firebase';
import 'firebase/compat/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user : any = userCredential.user;

      // Clear any previous errors
      setError(null);

      // Determine dashboard route based on user email
      if (user.email === 'usera@gmail.com') {
        window.location.href = '/useradashboard'; // Redirect to usera dashboard
      } else if (user.email === 'userb@gmail.com') {
        window.location.href = '/userbdashboard'; // Redirect to userb dashboard
      }

      // Save token in localStorage
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
    } catch (error : any) {
      console.error('Error logging in:', error.message);
      setError(error.message); // Display error message
    }
  };

  return (
    <div className="bg-blue-600 flex flex-col gap-5 p-5 w-auto max-w-sm mx-auto rounded-lg shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-5">Log In</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded"
        placeholder="Password"
      />
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none"
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
