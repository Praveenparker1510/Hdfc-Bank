import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import Home from "./pages/Home";
import DynamicPage from "./pages/DynamicPage";
import LocateUs from "./pages/LocateUs";
import ApplyLoan from "./pages/ApplyLoan";
import Dashboard from "./pages/Dashboard";
import "./styles/global.css";

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  const handleLogin = (loginData) => {
    setUser({ id: loginData.id, password: loginData.password });
    setLoginOpen(false);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="app">
      {!isDashboard && <Navbar user={user} onLoginClick={() => setLoginOpen(true)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locate-us" element={<LocateUs />} />
        <Route path="/apply-loan" element={<ApplyLoan />} />
        <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
        {/* Dynamic catch-all for any other clicked links */}
        <Route path="/:pageName" element={<DynamicPage />} />
      </Routes>
      {!isDashboard && <Footer />}
      <LoginModal 
        isOpen={loginOpen} 
        onClose={() => setLoginOpen(false)} 
        onLogin={handleLogin}
      />
    </div>
  );
}
