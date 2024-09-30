import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', userData)
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage(error.response.data.error));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          required
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          required
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default SignUp;
