import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import { ShieldCheck, HardDrives, ArrowLeft, SignOut, LockKey } from "@phosphor-icons/react";
import Reveal from "../Component/Reveal";

export default function Setting() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/me`, { withCredentials: true })
      .then((res) => {
        setUser({ name: res.data.name, email: res.data.email });
      })
      .catch((err) => {
        console.error("Failed to load user settings:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div style={{ background: "var(--canvas-light)", minHeight: "100dvh", color: "var(--text-dark)" }}>
      <Navbar forceTheme="light" />

      <main className="app-page-wrapper">
        <div className="app-content-container" style={{ maxWidth: "780px" }}>
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <Link
              to="/homepage"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13.5px",
                fontWeight: 500,
                color: "var(--text-dark-muted)",
                marginBottom: "16px",
              }}
            >
              <ArrowLeft size={15} /> Back to Workspaces
            </Link>

            <h1
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "6px",
              }}
            >
              Account settings
            </h1>
            <p style={{ fontSize: "14.5px", color: "var(--text-dark-muted)" }}>
              Manage your personal credentials, storage preferences, and security.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Profile Information */}
            <div className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                Profile identity
              </h2>
              <p style={{ fontSize: "13.5px", color: "var(--text-dark-muted)", marginBottom: "20px" }}>
                Your identity across workspaces and files.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 0",
                  borderTop: "1px solid var(--border-light)",
                  borderBottom: "1px solid var(--border-light)",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: "var(--accent-primary)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-dark)" }}>
                    {loading ? "Loading..." : user.name || "J-Drive User"}
                  </div>
                  <div style={{ fontSize: "13.5px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                    {loading ? "..." : user.email}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                <div style={{ padding: "16px", background: "var(--canvas-light-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-dark-muted)", marginBottom: "4px" }}>
                    Username
                  </div>
                  <div style={{ fontSize: "14.5px", fontWeight: 500, color: "var(--text-dark)" }}>
                    {user.name || "Not set"}
                  </div>
                </div>

                <div style={{ padding: "16px", background: "var(--canvas-light-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-dark-muted)", marginBottom: "4px" }}>
                    Email Address
                  </div>
                  <div style={{ fontSize: "14.5px", fontWeight: 500, color: "var(--text-dark)" }}>
                    {user.email || "Not set"}
                  </div>
                </div>
              </div>
            </div>

            {/* Storage & Plan Card */}
            <div className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                Vault & storage tier
              </h2>
              <p style={{ fontSize: "13.5px", color: "var(--text-dark-muted)", marginBottom: "20px" }}>
                Active protections and privileges for your uploaded assets.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <HardDrives size={22} weight="bold" />
                    <div>
                      <div style={{ fontSize: "14.5px", fontWeight: 600 }}>Personal Cloud Storage</div>
                      <div style={{ fontSize: "13px", color: "var(--text-dark-muted)" }}>Unlimited workspaces, original fidelity</div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--success)",
                      background: "var(--success-subtle)",
                      border: "1px solid rgba(22, 163, 74, 0.2)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-pill)",
                    }}
                  >
                    Active
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid var(--border-light)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <ShieldCheck size={22} weight="bold" />
                    <div>
                      <div style={{ fontSize: "14.5px", fontWeight: 600 }}>HTTP-Only JWT Security</div>
                      <div style={{ fontSize: "13px", color: "var(--text-dark-muted)" }}>Cookies shielded against cross-site script access</div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--success)",
                      background: "var(--success-subtle)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-pill)",
                    }}
                  >
                    Protected
                  </span>
                </div>
              </div>
            </div>

            {/* Session Management */}
            <div className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                Session security
              </h2>
              <p style={{ fontSize: "13.5px", color: "var(--text-dark-muted)", marginBottom: "20px" }}>
                Sign out of your active session on this device.
              </p>

              <div>
                <button
                  onClick={handleLogout}
                  className="btn-danger"
                  style={{ padding: "10px 22px", fontSize: "13.5px" }}
                >
                  <SignOut size={16} />
                  <span>Sign out of J-Drive</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}