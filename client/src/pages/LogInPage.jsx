import React, { useState } from 'react';
import axios from 'axios';

function SignIn({ onSignIn }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signin', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        setMessage('Sign in successful');
        onSignIn(); // Call the onSignIn function passed as prop
      })
      .catch(error => setMessage(error.response.data.error));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Sign In
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default SignIn;
