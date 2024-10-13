

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RealEstateDashboard from "./components/landing/landing";
import LoginPage from "./components/login/login";
import SignupPage from "./components/login/signup";
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<RealEstateDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
