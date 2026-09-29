import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import {
  Folder,
  Folders,
  FolderPlus,
  PencilSimple,
  Trash,
  CheckCircle,
  WarningCircle,
  SquaresFour,
  ListBullets,
  X,
} from "@phosphor-icons/react";
import MagneticButton from "../Component/MagneticButton";

export default function HomePage() {
  const navigate = useNavigate();
  const [createFolder, setCreateFolder] = useState({ name: "" });
  const [allfolder, setAllFolder] = useState([]);
  const [folderNewName, setFolderNewName] = useState("");
  const [showRename, setShowRename] = useState(false);
  const [renameId, setRenameId] = useState(null);
  const [deleteFolder, setDeleteFolder] = useState(null);
  const [loadingFolders, setLoadingFolders] = useState(true);
  const [creating, setCreating] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem("jdrive_view_mode") || "grid";
    } catch {
      return "grid";
    }
  });

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("jdrive_view_mode", mode);
    } catch {
      // ignore localStorage quota or privacy errors
    }
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3200);
  };

  const handleOnChange = (event) => {
    setCreateFolder({ [event.target.name]: event.target.value });
  };

  const fetchFolder = async () => {
    try {
      setLoadingFolders(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/folder`,
        { withCredentials: true }
      );
      setAllFolder(response.data.data || []);
    } catch (error) {
      console.error("Fetch folder error:", error);
    } finally {
      setLoadingFolders(false);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  const handleCreateFolder = async (event) => {
    event.preventDefault();
    if (!createFolder.name.trim()) {
      showPopup("Please enter a folder name", "error");
      return;
    }

    setCreating(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/createFolder`,
        createFolder,
        { withCredentials: true }
      );
      setCreateFolder({ name: "" });
      showPopup(response.data.message || "Folder created", "success");
      fetchFolder();
    } catch (error) {
      console.error("Create folder error:", error);
      showPopup(
        error.response?.data?.message || "Failed to create folder",
        "error"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleOpenFolder = async (id) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/folder/${id}`,
        { withCredentials: true }
      );
      navigate(`/folder/${id}`);
    } catch (error) {
      console.error("Folder open failed:", error);
      showPopup(
        error.response?.data?.message || "Failed to open folder",
        "error"
      );
    }
  };

  const handleRename = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/folder/${id}`,
        { withCredentials: true }
      );
      setFolderNewName(response.data.folder.folderName);
      setRenameId(id);
      setShowRename(true);
    } catch (error) {
      console.error("Load folder error:", error);
      showPopup(
        error.response?.data?.message || "Failed to load folder details",
        "error"
      );
    }
  };

  const handleRenameSubmit = async (event) => {
    event.preventDefault();
    if (!folderNewName.trim()) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/folder/${renameId}`,
        { folderName: folderNewName },
        { withCredentials: true }
      );
      setShowRename(false);
      fetchFolder();
      showPopup(response.data.message || "Folder renamed", "success");
    } catch (error) {
      console.error("Rename folder error:", error);
      showPopup(
        error.response?.data?.message || "Failed to rename folder",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/folder/${id}`,
        { withCredentials: true }
      );
      fetchFolder();
      showPopup(response.data.message || "Folder deleted", "success");
    } catch (error) {
      console.error("Delete folder error:", error);
      showPopup(
        error.response?.data?.message || "Failed to delete folder",
        "error"
      );
    }
  };

  return (
    <div style={{ background: "var(--canvas-light)", minHeight: "100dvh", color: "var(--text-dark)" }}>
      {/* Light Navbar matching refined workspace system */}
      <Navbar forceTheme="light" />

      <main className="app-page-wrapper">
        <div className="app-content-container">
          {/* PAGE HEADER */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              marginBottom: "clamp(32px, 5vw, 48px)",
              paddingBottom: "28px",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    marginBottom: "8px",
                    color: "var(--text-dark)",
                  }}
                >
                  Your files, organized.
                </h1>
                <p style={{ fontSize: "15px", color: "var(--text-dark-muted)", lineHeight: 1.5, maxWidth: "56ch" }}>
                  All your project folders, documents, and media archives managed in one permanent workspace.
                </p>
              </div>

              {allfolder.length > 0 && (
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text-dark-muted)",
                    padding: "6px 14px",
                    background: "var(--surface-white)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-pill)",
                    boxShadow: "var(--shadow-subtle)",
                  }}
                >
                  {allfolder.length} {allfolder.length === 1 ? "workspace active" : "workspaces active"}
                </div>
              )}
            </div>

            {/* TOOLBAR: CREATE FOLDER + VIEW SWITCHER */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              {/* Create Folder Form */}
              <form
                onSubmit={handleCreateFolder}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  flex: "1 1 360px",
                  maxWidth: "520px",
                }}
              >
                <input
                  type="text"
                  name="name"
                  value={createFolder.name}
                  onChange={handleOnChange}
                  placeholder="New workspace or folder name"
                  className="text-input-field"
                  style={{ flex: "1 1 220px", height: "44px" }}
                />
                <MagneticButton
                  type="submit"
                  disabled={creating}
                  className="btn-primary"
                  style={{ height: "44px", padding: "0 20px" }}
                >
                  <FolderPlus size={17} weight="bold" />
                  <span>{creating ? "Creating..." : "Create folder"}</span>
                </MagneticButton>
              </form>

              {/* View Switcher Controls */}
              {allfolder.length > 0 && (
                <div className="view-switcher" role="group" aria-label="Change view mode">
                  <button
                    type="button"
                    onClick={() => handleViewModeChange("grid")}
                    className={`view-switch-btn ${viewMode === "grid" ? "active" : ""}`}
                    title="Grid view"
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <SquaresFour size={18} weight={viewMode === "grid" ? "fill" : "regular"} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleViewModeChange("list")}
                    className={`view-switch-btn ${viewMode === "list" ? "active" : ""}`}
                    title="List view"
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                  >
                    <ListBullets size={18} weight="bold" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FOLDER CONTENT AREA */}
          {loadingFolders ? (
            <div
              style={{
                padding: "80px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                color: "var(--text-dark-muted)",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--accent-primary)",
                  animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: 500 }}>Loading workspaces...</span>
            </div>
          ) : allfolder.length === 0 ? (
            /* EMPTY STATE */
            <div
              style={{
                padding: "clamp(64px, 10vw, 100px) 24px",
                textAlign: "center",
                background: "var(--surface-white)",
                border: "1px dashed var(--border-light-hover)",
                borderRadius: "var(--radius-xl)",
                maxWidth: "600px",
                margin: "32px auto",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--canvas-light-alt)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px auto",
                  color: "var(--text-dark)",
                }}
              >
                <Folders size={28} />
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "8px", color: "var(--text-dark)" }}>
                Your workspace is empty.
              </h2>
              <p style={{ fontSize: "14.5px", color: "var(--text-dark-muted)", maxWidth: "42ch", margin: "0 auto 24px auto", lineHeight: 1.5 }}>
                Create your first archival folder using the toolbar above to begin organizing your files and media.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            /* GRID VIEW (DEFAULT) */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {allfolder.map((folder) => (
                <div
                  key={folder._id}
                  className="folder-card-item"
                  onDoubleClick={() => handleOpenFolder(folder._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    onClick={() => handleOpenFolder(folder._id)}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                  >
                    <div className="folder-icon-box">
                      <Folder size={22} weight="fill" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          letterSpacing: "-0.015em",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginBottom: "4px",
                          color: "var(--text-dark)",
                        }}
                        title={folder.folderName}
                      >
                        {folder.folderName}
                      </h3>
                      <p style={{ fontSize: "12.5px", color: "var(--text-dark-muted)" }}>
                        Double click to open
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "8px",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--border-light)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleRename(folder._id)}
                      className="btn-secondary"
                      style={{ padding: "6px 12px", fontSize: "12.5px" }}
                      title="Rename folder"
                    >
                      <PencilSimple size={13} />
                      <span>Rename</span>
                    </button>
                    <button
                      onClick={() => setDeleteFolder(folder)}
                      className="btn-secondary"
                      style={{
                        padding: "6px 12px",
                        fontSize: "12.5px",
                        color: "var(--danger)",
                        borderColor: "rgba(220, 38, 38, 0.2)",
                      }}
                      title="Delete folder"
                    >
                      <Trash size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="folder-list-table">
              {/* Column Headers */}
              <div className="folder-list-header">
                <span>Name</span>
                <span>Workspace Type</span>
                <span>Interaction</span>
                <span style={{ textAlign: "right" }}>Actions</span>
              </div>

              {/* Rows */}
              <div>
                {allfolder.map((folder) => (
                  <div
                    key={folder._id}
                    className="folder-list-row"
                    onDoubleClick={() => handleOpenFolder(folder._id)}
                  >
                    {/* Name + Icon */}
                    <div
                      onClick={() => handleOpenFolder(folder._id)}
                      style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "var(--radius-sm)",
                          background: "var(--canvas-light-alt)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "var(--text-dark)",
                        }}
                      >
                        <Folder size={18} weight="fill" />
                      </div>
                      <span
                        style={{
                          fontSize: "14.5px",
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                          color: "var(--text-dark)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={folder.folderName}
                      >
                        {folder.folderName}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="row-meta" style={{ fontSize: "13px", color: "var(--text-dark-muted)" }}>
                      Archival Workspace
                    </div>

                    {/* Hint */}
                    <div className="row-hint" style={{ fontSize: "12.5px", color: "var(--text-dark-quiet)" }}>
                      Double click to open
                    </div>

                    {/* Actions */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleRename(folder._id)}
                        className="btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "12.5px" }}
                        title="Rename folder"
                      >
                        <PencilSimple size={13} />
                        <span>Rename</span>
                      </button>
                      <button
                        onClick={() => setDeleteFolder(folder)}
                        className="btn-secondary"
                        style={{
                          padding: "6px 12px",
                          fontSize: "12.5px",
                          color: "var(--danger)",
                          borderColor: "rgba(220, 38, 38, 0.2)",
                        }}
                        title="Delete folder"
                      >
                        <Trash size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* RENAME MODAL */}
      {showRename && (
        <div className="modal-backdrop-overlay" onClick={() => setShowRename(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-dark)" }}>
                Rename folder
              </h3>
              <button onClick={() => setShowRename(false)} style={{ color: "var(--text-dark-muted)" }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: "13.5px", color: "var(--text-dark-muted)", marginBottom: "18px" }}>
              Enter a new name for this workspace folder.
            </p>
            <form onSubmit={handleRenameSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input
                type="text"
                placeholder="Folder name"
                value={folderNewName}
                onChange={(e) => setFolderNewName(e.target.value)}
                className="text-input-field"
                autoFocus
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowRename(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <span>Save changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteFolder && (
        <div className="modal-backdrop-overlay" onClick={() => setDeleteFolder(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--danger)", letterSpacing: "-0.02em" }}>
                Delete workspace?
              </h3>
              <button onClick={() => setDeleteFolder(null)} style={{ color: "var(--text-dark-muted)" }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.5, marginBottom: "12px", color: "var(--text-dark)" }}>
              Are you sure you want to delete <strong>{deleteFolder.folderName}</strong>?
            </p>
            <p style={{ fontSize: "13px", color: "var(--text-dark-muted)", marginBottom: "24px" }}>
              This will permanently delete this folder and all files stored within it. This action cannot be reversed.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDeleteFolder(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={async () => {
                  await handleDelete(deleteFolder._id);
                  setDeleteFolder(null);
                }}
              >
                <Trash size={14} />
                <span>Delete folder</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION TOAST */}
      {popup.show && (
        <div className={`toast-notification ${popup.type === "success" ? "success" : "error"}`}>
          {popup.type === "success" ? (
            <CheckCircle size={18} weight="fill" />
          ) : (
            <WarningCircle size={18} weight="fill" />
          )}
          <span>{popup.message}</span>
        </div>
      )}
    </div>
  );
}