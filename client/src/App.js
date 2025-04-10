import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Features from './pages/Features';
import Pricing from './pages/Pricing.jsx';
import LoginPage2 from './pages/auth/LoginPage2.jsx';
import RegisterPage2 from './pages/auth/RegisterPage2';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login2" element={<LoginPage2/>}/>
        <Route path="/register2" element={<RegisterPage2/>}/>
      </Routes>
    </Router>
  );
}

export default App;