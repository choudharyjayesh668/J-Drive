import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Reveal from "../Component/Reveal";
import MagneticButton from "../Component/MagneticButton";
import {
  HardDrives,
  ArrowLeft,
  ArrowRight,
  Robot,
  Broadcast,
  SlidersHorizontal,
  CheckCircle,
  ShieldWarning,
  WarningCircle,
  Copy,
  Check,
  ArrowSquareOut,
  Info,
  LockKey,
  Database,
  CloudCheck,
} from "@phosphor-icons/react";

export default function Guide() {
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedChannel, setCopiedChannel] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "token") {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2200);
    } else if (type === "channel") {
      setCopiedChannel(true);
      setTimeout(() => setCopiedChannel(false), 2200);
    } else if (type === "command") {
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2200);
    }
  };

  return (
    <div style={{ background: "var(--canvas-light)", minHeight: "100dvh", color: "var(--text-dark)" }}>
      {/* Light Navbar matching J-Drive editorial documentation aesthetic */}
      <Navbar forceTheme="light" />

      <main className="app-page-wrapper">
        <article className="app-content-container" style={{ maxWidth: "860px" }}>
          
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: "28px" }}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13.5px",
                fontWeight: 500,
                color: "var(--text-dark-muted)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dark-muted)")}
            >
              <ArrowLeft size={15} />
              <span>Back to J-Drive</span>
            </Link>
          </div>

          {/* ==========================================================================
              1. INTRODUCTION SECTION
              ========================================================================== */}
          <header style={{ marginBottom: "48px" }}>
            <Reveal y={24} duration={0.6}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-dark-muted)",
                  background: "var(--canvas-light-alt)",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--border-light)",
                  marginBottom: "16px",
                }}
              >
                <span>Documentation</span>
                <span>•</span>
                <span>Storage Setup</span>
              </div>
            </Reveal>

            <Reveal y={28} delay={0.08} duration={0.6}>
              <h1
                style={{
                  fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.1,
                  color: "var(--text-dark)",
                  marginBottom: "18px",
                }}
              >
                Connect your Telegram storage
              </h1>
            </Reveal>

            <Reveal y={24} delay={0.14} duration={0.6}>
              <p
                style={{
                  fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                  lineHeight: 1.6,
                  color: "var(--text-dark-muted)",
                  maxWidth: "68ch",
                  marginBottom: "24px",
                }}
              >
                J-Drive uses your own Telegram bot and private channel to store your files.
                Connect them once and J-Drive will use that storage when you upload files.
              </p>
            </Reveal>

            <Reveal y={20} delay={0.2} duration={0.6}>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "var(--text-dark)",
                  maxWidth: "68ch",
                  marginBottom: "32px",
                }}
              >
                Unlike standard cloud providers where customer files are placed in one shared repository,
                J-Drive is engineered around personal storage isolation. Each J-Drive user connects their own
                Telegram bot and their own private channel. J-Drive never uses a shared channel for multiple users.
              </p>
            </Reveal>

            {/* Architecture Visual: J-Drive -> Your Telegram Bot -> Your Channel -> Actual Files */}
            <Reveal y={28} delay={0.25} duration={0.7}>
              <div
                className="editorial-card"
                style={{
                  background: "var(--surface-white)",
                  borderRadius: "var(--radius-xl)",
                  padding: "clamp(24px, 4vw, 32px)",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-dark-muted)",
                    marginBottom: "20px",
                  }}
                >
                  Storage Architecture Flow
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                    alignItems: "center",
                    gap: "12px",
                    position: "relative",
                  }}
                >
                  {/* Step 1 in Flow: J-Drive Interface */}
                  <div
                    style={{
                      background: "var(--canvas-light-alt)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-lg)",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        margin: "0 auto 10px auto",
                        borderRadius: "var(--radius-md)",
                        background: "#0D0D0E",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <HardDrives size={18} weight="bold" />
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-dark)" }}>
                      J-Drive
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      User Interface & Logic
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "var(--text-dark-quiet)" }}>
                    <ArrowRight size={18} weight="bold" className="hidden md:block" />
                    <span className="block md:hidden">↓</span>
                  </div>

                  {/* Step 2 in Flow: User's Bot */}
                  <div
                    style={{
                      background: "var(--canvas-light-alt)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-lg)",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        margin: "0 auto 10px auto",
                        borderRadius: "var(--radius-md)",
                        background: "#0D0D0E",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Robot size={18} weight="bold" />
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-dark)" }}>
                      Your Telegram Bot
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Dedicated API Worker
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "var(--text-dark-quiet)" }}>
                    <ArrowRight size={18} weight="bold" className="hidden md:block" />
                    <span className="block md:hidden">↓</span>
                  </div>

                  {/* Step 3 in Flow: User's Channel */}
                  <div
                    style={{
                      background: "var(--canvas-light-alt)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-lg)",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        margin: "0 auto 10px auto",
                        borderRadius: "var(--radius-md)",
                        background: "#0D0D0E",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Broadcast size={18} weight="bold" />
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-dark)" }}>
                      Your Channel
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Private Storage Vault
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "var(--text-dark-quiet)" }}>
                    <ArrowRight size={18} weight="bold" className="hidden md:block" />
                    <span className="block md:hidden">↓</span>
                  </div>

                  {/* Step 4 in Flow: Actual Files */}
                  <div
                    style={{
                      background: "var(--canvas-light-alt)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-lg)",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        margin: "0 auto 10px auto",
                        borderRadius: "var(--radius-md)",
                        background: "var(--success)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CloudCheck size={18} weight="bold" />
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-dark)" }}>
                      Actual Files
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Secure Binary Storage
                    </div>
                  </div>
                </div>

                {/* Storage Responsibility Split */}
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "20px",
                    borderTop: "1px solid var(--border-light)",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      background: "var(--canvas-light)",
                      padding: "14px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <Database size={16} weight="bold" color="var(--text-dark)" />
                      <span style={{ fontSize: "13px", fontWeight: 600 }}>Stored in J-Drive (MongoDB)</span>
                    </div>
                    <ul style={{ fontSize: "12.5px", color: "var(--text-dark-muted)", paddingLeft: "18px", lineHeight: 1.6 }}>
                      <li>User account credentials & authentication</li>
                      <li>Folder structure & hierarchy</li>
                      <li>File names, MIME types, and sizes</li>
                      <li>Telegram file IDs & message references</li>
                    </ul>
                  </div>

                  <div
                    style={{
                      background: "var(--canvas-light)",
                      padding: "14px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <Broadcast size={16} weight="bold" color="var(--text-dark)" />
                      <span style={{ fontSize: "13px", fontWeight: 600 }}>Stored in Your Telegram Channel</span>
                    </div>
                    <ul style={{ fontSize: "12.5px", color: "var(--text-dark-muted)", paddingLeft: "18px", lineHeight: 1.6 }}>
                      <li>Actual uploaded file binaries</li>
                      <li>Documents, images, videos, and archives</li>
                      <li>Original fidelity preserved without alterations</li>
                      <li>Accessible only to you and your authorized bot</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </header>

          {/* ==========================================================================
              STEP-BY-STEP PROCESS SECTION
              ========================================================================== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px", marginBottom: "64px" }}>

            {/* ----------------------------------------------------------------------
                STEP 1 — CREATE A TELEGRAM BOT
                ---------------------------------------------------------------------- */}
            <Reveal y={32} duration={0.65}>
              <section className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid var(--border-light)",
                      background: "var(--canvas-light-alt)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                      flexShrink: 0,
                    }}
                  >
                    01
                  </div>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-dark)" }}>
                      Create a Telegram Bot
                    </h2>
                    <p style={{ fontSize: "14px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Generate an official bot via Telegram&apos;s verified BotFather to act as your storage messenger.
                    </p>
                  </div>
                </div>

                <div style={{ paddingLeft: "52px" }}>
                  <ol style={{ fontSize: "14.5px", lineHeight: 1.7, color: "var(--text-dark)", marginBottom: "20px", paddingLeft: "20px" }}>
                    <li>Open the Telegram app on your phone, tablet, or desktop.</li>
                    <li>Search for <code style={{ background: "var(--canvas-light-alt)", padding: "2px 6px", borderRadius: "4px", fontSize: "13.5px" }}>@BotFather</code>.</li>
                    <li>Open the official account (verify the blue checkmark beside the name).</li>
                    <li>Start a conversation with BotFather by clicking <strong>Start</strong> or sending <code>/start</code>.</li>
                    <li>
                      Send the command:
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          margin: "6px 0",
                          padding: "4px 10px",
                          background: "#0D0D0E",
                          color: "#FFFFFF",
                          borderRadius: "var(--radius-pill)",
                          fontSize: "13px",
                          fontFamily: "monospace",
                        }}
                      >
                        <span>/newbot</span>
                        <button
                          type="button"
                          onClick={() => handleCopy("/newbot", "command")}
                          style={{
                            color: "#FFFFFF",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            opacity: 0.85,
                            transition: "opacity 0.2s ease",
                          }}
                          title="Copy command"
                        >
                          {copiedCommand ? <Check size={13} color="#22C55E" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </li>
                    <li>Enter a display name for your bot (for example: <em style={{ color: "var(--text-dark-muted)" }}>My J-Drive Storage Bot</em>).</li>
                    <li>
                      Enter a unique username for your bot. Telegram requires bot usernames to end with <code>bot</code>
                      (for example: <em style={{ color: "var(--text-dark-muted)" }}>jdrive_storage_bot</em>).
                    </li>
                    <li>BotFather will confirm that the bot has been created.</li>
                    <li>BotFather will output your unique <strong>Bot API token</strong>.</li>
                  </ol>

                  {/* Warning on Token Privacy */}
                  <div
                    style={{
                      background: "var(--canvas-light-alt)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 18px",
                      marginBottom: "18px",
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <LockKey size={20} weight="bold" color="var(--text-dark)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div style={{ fontSize: "13.5px", lineHeight: 1.55 }}>
                      <strong>The Bot API token is your bot&apos;s private credential. Do not share it with anyone.</strong>
                      <div style={{ color: "var(--text-dark-muted)", marginTop: "4px" }}>
                        Anyone with access to your Bot API token can interact with your bot and upload or delete items in the channels where your bot is an administrator.
                      </div>
                    </div>
                  </div>

                  {/* Example Code Visual */}
                  <div
                    style={{
                      background: "#151517",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 18px",
                      color: "#FFFFFF",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)" }}>
                        Example Token Format (Illustration Only)
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#F59E0B",
                          background: "rgba(245, 158, 11, 0.12)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-pill)",
                        }}
                      >
                        Not A Real Token
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "monospace",
                        fontSize: "14px",
                        color: "#E5E7EB",
                        wordBreak: "break-all",
                        gap: "12px",
                      }}
                    >
                      <span>123456789:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("123456789:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "token")}
                        className="btn-secondary-dark"
                        style={{
                          padding: "6px 12px",
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                        title="Copy sample format"
                      >
                        {copiedToken ? (
                          <>
                            <Check size={13} color="#22C55E" />
                            <span>Copied example</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy format</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginTop: "8px" }}>
                      Note: The token above is purely an example. Always copy the real token directly issued by @BotFather.
                    </div>
                  </div>

                  {/* External Link to BotFather */}
                  <div>
                    <a
                      href="https://t.me/BotFather"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ fontSize: "13.5px", padding: "8px 18px" }}
                    >
                      <span>Open @BotFather in Telegram</span>
                      <ArrowSquareOut size={15} />
                    </a>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ----------------------------------------------------------------------
                STEP 2 — CREATE A PRIVATE TELEGRAM CHANNEL
                ---------------------------------------------------------------------- */}
            <Reveal y={32} duration={0.65}>
              <section className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid var(--border-light)",
                      background: "var(--canvas-light-alt)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                      flexShrink: 0,
                    }}
                  >
                    02
                  </div>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-dark)" }}>
                      Create a Private Telegram Channel
                    </h2>
                    <p style={{ fontSize: "14px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Set up the private container in Telegram that will hold your physical file uploads.
                    </p>
                  </div>
                </div>

                <div style={{ paddingLeft: "52px" }}>
                  <ol style={{ fontSize: "14.5px", lineHeight: 1.7, color: "var(--text-dark)", marginBottom: "20px", paddingLeft: "20px" }}>
                    <li>Open Telegram on your device.</li>
                    <li>Create a new channel (On desktop: Menu → <strong>New Channel</strong>; on mobile: New Message icon → <strong>New Channel</strong>).</li>
                    <li>Give the channel a clear name such as <strong>&ldquo;J-Drive Storage&rdquo;</strong>.</li>
                    <li>Set the channel privacy setting to <strong>Private</strong>.</li>
                    <li>Complete the creation of the channel.</li>
                  </ol>

                  <div
                    style={{
                      background: "var(--canvas-light-alt)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      padding: "16px",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <Info size={20} weight="bold" color="var(--text-dark)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--text-dark)" }}>
                      <strong>Important: Personal channel ownership</strong>
                      <p style={{ color: "var(--text-dark-muted)", marginTop: "4px" }}>
                        Always connect a channel that you personally control. Setting the channel to <strong>Private</strong> ensures
                        nobody can discover or join your channel without an explicit invite link. Do not make this channel public.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ----------------------------------------------------------------------
                STEP 3 — ADD YOUR BOT TO THE CHANNEL
                ---------------------------------------------------------------------- */}
            <Reveal y={32} duration={0.65}>
              <section className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid var(--border-light)",
                      background: "var(--canvas-light-alt)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                      flexShrink: 0,
                    }}
                  >
                    03
                  </div>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-dark)" }}>
                      Add your bot to the channel
                    </h2>
                    <p style={{ fontSize: "14px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Grant your bot administrator privileges so J-Drive can send documents to the channel on your behalf.
                    </p>
                  </div>
                </div>

                <div style={{ paddingLeft: "52px" }}>
                  <ol style={{ fontSize: "14.5px", lineHeight: 1.7, color: "var(--text-dark)", marginBottom: "20px", paddingLeft: "20px" }}>
                    <li>Open your newly created private storage channel.</li>
                    <li>Open the channel settings or channel info modal.</li>
                    <li>Go to <strong>Administrators</strong>.</li>
                    <li>Click <strong>Add Administrator</strong> and search for the bot you created through BotFather by its <code>@username</code>.</li>
                    <li>
                      Grant the bot the administrative permissions required for J-Drive:
                      <ul style={{ listStyleType: "circle", paddingLeft: "22px", marginTop: "6px" }}>
                        <li><strong>Post Messages</strong> — Required to upload files and media documents.</li>
                        <li><strong>Delete Messages</strong> — Required when you choose to delete a file or folder from J-Drive.</li>
                      </ul>
                    </li>
                    <li>Confirm and save the administrator permissions.</li>
                  </ol>

                  <div
                    style={{
                      background: "var(--canvas-light-alt)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 18px",
                      fontSize: "13.5px",
                      color: "var(--text-dark-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    <strong style={{ color: "var(--text-dark)" }}>Minimal required permissions:</strong> Telegram only requires the bot to be able to post documents and delete messages. You do not need to enable permissions such as changing channel info, adding new admins, or managing voice chats.
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ----------------------------------------------------------------------
                STEP 4 — GET YOUR CHANNEL ID
                ---------------------------------------------------------------------- */}
            <Reveal y={32} duration={0.65}>
              <section className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid var(--border-light)",
                      background: "var(--canvas-light-alt)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                      flexShrink: 0,
                    }}
                  >
                    04
                  </div>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-dark)" }}>
                      Get your Channel ID
                    </h2>
                    <p style={{ fontSize: "14px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Locate the unique numerical identifier for your Telegram channel.
                    </p>
                  </div>
                </div>

                <div style={{ paddingLeft: "52px" }}>
                  <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "var(--text-dark)", marginBottom: "18px" }}>
                    J-Drive needs your Telegram Channel ID so the backend knows which channel belongs to you when handling file uploads and downloads.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "20px" }}>
                    {/* Method A: Telegram Web */}
                    <div
                      style={{
                        background: "var(--canvas-light-alt)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-md)",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "6px" }}>
                        Method A: Telegram Web (Recommended)
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text-dark-muted)", lineHeight: 1.55 }}>
                        1. Open <a href="https://web.telegram.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "var(--text-dark)" }}>web.telegram.org</a> in your browser.<br />
                        2. Click on your private storage channel.<br />
                        3. Look at your browser address bar. The URL ends with your channel ID (e.g. <code>https://web.telegram.org/a/#-1001234567890</code>).<br />
                        4. Copy the entire number starting with <code>-100</code>.
                      </p>
                    </div>

                    {/* Method B: Forwarding to Info Bot */}
                    <div
                      style={{
                        background: "var(--canvas-light-alt)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-md)",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "6px" }}>
                        Method B: Forwarding to Info Bot
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text-dark-muted)", lineHeight: 1.55 }}>
                        1. Send any test message in your private channel.<br />
                        2. Forward that message to a helper bot such as <code>@userinfobot</code> or <code>@JsonDumpBot</code>.<br />
                        3. The bot will reply with your forwarded channel metadata, showing the numeric Channel ID starting with <code>-100</code>.
                      </p>
                    </div>
                  </div>

                  {/* Channel ID Example Block */}
                  <div
                    style={{
                      background: "#151517",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 18px",
                      color: "#FFFFFF",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)" }}>
                        Example Channel ID Format
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#F59E0B",
                          background: "rgba(245, 158, 11, 0.12)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-pill)",
                        }}
                      >
                        Example Only
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "monospace",
                        fontSize: "15px",
                        color: "#E5E7EB",
                        gap: "12px",
                      }}
                    >
                      <span>-1001234567890</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("-1001234567890", "channel")}
                        className="btn-secondary-dark"
                        style={{
                          padding: "6px 12px",
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                        title="Copy sample format"
                      >
                        {copiedChannel ? (
                          <>
                            <Check size={13} color="#22C55E" />
                            <span>Copied example</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy format</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginTop: "8px" }}>
                      Notice: Telegram private channels always begin with the <code style={{ color: "#FFFFFF" }}>-100</code> prefix. Ensure you copy the complete value including the minus sign.
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ----------------------------------------------------------------------
                STEP 5 — CONNECT TELEGRAM TO J-DRIVE
                ---------------------------------------------------------------------- */}
            <Reveal y={32} duration={0.65}>
              <section className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid var(--border-light)",
                      background: "var(--canvas-light-alt)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                      flexShrink: 0,
                    }}
                  >
                    05
                  </div>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-dark)" }}>
                      Connect Telegram to J-Drive
                    </h2>
                    <p style={{ fontSize: "14px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Save your Telegram configuration within your J-Drive settings.
                    </p>
                  </div>
                </div>

                <div style={{ paddingLeft: "52px" }}>
                  <ol style={{ fontSize: "14.5px", lineHeight: 1.7, color: "var(--text-dark)", marginBottom: "24px", paddingLeft: "20px" }}>
                    <li>Log in to your J-Drive account.</li>
                    <li>Open <strong>Settings</strong> from the navigation menu.</li>
                    <li>Find the <strong>Telegram Storage / Telegram Configuration</strong> section.</li>
                    <li>Enter your <strong>Telegram Bot API Token</strong>.</li>
                    <li>Enter your <strong>Telegram Channel ID</strong>.</li>
                    <li>Click <strong>Save Telegram Settings</strong>.</li>
                  </ol>

                  {/* Clean UI Representation Mockup */}
                  <div
                    style={{
                      background: "var(--canvas-light)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-lg)",
                      padding: "clamp(20px, 3vw, 28px)",
                      maxWidth: "520px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dark-muted)" }}>
                        Settings Interface Representation
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "var(--text-dark-muted)",
                          background: "var(--canvas-light-alt)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-pill)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        UI Mockup
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div className="input-block">
                        <label className="input-label" htmlFor="mock-bot-token">
                          Telegram Bot API Token
                        </label>
                        <input
                          id="mock-bot-token"
                          type="text"
                          readOnly
                          value="123456789:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          className="text-input-field"
                          style={{
                            background: "var(--canvas-light-alt)",
                            color: "var(--text-dark-muted)",
                            fontFamily: "monospace",
                            fontSize: "13px",
                            cursor: "default",
                          }}
                        />
                      </div>

                      <div className="input-block">
                        <label className="input-label" htmlFor="mock-channel-id">
                          Telegram Channel ID
                        </label>
                        <input
                          id="mock-channel-id"
                          type="text"
                          readOnly
                          value="-1001234567890"
                          className="text-input-field"
                          style={{
                            background: "var(--canvas-light-alt)",
                            color: "var(--text-dark-muted)",
                            fontFamily: "monospace",
                            fontSize: "13px",
                            cursor: "default",
                          }}
                        />
                      </div>

                      <div style={{ paddingTop: "8px" }}>
                        <button
                          type="button"
                          disabled
                          className="btn-primary"
                          style={{ width: "100%", opacity: 0.85, cursor: "default" }}
                        >
                          Save Telegram Settings
                        </button>
                      </div>

                      <p style={{ fontSize: "11.5px", color: "var(--text-dark-quiet)", textAlign: "center", marginTop: "4px" }}>
                        Simulated interface only. Save your actual configuration in your real J-Drive account settings.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ----------------------------------------------------------------------
                STEP 6 — TEST YOUR CONNECTION
                ---------------------------------------------------------------------- */}
            <Reveal y={32} duration={0.65}>
              <section className="editorial-card" style={{ borderRadius: "var(--radius-xl)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid var(--border-light)",
                      background: "var(--canvas-light-alt)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                      flexShrink: 0,
                    }}
                  >
                    06
                  </div>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-dark)" }}>
                      Test your connection
                    </h2>
                    <p style={{ fontSize: "14px", color: "var(--text-dark-muted)", marginTop: "2px" }}>
                      Perform a test upload to confirm that your bot, channel, and J-Drive workspace communicate properly.
                    </p>
                  </div>
                </div>

                <div style={{ paddingLeft: "52px" }}>
                  <ol style={{ fontSize: "14.5px", lineHeight: 1.7, color: "var(--text-dark)", marginBottom: "20px", paddingLeft: "20px" }}>
                    <li>Return to the J-Drive homepage (<Link to="/homepage" style={{ textDecoration: "underline" }}>/homepage</Link>).</li>
                    <li>Create a test folder (such as <em>&ldquo;Initial Test&rdquo;</em>).</li>
                    <li>Upload a small test file (a photo, text note, or PDF).</li>
                    <li>Open your private Telegram channel on your phone or desktop.</li>
                    <li>Confirm that the file was posted into the channel by your bot.</li>
                    <li>Return to J-Drive and verify that the file appears in your folder, ready for preview and download.</li>
                  </ol>

                  <div
                    style={{
                      background: "var(--canvas-light-alt)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      padding: "16px",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <CheckCircle size={20} weight="fill" color="var(--success)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--text-dark)" }}>
                      <strong>How J-Drive maintains file relationships</strong>
                      <p style={{ color: "var(--text-dark-muted)", marginTop: "4px" }}>
                        J-Drive stores the link between your J-Drive workspace and the Telegram file ID. When you request a file preview or download,
                        J-Drive retrieves the binary stream directly through your configured bot, ensuring fast and continuous access.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

          </div>

          {/* ==========================================================================
              SECURITY SECTION
              ========================================================================== */}
          <Reveal y={32} duration={0.65}>
            <section
              style={{
                background: "var(--surface-white)",
                border: "1px solid rgba(220, 38, 38, 0.2)",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(24px, 4vw, 36px)",
                marginBottom: "56px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "18px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(220, 38, 38, 0.08)",
                    color: "var(--danger)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ShieldWarning size={22} weight="bold" />
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: "clamp(1.2rem, 2.2vw, 1.45rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--text-dark)",
                      marginBottom: "4px",
                    }}
                  >
                    Keep your Telegram credentials private
                  </h2>
                  <p style={{ fontSize: "14px", color: "var(--text-dark-muted)" }}>
                    Best practices to protect your storage tokens and channel contents.
                  </p>
                </div>
              </div>

              <div style={{ paddingLeft: "54px" }}>
                <ul
                  style={{
                    fontSize: "14.5px",
                    lineHeight: 1.7,
                    color: "var(--text-dark)",
                    marginBottom: "20px",
                    paddingLeft: "18px",
                  }}
                >
                  <li><strong>Never share your Telegram Bot API token.</strong> Anyone with your token can manage the bot.</li>
                  <li><strong>Do not publish it on GitHub</strong>, public repositories, or client-side web pages.</li>
                  <li><strong>Do not include credentials in screenshots</strong>, screen shares, or community posts.</li>
                  <li><strong>Only connect a Telegram channel that you control.</strong> Never use a shared or public channel.</li>
                  <li><strong>Treat your Bot API token with the same confidentiality as a root password.</strong></li>
                </ul>

                <div
                  style={{
                    background: "var(--canvas-light-alt)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    padding: "14px 18px",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "var(--text-dark-muted)",
                  }}
                >
                  <strong style={{ color: "var(--text-dark)" }}>Platform Architecture Transparency:</strong> J-Drive operates on a self-custody model. J-Drive stores your configuration securely to orchestrate uploads between your browser and Telegram. However, you maintain ultimate custody over your Telegram account and channel. J-Drive does not claim to guarantee that third parties cannot access your Telegram data if your Telegram account or bot tokens are compromised. Furthermore, Telegram storage policies and file upload limits (such as standard bot file size caps) are governed by Telegram&apos;s platform terms and are not guaranteed to be unlimited.
                </div>
              </div>
            </section>
          </Reveal>

          {/* ==========================================================================
              TROUBLESHOOTING SECTION
              ========================================================================== */}
          <Reveal y={32} duration={0.65}>
            <section style={{ marginBottom: "64px" }}>
              <div style={{ marginBottom: "24px" }}>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 1.85rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    color: "var(--text-dark)",
                    marginBottom: "6px",
                  }}
                >
                  Troubleshooting
                </h2>
                <p style={{ fontSize: "14.5px", color: "var(--text-dark-muted)" }}>
                  Solutions for common configuration and upload questions.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                {/* Issue 1: File upload failed */}
                <div
                  className="editorial-card"
                  style={{
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <WarningCircle size={20} weight="bold" color="var(--danger)" />
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-dark)" }}>
                      &ldquo;File upload failed&rdquo;
                    </h3>
                  </div>

                  <p style={{ fontSize: "13.5px", color: "var(--text-dark-muted)", marginBottom: "12px", lineHeight: 1.55 }}>
                    If a file fails to upload through J-Drive, check these common reasons:
                  </p>

                  <ul style={{ fontSize: "13.5px", color: "var(--text-dark)", lineHeight: 1.65, paddingLeft: "20px" }}>
                    <li><strong>Bot is not in the channel:</strong> Ensure your bot was added as an administrator inside the private channel.</li>
                    <li><strong>Missing permissions:</strong> Confirm the bot has permission to post messages and documents.</li>
                    <li><strong>Incorrect Channel ID:</strong> Verify the Channel ID includes the <code style={{ fontSize: "12.5px" }}>-100</code> prefix.</li>
                    <li><strong>Incorrect Bot Token:</strong> Check for accidental spaces at the start or end of the token string.</li>
                    <li><strong>Telegram API rate limit:</strong> Temporary Telegram connection hiccups can occasionally delay requests. Try again after a moment.</li>
                  </ul>
                </div>

                {/* Issue 2: Files not appearing */}
                <div
                  className="editorial-card"
                  style={{
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <WarningCircle size={20} weight="bold" color="#D97706" />
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-dark)" }}>
                      &ldquo;Files are not appearing in my channel&rdquo;
                    </h3>
                  </div>

                  <p style={{ fontSize: "13.5px", color: "var(--text-dark-muted)", marginBottom: "12px", lineHeight: 1.55 }}>
                    If files show in J-Drive but do not show in your Telegram app, verify:
                  </p>

                  <ul style={{ fontSize: "13.5px", color: "var(--text-dark)", lineHeight: 1.65, paddingLeft: "20px" }}>
                    <li><strong>Channel ID accuracy:</strong> Verify that the Channel ID in Settings matches the specific channel you are checking.</li>
                    <li><strong>Bot administrator status:</strong> Verify that your bot has not been removed or muted in channel permissions.</li>
                    <li><strong>Saved settings:</strong> Ensure your Telegram configuration was saved successfully in your J-Drive settings.</li>
                    <li><strong>Account association:</strong> Confirm you are logged into the same J-Drive account where the configuration was entered.</li>
                  </ul>
                </div>
              </div>
            </section>
          </Reveal>

          {/* ==========================================================================
              FINAL CTA SECTION
              ========================================================================== */}
          <Reveal y={32} duration={0.65}>
            <section
              style={{
                background: "#0D0D0E",
                color: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(40px, 6vw, 64px) clamp(24px, 5vw, 48px)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid var(--border-dark)",
                marginBottom: "40px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  marginBottom: "14px",
                  color: "#FFFFFF",
                }}
              >
                Ready to use J-Drive?
              </h2>
              <p
                style={{
                  fontSize: "clamp(14.5px, 1.6vw, 16px)",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.75)",
                  maxWidth: "50ch",
                  marginBottom: "28px",
                }}
              >
                Head to your workspaces to organize files, or open settings to configure your Telegram storage credentials.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                }}
              >
                <Link to="/homepage">
                  <MagneticButton
                    className="btn-white"
                    style={{ padding: "12px 28px", fontSize: "14.5px" }}
                  >
                    <span>Go to J-Drive</span>
                    <ArrowRight size={15} weight="bold" />
                  </MagneticButton>
                </Link>

                <Link
                  to="/setting"
                  className="btn-secondary-dark"
                  style={{ padding: "12px 24px", fontSize: "14.5px" }}
                >
                  <SlidersHorizontal size={16} />
                  <span>Open Settings</span>
                </Link>
              </div>

              <div style={{ marginTop: "24px", fontSize: "12.5px", color: "rgba(255, 255, 255, 0.45)" }}>
                This guide is permanently accessible without an active login.
              </div>
            </section>
          </Reveal>

        </article>
      </main>

      {/* Editorial Footer matching J-Drive system */}
      <footer
        style={{
          backgroundColor: "#0D0D0E",
          color: "var(--text-light-muted)",
          padding: "44px clamp(20px, 5vw, 40px)",
          borderTop: "1px solid var(--border-dark)",
          fontSize: "13.5px",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#FFFFFF" }}>
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "6px",
                background: "#FFFFFF",
                color: "#0D0D0E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HardDrives weight="bold" size={14} />
            </div>
            <span style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>J-Drive</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            <Link to="/" style={{ color: "var(--text-light-muted)", transition: "color 0.2s ease" }}>
              Home
            </Link>
            <Link to="/guide" style={{ color: "#FFFFFF", fontWeight: 500 }}>
              Storage Guide
            </Link>
            <Link to="/setting" style={{ color: "var(--text-light-muted)", transition: "color 0.2s ease" }}>
              Settings
            </Link>
            <Link to="/login" style={{ color: "var(--text-light-muted)", transition: "color 0.2s ease" }}>
              Sign In
            </Link>
          </div>

          <div>
            <span>Your files, organized. Individual storage sovereignty.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
