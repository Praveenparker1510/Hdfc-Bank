import { useState, useEffect } from "react";
import "./LoginModal.css";

export default function LoginModal({ isOpen, onClose }) {
  const [showPass, setShowPass] = useState(false);
  const [activeTab, setActiveTab] = useState("retail");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [form, setForm] = useState({ userId: "", password: "", remember: false });

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setForm({ userId: "", password: "", remember: false });
      }, 1800);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay${isOpen ? " active" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Left Panel */}
        <div className="modal-left">
          <div className="modal-brand">
            <div className="modal-logo">
              <span className="logo-h">H</span>DFC
            </div>
            <h2>Net Banking</h2>
            <p>Secure. Fast. Always Available.</p>
          </div>
          <div className="modal-features">
            {[
              "256-bit SSL encryption",
              "Two-factor authentication",
              "24/7 fraud monitoring",
            ].map((f) => (
              <div key={f} className="mf">
                <span className="mf-check">✓</span> {f}
              </div>
            ))}
          </div>
          <div className="modal-decoration" />
        </div>

        {/* Right Panel */}
        <div className="modal-right">
          <h3>Login to Net Banking</h3>

          <div className="login-tabs">
            {["retail", "corporate"].map((tab) => (
              <button
                key={tab}
                className={`ltab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Customer ID / User ID</label>
              <input
                type="text"
                placeholder={activeTab === "retail" ? "Enter your Customer ID" : "Enter Corporate User ID"}
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>IPIN / Password</label>
              <div className="password-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your IPIN"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                />
                Remember me
              </label>
              <a href="#" className="forgot">Forgot IPIN?</a>
            </div>

            <button
              type="submit"
              className={`btn-login-submit${status === "success" ? " success" : ""}`}
              disabled={status === "loading" || status === "success"}
            >
              {status === "idle" && "Login Securely →"}
              {status === "loading" && (
                <span className="spinner-wrap">
                  <span className="spinner" /> Authenticating...
                </span>
              )}
              {status === "success" && "✓ Login Successful!"}
            </button>

            <div className="register-link">
              New user? <a href="#">Register for Net Banking</a>
            </div>

            <div className="modal-disclaimer">
              <p>🔒 Your session is protected with end-to-end encryption. HDFC Bank will never ask for your password via phone or email.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
