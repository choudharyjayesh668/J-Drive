import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { HardDrives, SignOut, Gear, House, List, X, BookOpen } from "@phosphor-icons/react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import "../global.css";

export default function Navbar({ forceTheme }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 50 && isScrolled) {
      setIsScrolled(false);
    }
  });

  const isDarkHeroPage = location.pathname === "/" && !isScrolled;
  const isDark = forceTheme ? forceTheme === "dark" : isDarkHeroPage;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const fetchUserName = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
        withCredentials: true,
      });
      setUserName(response.data.name);
      setEmail(response.data.email);
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
      setUserName("");
      setEmail("");
    }
  };

  useEffect(() => {
    fetchUserName();
  }, [location.pathname]);

  const initials = userName
    ? userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  return (
    <motion.header
      className="app-navbar-container"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`app-navbar ${isDark ? "nav-dark" : "nav-light"}`}>
        <Link to={isLoggedIn ? "/homepage" : "/"} className="nav-brand">
          <div className="nav-brand-mark">
            <HardDrives weight="bold" size={16} />
          </div>
          <span>J-Drive</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          {isLoggedIn ? (
            <>
              <Link
                to="/homepage"
                className={`nav-link ${location.pathname === "/homepage" ? "active" : ""}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <House size={15} />
                <span>Workspaces</span>
              </Link>
              <Link
                to="/guide"
                className={`nav-link ${location.pathname === "/guide" ? "active" : ""}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <BookOpen size={15} />
                <span>Guide</span>
              </Link>
              <Link
                to="/setting"
                className={`nav-link ${location.pathname === "/setting" ? "active" : ""}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Gear size={15} />
                <span>Settings</span>
              </Link>
            </>
          ) : (
            <>
              <a href="/#workflow" className="nav-link">Workflow</a>
              <a href="/#capabilities" className="nav-link">Capabilities</a>
              <a href="/#security" className="nav-link">Security</a>
              <Link
                to="/guide"
                className={`nav-link ${location.pathname === "/guide" ? "active" : ""}`}
              >
                Storage Guide
              </Link>
            </>
          )}
        </nav>

        {/* Actions / User Profile */}
        <div className="nav-actions">
          {isLoggedIn ? (
            <>
              <div className="user-badge" title={email || userName}>
                <div className="user-avatar-circle">{initials}</div>
                <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {userName || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{
                  padding: "6px 14px",
                  fontSize: "13px",
                  color: isDark ? "#FFFFFF" : "var(--text-dark)",
                  borderColor: isDark ? "rgba(255,255,255,0.15)" : "var(--border-light)",
                }}
                title="Sign out of J-Drive"
              >
                <SignOut size={14} />
                <span>Exit</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link"
                style={{ padding: "6px 12px" }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={isDark ? "btn-white" : "btn-primary"}
                style={{ padding: "8px 18px", fontSize: "13px" }}
              >
                Create Account
              </Link>
            </>
          )}

          {/* Mobile hamburger toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`mobile-drawer ${isDark ? "mobile-drawer-dark" : ""}`}>
          {isLoggedIn ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "8px" }}>
                <div className="user-avatar-circle" style={{ width: "32px", height: "32px", fontSize: "13px" }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>{userName}</div>
                  <div style={{ fontSize: "12px", opacity: 0.65 }}>{email}</div>
                </div>
              </div>
              <Link
                to="/homepage"
                className="btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ justifyContent: "flex-start", gap: "8px" }}
              >
                <House size={16} /> Workspaces
              </Link>
              <Link
                to="/guide"
                className="btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ justifyContent: "flex-start", gap: "8px" }}
              >
                <BookOpen size={16} /> Storage Guide
              </Link>
              <Link
                to="/setting"
                className="btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ justifyContent: "flex-start", gap: "8px" }}
              >
                <Gear size={16} /> Settings
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="btn-danger"
                style={{ marginTop: "6px", width: "100%", justifyContent: "center" }}
              >
                <SignOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/#workflow"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: "8px 0" }}
              >
                Workflow
              </a>
              <a
                href="/#capabilities"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: "8px 0" }}
              >
                Capabilities
              </a>
              <a
                href="/#security"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: "8px 0" }}
              >
                Security
              </a>
              <Link
                to="/guide"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: "8px 0" }}
              >
                Storage Guide
              </Link>
              <hr style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "var(--border-light)", margin: "4px 0" }} />
              <Link
                to="/login"
                className="btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ justifyContent: "center" }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn-primary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ justifyContent: "center" }}
              >
                Create Free Account
              </Link>
            </>
          )}
        </div>
      )}
    </motion.header>
  );
}