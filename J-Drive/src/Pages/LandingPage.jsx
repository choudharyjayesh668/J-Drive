import { Link } from "react-router-dom";
import {
  HardDrives,
  ArrowRight,
  ShieldCheck,
  Folders,
  FilePdf,
  FileImage,
  FileVideo,
  FileText,
  LockKey,
  CheckCircle,
} from "@phosphor-icons/react";
import Navbar from "../Component/Navbar";
import Reveal from "../Component/Reveal";
import MagneticButton from "../Component/MagneticButton";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--canvas-dark)", color: "var(--text-light)", minHeight: "100dvh" }}>
      {/* Dynamic Navbar */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section
        style={{
          position: "relative",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "clamp(80px, 12vh, 120px) clamp(24px, 5vw, 64px)",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Full-bleed atmospheric cinematic background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: "url('/images/hero-cinematic.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.78) contrast(1.05)",
          }}
        />

        {/* Cinematic gradient overlay for typography readability and smooth section transition */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(13,13,14,0.3) 0%, rgba(13,13,14,0.35) 50%, rgba(13,13,14,0.8) 85%, #0D0D0E 100%)",
          }}
        />

        {/* Hero Content Stack (Centered in middle of viewport) */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "860px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Reveal y={40} duration={0.8}>
            <h1
              style={{
                fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                color: "#FFFFFF",
                maxWidth: "20ch",
                margin: "0 auto 20px auto",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Your files, organized.
            </h1>
          </Reveal>

          <Reveal y={30} delay={0.15} duration={0.8}>
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.55,
                maxWidth: "48ch",
                margin: "0 auto 32px auto",
                fontWeight: 400,
                textShadow: "0 1px 12px rgba(0,0,0,0.5)",
              }}
            >
              J-Drive gives you one simple place to upload, organize, preview, and manage your files.
            </p>
          </Reveal>

          <Reveal y={24} delay={0.25} duration={0.8}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <Link to="/signup">
                <MagneticButton className="btn-white" style={{ padding: "14px 28px", fontSize: "15px" }}>
                  <span>Get Started Free</span>
                  <ArrowRight weight="bold" size={15} />
                </MagneticButton>
              </Link>

              <Link to="/login" className="btn-secondary-dark" style={{ padding: "14px 24px", fontSize: "15px" }}>
                Sign In
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. STATEMENT / TRANSITION (Design.md Section 20) */}
      <section
        style={{
          background: "linear-gradient(to bottom, #0D0D0E 0%, #171719 50%, #FBFBFA 100%)",
          padding: "clamp(80px, 12vw, 160px) clamp(20px, 5vw, 40px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "860px", width: "100%", margin: "0 auto" }}>
          <Reveal y={36}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              Everything you need to keep your files organized.
            </h2>
          </Reveal>

          <Reveal y={30} delay={0.1}>
            <p
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.7)",
                maxWidth: "58ch",
                margin: "0 auto",
              }}
            >
              Upload your files, keep them in folders, preview them when you need them, and manage everything from one place.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. PROCESS / WORKFLOW */}
      <section
        id="workflow"
        style={{
          backgroundColor: "#0D0D0E",
          color: "#FFFFFF",
          padding: "clamp(80px, 10vw, 140px) clamp(20px, 5vw, 40px)",
          borderTop: "1px solid var(--border-dark)",
          borderBottom: "1px solid var(--border-dark)",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "start",
          }}
        >
          {/* Left: Editorial Section Heading */}
          <div>
            <Reveal y={30}>
              <h2
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                }}
              >
                Everything in one place.
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--text-light-muted)",
                  maxWidth: "38ch",
                }}
              >
                J-Drive keeps your files and folders organized in a simple workspace that's easy to navigate.
              </p>
            </Reveal>
          </div>

          {/* Right: Numbered Process Sequence with Subtle Connector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px", position: "relative" }}>
            {/* Step 01 */}
            <Reveal y={36} delay={0.1}>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    flexShrink: 0,
                    background: "rgba(255, 255, 255, 0.04)",
                  }}
                >
                  01
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.02em" }}>
                    Simple File Uploads
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--text-light-muted)" }}>
                    Upload one or multiple files and keep track of their progress as they are added to your workspace.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Step 02 */}
            <Reveal y={36} delay={0.2}>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    flexShrink: 0,
                    background: "rgba(255, 255, 255, 0.04)",
                  }}
                >
                  02
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.02em" }}>
                    Preview Files in Your Browser
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--text-light-muted)" }}>
                    Open supported images, videos, PDFs, and other files without downloading them first.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Step 03 */}
            <Reveal y={36} delay={0.3}>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    flexShrink: 0,
                    background: "rgba(255, 255, 255, 0.04)",
                  }}
                >
                  03
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.02em" }}>
                    Folders That Stay Organized
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--text-light-muted)" }}>
                    Create folders, rename them, open them, and keep related files together.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. EDITORIAL ARCHIVE / CAPABILITIES (Design.md Section 15, 18, 22) */}
      <section
        id="capabilities"
        style={{
          backgroundColor: "#FBFBFA",
          color: "var(--text-dark)",
          padding: "clamp(80px, 10vw, 140px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}>
            <Reveal y={30}>
              <h2
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "16px",
                  color: "var(--text-dark)",
                }}
              >
                Keep every kind of file together.
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--text-dark-muted)",
                  maxWidth: "50ch",
                }}
              >
                Documents, images, videos, PDFs, and project files can all live in the same organized workspace.
              </p>
            </Reveal>
          </div>

          {/* Asymmetric Editorial Visual Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "24px",
            }}
          >
            {/* Visual Item 1: Large Archival Still Life */}
            <div style={{ gridColumn: "span 12" }} className="lg:!col-span-7">
              <Reveal y={36}>
                <div
                  className="img-zoom-container"
                  style={{
                    borderRadius: "var(--radius-xl)",
                    height: "420px",
                    border: "1px solid var(--border-light)",
                    boxShadow: "var(--shadow-card)",
                    position: "relative",
                  }}
                >
                  <img
                    src="/images/archive-visual.jpg"
                    alt="Organized folders and files"
                    className="img-zoom-item"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(13,13,14,0.7) 0%, transparent 60%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "28px",
                      color: "#FFFFFF",
                    }}
                  >
                    <h3 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                      Keep Your Original Files
                    </h3>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                      Upload your files as they are and keep them organized without changing the way you work with them.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Visual Item 2: Supported Formats Card */}
            <div style={{ gridColumn: "span 12" }} className="lg:!col-span-5">
              <Reveal y={36} delay={0.1}>
                <div
                  style={{
                    height: "420px",
                    background: "var(--surface-white)",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--border-light)",
                    boxShadow: "var(--shadow-card)",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--canvas-light-alt)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--text-dark)",
                        marginBottom: "24px",
                      }}
                    >
                      <Folders size={24} weight="fill" />
                    </div>
                    <h3 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "10px" }}>
                      Different Files, One Workspace
                    </h3>
                    <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--text-dark-muted)" }}>
                      Keep documents, images, videos, PDFs, and other supported files together in one place.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderRadius: "var(--radius-md)", background: "var(--canvas-light-alt)" }}>
                      <FilePdf size={20} color="#DC2626" weight="fill" />
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>PDF Docs</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderRadius: "var(--radius-md)", background: "var(--canvas-light-alt)" }}>
                      <FileImage size={20} color="#0066FF" weight="fill" />
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>Images</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderRadius: "var(--radius-md)", background: "var(--canvas-light-alt)" }}>
                      <FileVideo size={20} color="#8B5CF6" weight="fill" />
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>Media</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderRadius: "var(--radius-md)", background: "var(--canvas-light-alt)" }}>
                      <FileText size={20} color="#16A34A" weight="fill" />
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>Text & Code</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Visual Item 3: Full Width Gallery Architecture */}
            <div style={{ gridColumn: "span 12" }}>
              <Reveal y={36} delay={0.2}>
                <div
                  className="img-zoom-container"
                  style={{
                    borderRadius: "var(--radius-xl)",
                    height: "360px",
                    border: "1px solid var(--border-light)",
                    boxShadow: "var(--shadow-card)",
                    position: "relative",
                  }}
                >
                  <img
                    src="/images/gallery-light.jpg"
                    alt="Previewing files directly in workspace"
                    className="img-zoom-item"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(13,13,14,0.7) 0%, transparent 60%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "32px",
                      color: "#FFFFFF",
                    }}
                  >
                    <h3 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "6px" }}>
                      Preview Without Downloading
                    </h3>
                    <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.75)", maxWidth: "56ch" }}>
                      Open supported files directly in J-Drive and quickly check what you uploaded.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECURITY & RELIABILITY  */}
      <section
        id="security"
        style={{
          backgroundColor: "#0D0D0E",
          color: "#FFFFFF",
          padding: "clamp(80px, 10vw, 130px) clamp(20px, 5vw, 40px)",
          borderTop: "1px solid var(--border-dark)",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <Reveal y={30}>
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px auto" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: "16px",
                }}
              >
                Built with security in mind.
              </h2>
              <p style={{ fontSize: "15.5px", lineHeight: 1.6, color: "var(--text-light-muted)" }}>
                J-Drive uses authentication and server-side access checks to keep each user's files separated.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            <Reveal y={36} delay={0.1}>
              <div
                style={{
                  background: "var(--canvas-dark-elevated)",
                  border: "1px solid var(--border-dark)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  <LockKey size={22} weight="bold" />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "10px", letterSpacing: "-0.02em" }}>
                  HTTP-Only JWT Authentication
                </h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--text-light-muted)" }}>
                  Authentication tokens are stored in HTTP-only cookies to reduce exposure to client-side scripts.
                </p>
              </div>
            </Reveal>

            <Reveal y={36} delay={0.2}>
              <div
                style={{
                  background: "var(--canvas-dark-elevated)",
                  border: "1px solid var(--border-dark)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  <ShieldCheck size={22} weight="bold" />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "10px", letterSpacing: "-0.02em" }}>
                  User-Level Access Control
                </h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--text-light-muted)" }}>
                  File and folder requests are checked against the authenticated user before data is returned or modified.
                </p>
              </div>
            </Reveal>

            <Reveal y={36} delay={0.3}>
              <div
                style={{
                  background: "var(--canvas-dark-elevated)",
                  border: "1px solid var(--border-dark)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  <CheckCircle size={22} weight="bold" />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "10px", letterSpacing: "-0.02em" }}>
                  Direct Binary Streaming
                </h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--text-light-muted)" }}>
                  Supported files are streamed directly when previewing or downloading them.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/*  6. FINAL PHOTOGRAPHIC CTA */}
      <section
        style={{
          backgroundColor: "#0D0D0E",
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <Reveal y={36}>
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 64px)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "420px",
                border: "1px solid var(--border-dark)",
              }}
            >
              {/* Cinematic Background Image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "url('/images/cta-cinematic.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.55)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, rgba(13,13,14,0.4) 0%, rgba(13,13,14,0.85) 100%)",
                }}
              />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
                <h2
                  style={{
                    fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: "#FFFFFF",
                    marginBottom: "18px",
                  }}
                >
                  Start organizing your files.
                </h2>
                <p
                  style={{
                    fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                    lineHeight: 1.6,
                    color: "rgba(255, 255, 255, 0.75)",
                    marginBottom: "32px",
                  }}
                >
                  Create your J-Drive account and keep your files organized in one place.
                </p>
                <div>
                  <Link to="/signup">
                    <MagneticButton className="btn-white" style={{ padding: "14px 32px", fontSize: "15px" }}>
                      <span>Create Free Account</span>
                      <ArrowRight weight="bold" size={15} />
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer
        style={{
          backgroundColor: "#0D0D0E",
          color: "var(--text-light-muted)",
          padding: "48px clamp(20px, 5vw, 40px)",
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

          <div style={{ display: "flex", gap: "24px" }}>
            <a href="#workflow" style={{ color: "var(--text-light-muted)", transition: "color 0.2s ease" }}>
              Workflow
            </a>
            <a href="#capabilities" style={{ color: "var(--text-light-muted)", transition: "color 0.2s ease" }}>
              Capabilities
            </a>
            <a href="#security" style={{ color: "var(--text-light-muted)", transition: "color 0.2s ease" }}>
              Security
            </a>
            <Link to="/guide" style={{ color: "var(--text-light-muted)", transition: "color 0.2s ease" }}>
              Storage Guide
            </Link>
            <Link to="/login" style={{ color: "var(--text-light-muted)", transition: "color 0.2s ease" }}>
              Sign In
            </Link>
          </div>

          <div>
            <span>Simple file management, built for everyday use.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
