import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LogInPage';
import Navbar from './components/nav'; 
import RegistrationPage from './pages/RegistrationPage';
import RecipesPage from './pages/RecipesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Home from './pages/homePage';


function HomePage() {
  return <h1>Welcome to the Recipe App!</h1>;
}

function App() {
  return (
   <div style={{ paddingTop: '60px' }}>
     <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
   </div>
  );
}

export default App;
