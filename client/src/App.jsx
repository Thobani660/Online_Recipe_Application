import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LogInPage';
import Navbar from './components/nav'; // Ensure the path matches your file structure
import RegistrationPage from './pages/RegistrationPage';
import RecipesPage from './pages/RecipesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function HomePage() {
  return <h1>Welcome to the Recipe App!</h1>;
}

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar displayed on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
