import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import { ShieldCheck, HardDrives, ArrowLeft, SignOut, BookOpen, LockKey, CheckCircle } from "@phosphor-icons/react";

const MASKED_PLACEHOLDER = "••••••••";

export default function Setting() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [telegramData, setTelegramData] = useState({
    telegramBotToken: "",
    telegramChannelId: "",
  });
  const [hasSavedToken, setHasSavedToken] = useState(false);
  const [hasSavedChannel, setHasSavedChannel] = useState(false);
  const [isTokenEdited, setIsTokenEdited] = useState(false);
  const [isChannelEdited, setIsChannelEdited] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const toastTimeoutRef = useRef(null);
  const savedValuesRef = useRef({
    telegramBotToken: "",
    telegramChannelId: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/me`, { withCredentials: true })
      .then((res) => {
        setUser({ name: res.data.name, email: res.data.email });
        const token = res.data.telegramBotToken || "";
        const channelId = res.data.telegramChannelId || "";

        setTelegramData({
          telegramBotToken: token,
          telegramChannelId: channelId,
        });

        savedValuesRef.current = {
          telegramBotToken: token,
          telegramChannelId: channelId,
        };

        if (token) {
          setHasSavedToken(true);
          setIsTokenEdited(false);
        } else {
          setHasSavedToken(false);
          setIsTokenEdited(false);
        }

        if (channelId) {
          setHasSavedChannel(true);
          setIsChannelEdited(false);
        } else {
          setHasSavedChannel(false);
          setIsChannelEdited(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load user settings:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
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

  const handleTelegramToken = async (event) => {
    event.preventDefault();
    try {
      const tokenToSend =
        hasSavedToken && !isTokenEdited
          ? savedValuesRef.current.telegramBotToken
          : telegramData.telegramBotToken === MASKED_PLACEHOLDER
          ? savedValuesRef.current.telegramBotToken
          : telegramData.telegramBotToken;

      const channelToSend =
        hasSavedChannel && !isChannelEdited
          ? savedValuesRef.current.telegramChannelId
          : telegramData.telegramChannelId === MASKED_PLACEHOLDER
          ? savedValuesRef.current.telegramChannelId
          : telegramData.telegramChannelId;

      const payload = {
        telegramBotToken: tokenToSend,
        telegramChannelId: channelToSend,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/TelegramData`,
        payload,
        {
          withCredentials: true,
        },
      );
      console.log(response.data.message);

      savedValuesRef.current = {
        telegramBotToken: tokenToSend,
        telegramChannelId: channelToSend,
      };

      if (tokenToSend) {
        setHasSavedToken(true);
        setIsTokenEdited(false);
      } else {
        setHasSavedToken(false);
        setIsTokenEdited(false);
      }

      if (channelToSend) {
        setHasSavedChannel(true);
        setIsChannelEdited(false);
      } else {
        setHasSavedChannel(false);
        setIsChannelEdited(false);
      }

      setTelegramData({
        telegramBotToken: tokenToSend,
        telegramChannelId: channelToSend,
      });

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      setSuccessMessage(response.data.message);
      toastTimeoutRef.current = setTimeout(() => {
        setSuccessMessage("");
        toastTimeoutRef.current = null;
      }, 5000);
    } catch (err) {
      console.error("Failed to update Telegram data:", err);
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

            {/* Telegram Storage */}
            <div className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                Telegram Storage
              </h2>
              <p style={{ fontSize: "13.5px", color: "var(--text-dark-muted)", marginBottom: "20px" }}>
                Connect your Telegram bot and private channel to use your own Telegram storage with J-Drive.
              </p>

              <form onSubmit={handleTelegramToken} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="input-block">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label className="input-label" htmlFor="telegramBotToken">
                      Telegram Bot API Token
                    </label>
                    {hasSavedToken && !isTokenEdited && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsTokenEdited(true);
                          setTelegramData((prev) => ({ ...prev, telegramBotToken: "" }));
                        }}
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--accent-blue)",
                          cursor: "pointer",
                          padding: 0,
                          background: "none",
                          border: "none",
                        }}
                      >
                        Replace token
                      </button>
                    )}
                  </div>
                  <input
                    id="telegramBotToken"
                    type="password"
                    className="text-input-field"
                    onChange={(e) => {
                      let val = e.target.value;
                      if (hasSavedToken && !isTokenEdited) {
                        setIsTokenEdited(true);
                        val = val.replaceAll("•", "").replaceAll("●", "");
                      }
                      setTelegramData((prev) => ({
                        ...prev,
                        telegramBotToken: val,
                      }));
                    }}
                    onFocus={(e) => {
                      if (hasSavedToken && !isTokenEdited) {
                        e.target.select();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (hasSavedToken && !isTokenEdited && (e.key === "Backspace" || e.key === "Delete")) {
                        e.preventDefault();
                        setIsTokenEdited(true);
                        setTelegramData((prev) => ({ ...prev, telegramBotToken: "" }));
                      }
                    }}
                    value={hasSavedToken && !isTokenEdited ? MASKED_PLACEHOLDER : telegramData.telegramBotToken}
                    placeholder="Enter your Telegram Bot API token"
                  />
                </div>

                <div className="input-block">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label className="input-label" htmlFor="telegramChannelId">
                      Telegram Channel ID
                    </label>
                    {hasSavedChannel && !isChannelEdited && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsChannelEdited(true);
                          setTelegramData((prev) => ({ ...prev, telegramChannelId: "" }));
                        }}
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--accent-blue)",
                          cursor: "pointer",
                          padding: 0,
                          background: "none",
                          border: "none",
                        }}
                      >
                        Replace ID
                      </button>
                    )}
                  </div>
                  <input
                    id="telegramChannelId"
                    type="password"
                    className="text-input-field"
                    onChange={(e) => {
                      let val = e.target.value;
                      if (hasSavedChannel && !isChannelEdited) {
                        setIsChannelEdited(true);
                        val = val.replaceAll("•", "").replaceAll("●", "");
                      }
                      setTelegramData((prev) => ({
                        ...prev,
                        telegramChannelId: val,
                      }));
                    }}
                    onFocus={(e) => {
                      if (hasSavedChannel && !isChannelEdited) {
                        e.target.select();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (hasSavedChannel && !isChannelEdited && (e.key === "Backspace" || e.key === "Delete")) {
                        e.preventDefault();
                        setIsChannelEdited(true);
                        setTelegramData((prev) => ({ ...prev, telegramChannelId: "" }));
                      }
                    }}
                    value={hasSavedChannel && !isChannelEdited ? MASKED_PLACEHOLDER : telegramData.telegramChannelId}
                    placeholder="Enter your Telegram Channel ID"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                    paddingTop: "4px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12.5px",
                      color: "var(--text-dark-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <LockKey size={14} />
                    <span>Keep your Bot API token private. Never share it publicly.</span>
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    {successMessage && (
                      <div
                        role="status"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 14px",
                          borderRadius: "var(--radius-pill)",
                          background: "var(--success-subtle)",
                          border: "1px solid rgba(22, 163, 74, 0.25)",
                          color: "var(--success)",
                          fontSize: "13px",
                          fontWeight: 500,
                          animation: "toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <CheckCircle size={15} weight="fill" />
                        <span>{successMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ padding: "10px 24px", fontSize: "13.5px" }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
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

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid var(--border-light)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <BookOpen size={22} weight="bold" />
                    <div>
                      <div style={{ fontSize: "14.5px", fontWeight: 600 }}>Telegram Storage Setup</div>
                      <div style={{ fontSize: "13px", color: "var(--text-dark-muted)" }}>Step-by-step bot and private channel instructions</div>
                    </div>
                  </div>
                  <Link
                    to="/guide"
                    className="btn-secondary"
                    style={{ padding: "6px 14px", fontSize: "12.5px" }}
                  >
                    Read Guide
                  </Link>
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