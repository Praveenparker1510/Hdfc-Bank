import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickLinks from "./components/QuickLinks";
import Products from "./components/Products";
import Offers from "./components/Offers";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import "./styles/global.css";

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onLoginClick={() => setLoginOpen(true)} />
      <Hero />
      <QuickLinks />
      <Products />
      <Offers />
      <Stats />
      <Footer />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
