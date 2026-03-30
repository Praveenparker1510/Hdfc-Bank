import { useState, useEffect } from "react";
import "./Navbar.css";

const navItems = ["Personal", "NRI", "Business", "Corporate", "SME", "Agri"];
const subNavItems = ["Accounts", "Deposits", "Loans", "Cards", "Investments", "Insurance", "Forex", "Pay"];

export default function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-links">
            {["Locate Us", "Contact Us", "Feedback", "Sitemap"].map(l => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>
          <div className="top-right">
            <span>📞 1800-202-6161</span>
            <a href="#" className="btn-apply">Apply Now</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <div className="logo">
            <div className="logo-mark">
              <span className="logo-h">H</span>
              <span className="logo-dfc">DFC</span>
            </div>
            <div className="logo-text">
              <span className="bank-name">BANK</span>
              <span className="tagline">We understand your world</span>
            </div>
          </div>

          {/* Nav Links */}
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            {navItems.map(item => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="btn-login" onClick={onLoginClick}>
              🔒 Net Banking
            </button>
            <div
              className={`hamburger${menuOpen ? " active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </div>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="sub-nav">
          <div className="container sub-nav-inner">
            {subNavItems.map(item => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
