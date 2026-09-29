import { useState } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { HardDrives, ArrowRight } from "@phosphor-icons/react";
import Reveal from "../Component/Reveal";
import MagneticButton from "../Component/MagneticButton";

export default function Signup() {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    matchPassword: "",
    server: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const validationForm = () => {
    const { username, email, password, confirmPassword } = userdata;
    const newError = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      matchPassword: "",
      server: "",
    };

    if (!username.trim()) {
      newError.username = "Please enter a username";
    }

    if (!email.trim()) {
      newError.email = "Please enter an email address";
    }

    if (!password) {
      newError.password = "Please create a password";
    }

    if (!confirmPassword) {
      newError.confirmPassword = "Please confirm your password";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newError.matchPassword = "Passwords do not match";
    }

    setError(newError);
    return !Object.values(newError).some((message) => message !== "");
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUserData((curruserdata) => ({
      ...curruserdata,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
      server: "",
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const isValid = validationForm();
    if (!isValid) return;

    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        userdata
      );
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create account";
      setError((prev) => ({
        ...prev,
        server: message,
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: "var(--canvas-dark)",
        minHeight: "100dvh",
        color: "var(--text-light)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Seamless Floating Navbar matching Landing Page */}
      <Navbar forceTheme="dark" />

      {/* Main Split Layout Container */}
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr",
          minHeight: "100dvh",
          paddingTop: "76px",
        }}
        className="lg:!grid-cols-12"
      >
        {/* Left Side: Cinematic Archival Folders Still Life (Desktop & Tablet) */}
        <div
          style={{
            gridColumn: "span 6",
            position: "relative",
            margin: "clamp(12px, 2vw, 24px)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            border: "1px solid var(--border-dark)",
            display: "none",
          }}
          className="lg:!flex flex-col justify-end"
        >
          {/* Background Image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/auth-signup.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.72) contrast(1.05)",
            }}
          />

          {/* Vignette Gradients */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(13,13,14,0.92) 0%, rgba(13,13,14,0.4) 40%, rgba(13,13,14,0.15) 100%)",
            }}
          />

          {/* Editorial Caption Box */}
          <div style={{ position: "relative", zIndex: 2, padding: "clamp(32px, 5vw, 48px)" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              New Repository
            </div>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#FFFFFF",
                marginBottom: "10px",
              }}
            >
              A permanent digital repository.
            </h2>
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.72)",
                maxWidth: "42ch",
              }}
            >
              Dedicated personal storage for individuals and teams who care about sovereign file custody.
            </p>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div
          style={{
            gridColumn: "span 6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(24px, 5vw, 48px)",
          }}
        >
          <div style={{ width: "100%", maxWidth: "440px" }}>
            <Reveal y={24} duration={0.6}>
              {/* Brand & Heading */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "13px",
                    fontWeight: 500,
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "5px",
                      background: "#FFFFFF",
                      color: "#0D0D0E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <HardDrives weight="bold" size={13} />
                  </div>
                  <span>J-Drive Vault</span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(1.8rem, 2.5vw, 2.2rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    color: "#FFFFFF",
                    marginBottom: "8px",
                  }}
                >
                  Create your personal vault
                </h1>
                <p style={{ fontSize: "14.5px", color: "var(--text-light-muted)", lineHeight: 1.5 }}>
                  Set up your secure J-Drive account in under a minute.
                </p>
              </div>

              {/* Server-level error banner */}
              {error.server && (
                <div
                  style={{
                    background: "rgba(220, 38, 38, 0.12)",
                    border: "1px solid rgba(220, 38, 38, 0.28)",
                    borderRadius: "var(--radius-md)",
                    padding: "12px 16px",
                    marginBottom: "20px",
                    color: "#FCA5A5",
                    fontSize: "13.5px",
                    lineHeight: 1.4,
                  }}
                >
                  {error.server}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleOnSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="input-block">
                  <label htmlFor="signup-username" className="input-label-dark">
                    Username
                  </label>
                  <input
                    id="signup-username"
                    type="text"
                    name="username"
                    placeholder="Your name or handle"
                    value={userdata.username}
                    onChange={handleOnChange}
                    className="text-input-dark"
                    autoComplete="username"
                  />
                  {error.username && <p className="input-error-msg">{error.username}</p>}
                </div>

                <div className="input-block">
                  <label htmlFor="signup-email" className="input-label-dark">
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    placeholder="name@work.com"
                    value={userdata.email}
                    onChange={handleOnChange}
                    className="text-input-dark"
                    autoComplete="email"
                  />
                  {error.email && <p className="input-error-msg">{error.email}</p>}
                </div>

                <div className="input-block">
                  <label htmlFor="signup-password" className="input-label-dark">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={userdata.password}
                    onChange={handleOnChange}
                    className="text-input-dark"
                    autoComplete="new-password"
                  />
                  {error.password && <p className="input-error-msg">{error.password}</p>}
                </div>

                <div className="input-block">
                  <label htmlFor="signup-confirm" className="input-label-dark">
                    Confirm password
                  </label>
                  <input
                    id="signup-confirm"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={userdata.confirmPassword}
                    onChange={handleOnChange}
                    className="text-input-dark"
                    autoComplete="new-password"
                  />
                  {error.confirmPassword && <p className="input-error-msg">{error.confirmPassword}</p>}
                  {error.matchPassword && <p className="input-error-msg">{error.matchPassword}</p>}
                </div>

                <div style={{ marginTop: "8px" }}>
                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    className="btn-white"
                    style={{ width: "100%", height: "48px", fontSize: "14.5px" }}
                  >
                    <span>{submitting ? "Creating account..." : "Create free account"}</span>
                    <ArrowRight weight="bold" size={15} />
                  </MagneticButton>
                </div>
              </form>

              {/* Footer link */}
              <div
                style={{
                  marginTop: "28px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border-dark)",
                  fontSize: "13.5px",
                  color: "var(--text-light-muted)",
                }}
              >
                Already have a vault?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Sign in
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}