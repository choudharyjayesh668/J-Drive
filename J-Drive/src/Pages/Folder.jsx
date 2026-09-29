import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import {
  ArrowLeft,
  UploadSimple,
  Files,
  File,
  FileText,
  FilePdf,
  FileImage,
  FileVideo,
  FileAudio,
  FileZip,
  DownloadSimple,
  Trash,
  X,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";

export default function Folder() {
  const [folderInfo, setFolderInfo] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewFile, setViewFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [deleteFile, setDeleteFile] = useState(null);
  const { id } = useParams();
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3200);
  };

  const fetchFolderInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/folder/${id}`,
        { withCredentials: true }
      );
      setFolderInfo(response.data.folder.folderName);
    } catch (error) {
      console.error("Failed to load folder info:", error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/folder/${id}/files`,
        { withCredentials: true }
      );
      setFiles(response.data.data || []);
    } catch (error) {
      console.error("Fetch files error:", error);
      showPopup(
        error.response?.data?.message || "Failed to fetch files",
        "error"
      );
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      showPopup("Please select at least one file", "error");
      return;
    }

    setIsUploading(true);
    const initialProgress = {};
    selectedFiles.forEach((file) => {
      initialProgress[file.name] = 0;
    });
    setUploadProgress(initialProgress);

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("files", file);
        await axios.post(
          `${import.meta.env.VITE_API_URL}/uploadFile/${id}`,
          formData,
          {
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress((previous) => ({
                  ...previous,
                  [file.name]: percent,
                }));
              }
            },
          }
        );
      }
      await fetchFiles();
      showPopup("Files uploaded successfully", "success");
      setSelectedFiles([]);
      setUploadProgress({});
    } catch (error) {
      console.error("Upload failed:", error);
      showPopup(
        error.response?.data?.message || "Upload failed",
        "error"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/file/${fileId}`,
        { withCredentials: true }
      );
      fetchFiles();
      showPopup(response.data.message || "File deleted", "success");
    } catch (error) {
      console.error("Delete file error:", error);
      showPopup(
        error.response?.data?.message || "Failed to delete file",
        "error"
      );
    }
  };

  const handleDownload = async (file) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/files/${file._id}/download`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      showPopup("File downloaded successfully", "success");
    } catch (error) {
      console.error("Download file error:", error);
      showPopup(
        error.response?.data?.message || "Failed to download file",
        "error"
      );
    }
  };

  const getFileIcon = (mimeType) => {
    if (!mimeType) return <File size={20} color="var(--text-dark-muted)" weight="fill" />;
    if (mimeType.startsWith("image/")) return <FileImage size={20} color="#0066FF" weight="fill" />;
    if (mimeType.startsWith("video/")) return <FileVideo size={20} color="#8B5CF6" weight="fill" />;
    if (mimeType.startsWith("audio/")) return <FileAudio size={20} color="#EC4899" weight="fill" />;
    if (mimeType.includes("pdf")) return <FilePdf size={20} color="#DC2626" weight="fill" />;
    if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("tar"))
      return <FileZip size={20} color="#F59E0B" weight="fill" />;
    if (mimeType.includes("text") || mimeType.includes("json") || mimeType.includes("xml"))
      return <FileText size={20} color="#16A34A" weight="fill" />;
    return <File size={20} color="var(--text-dark-muted)" weight="fill" />;
  };

  useEffect(() => {
    fetchFolderInfo();
    fetchFiles();
  }, [id]);

  return (
    <div style={{ background: "var(--canvas-light)", minHeight: "100dvh", color: "var(--text-dark)" }}>
      {/* Light Navbar */}
      <Navbar forceTheme="light" />

      <main className="app-page-wrapper">
        <div className="app-content-container">
          {/* Breadcrumb & Folder Header */}
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
                transition: "color 0.2s ease",
              }}
            >
              <ArrowLeft size={15} /> Back to Workspaces
            </Link>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    marginBottom: "6px",
                  }}
                >
                  {folderInfo || "Loading folder..."}
                </h1>
                <p style={{ fontSize: "14.5px", color: "var(--text-dark-muted)" }}>
                  Upload and view files in this workspace folder.
                </p>
              </div>

              {files.length > 0 && (
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text-dark-muted)",
                    padding: "6px 14px",
                    background: "var(--surface-white)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-pill)",
                  }}
                >
                  {files.length} {files.length === 1 ? "file" : "files"}
                </div>
              )}
            </div>
          </div>

          {/*  UPLOAD SECTION */}
          <div
            style={{
              background: "var(--surface-white)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(24px, 4vw, 32px)",
              marginBottom: "40px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "6px" }}>
              Upload files
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-dark-muted)", marginBottom: "20px" }}>
              Documents, high-resolution photography, and media are ingested at raw original fidelity.
            </p>

            <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Dropzone / File input */}
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "36px 20px",
                  border: "2px dashed var(--border-light-hover)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--canvas-light-alt)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--surface-white)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-dark)",
                    boxShadow: "var(--shadow-subtle)",
                  }}
                >
                  <UploadSimple size={22} weight="bold" />
                </div>
                <div>
                  <span style={{ fontSize: "14.5px", fontWeight: 500, color: "var(--text-dark)" }}>
                    Choose files or drag them here
                  </span>
                  <p style={{ fontSize: "12.5px", color: "var(--text-dark-muted)", marginTop: "4px" }}>
                    Select single or multiple files from your computer
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setSelectedFiles([...e.target.files])}
                  style={{ display: "none" }}
                />
              </label>

              {/* Selected Files preview before upload */}
              {selectedFiles.length > 0 && !isUploading && (
                <div
                  style={{
                    background: "var(--canvas-light-alt)",
                    borderRadius: "var(--radius-md)",
                    padding: "16px",
                  }}
                >
                  <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px", color: "var(--text-dark)" }}>
                    Selected files ({selectedFiles.length})
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "13px",
                          color: "var(--text-dark-muted)",
                          padding: "6px 0",
                          borderBottom: index < selectedFiles.length - 1 ? "1px solid var(--border-light)" : "none",
                        }}
                      >
                        <span style={{ fontWeight: 500, color: "var(--text-dark)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>
                          {file.name}
                        </span>
                        <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Progress Indicator */}
              {isUploading && (
                <div
                  style={{
                    background: "var(--canvas-light-alt)",
                    borderRadius: "var(--radius-md)",
                    padding: "16px",
                  }}
                >
                  <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>
                    Uploading {selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {selectedFiles.map((file, index) => {
                      const progress = uploadProgress[file.name] || 0;
                      return (
                        <div key={index}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "4px" }}>
                            <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "75%" }}>
                              {file.name}
                            </span>
                            <span style={{ color: "var(--text-dark-muted)" }}>
                              {progress === 100 ? "Complete" : `${progress}%`}
                            </span>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "6px",
                              background: "rgba(0,0,0,0.08)",
                              borderRadius: "var(--radius-pill)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${progress}%`,
                                height: "100%",
                                background: "var(--accent-primary)",
                                transition: "width 0.2s ease",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isUploading || selectedFiles.length === 0}
                  className="btn-primary"
                  style={{ height: "44px", padding: "0 24px" }}
                >
                  <UploadSimple size={16} weight="bold" />
                  <span>{isUploading ? "Uploading..." : "Start Upload"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* FILES SECTION */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Stored files
              </h2>
            </div>

            {files.length === 0 ? (
              /* Empty files state */
              <div
                style={{
                  padding: "60px 24px",
                  textAlign: "center",
                  background: "var(--surface-white)",
                  border: "1px dashed var(--border-light-hover)",
                  borderRadius: "var(--radius-xl)",
                  maxWidth: "540px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--canvas-light-alt)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    color: "var(--text-dark-muted)",
                  }}
                >
                  <Files size={24} />
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "6px" }}>
                  This workspace is empty
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-dark-muted)", lineHeight: 1.5 }}>
                  Use the upload section above to add files to this workspace.
                </p>
              </div>
            ) : (
              /* File list */
              <div
                style={{
                  background: "var(--surface-white)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {files.map((file, index) => (
                  <div
                    key={file._id}
                    onClick={() => setViewFile(file)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      padding: "16px 20px",
                      borderBottom: index < files.length - 1 ? "1px solid var(--border-light)" : "none",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--canvas-light)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "var(--radius-sm)",
                          background: "var(--canvas-light-alt)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {getFileIcon(file.mimeType)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "14.5px",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "var(--text-dark)",
                          }}
                          title={file.fileName}
                        >
                          {file.fileName}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--text-dark-quiet)", marginTop: "2px" }}>
                          Click to preview
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDownload(file)}
                        className="btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "12.5px" }}
                        title="Download file"
                      >
                        <DownloadSimple size={14} />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => setDeleteFile(file)}
                        className="btn-secondary"
                        style={{
                          padding: "6px 12px",
                          fontSize: "12.5px",
                          color: "var(--danger)",
                          borderColor: "rgba(220, 38, 38, 0.2)",
                        }}
                        title="Delete file"
                      >
                        <Trash size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FILE PREVIEW MODAL  */}
      {viewFile && (
        <div className="modal-backdrop-overlay" onClick={() => setViewFile(null)}>
          <div
            className={`preview-modal-window ${viewFile.mimeType?.startsWith("image/") ? "image-view" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                {getFileIcon(viewFile.mimeType)}
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={viewFile.fileName}
                >
                  {viewFile.fileName}
                </h3>
              </div>
              <button
                onClick={() => setViewFile(null)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-dark-muted)",
                }}
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* In-Browser Preview */}
            {viewFile.mimeType?.startsWith("image/") ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/files/${viewFile._id}/view`}
                alt={viewFile.fileName}
                className="preview-image-content"
              />
            ) : viewFile.mimeType?.startsWith("video/") ? (
              <video
                src={`${import.meta.env.VITE_API_URL}/files/${viewFile._id}/view`}
                controls
                preload="metadata"
                className="preview-video-element"
              />
            ) : (
              <iframe
                src={`${import.meta.env.VITE_API_URL}/files/${viewFile._id}/view`}
                title={viewFile.fileName}
                className="preview-document-frame"
              />
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
              <button
                className="btn-secondary"
                onClick={() => handleDownload(viewFile)}
              >
                <DownloadSimple size={14} /> Download
              </button>
              <button
                className="btn-primary"
                onClick={() => setViewFile(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE FILE CONFIRMATION MODAL  */}
      {deleteFile && (
        <div className="modal-backdrop-overlay" onClick={() => setDeleteFile(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--danger)", letterSpacing: "-0.02em" }}>
                Delete file?
              </h3>
              <button onClick={() => setDeleteFile(null)} style={{ color: "var(--text-dark-muted)" }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.5, marginBottom: "12px" }}>
              Are you sure you want to delete <strong>{deleteFile.fileName}</strong>?
            </p>
            <p style={{ fontSize: "13px", color: "var(--text-dark-muted)", marginBottom: "24px" }}>
              This will permanently remove the file from your workspace. This action cannot be reversed.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDeleteFile(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={async () => {
                  await handleDelete(deleteFile._id);
                  setDeleteFile(null);
                }}
              >
                <Trash size={14} />
                <span>Delete file</span>
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