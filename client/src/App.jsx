import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/nav';
import LoginPage from './pages/LogInPage';
import RegistrationPage from './pages/RegistrationPage';
import RecipesPage from './pages/RecipesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Home from './pages/homePage';

// Mock authentication function (replace this with real authentication logic)
const isAuthenticated = () => {
  return localStorage.getItem('token'); // Check for token in localStorage or any authentication method
};

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div style={{ paddingTop: '60px' }}>
      <Router>
        <Navbar />
        <Routes>
          {/* Home is accessible to everyone */}
          <Route path="/" element={<Home />} />

          {/* Protected routes */}
          <Route path="/recipes" element={<RecipesPage />} />

          {/* Public routes for login and registration */}
          <Route path="/login" element={ <LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* Privacy policy is public */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
