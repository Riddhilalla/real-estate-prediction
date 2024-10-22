

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RealEstateDashboard from "./components/landing/landing";
import Dashboard from "./components/landing/dashboard";
import LoginPage from "./components/login/login";

import SignupPage from "./components/login/signup";
import InvestmentIndex from "./components/investment/investment";
import CompatibilityIndex from "./components/landing/ci";
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<RealEstateDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/ci" element={<CompatibilityIndex  />} />
        <Route path="/dashboard" element={< Dashboard />} />
        
        <Route path="/investment-calculator" element={<InvestmentIndex />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
