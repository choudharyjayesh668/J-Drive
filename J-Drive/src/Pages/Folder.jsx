import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import Navbar from "../Component/Navbar";
export default function Folder(){
    const navigate = useNavigate();
    const [folderInfo,setFolderInfo] = useState();
    const [selectedFiles,setSelectedFiles] = useState([]);
    const [viewFile, setViewFile] = useState(null);
    const [files,setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [deleteFile, setDeleteFile] = useState(null);
    const { id } = useParams();
    const [popup,setPopup] = useState({
        show:false,
        message:"",
        type:"",
    });
    const showPopup = (message, type) => {
    setPopup({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };
    const fetchFolderInfo = async () => {
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/folder/${id}`,
                {
                    withCredentials : true,
                },
            );
            setFolderInfo(response.data.folder.folderName);
        }catch(error){
            console.log(`Failed to load FolderInfo ${error}`),
            {
                withCredentials: true,
            }
            console.log(response);
            setFiles(response.data);
        };
    };
    const fetchFiles = async () => {
    try {
        const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/folder/${id}/files`,
        {
            withCredentials: true,
        }
        );
        setFiles(response.data.data);
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
                                    (progressEvent.loaded * 100) /
                                    progressEvent.total
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
            showPopup("All files uploaded successfully", "success");
            setSelectedFiles([]);
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
        {
            withCredentials: true,
        }
        );

        fetchFiles();

        showPopup(response.data.message, "success");

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

        const url = window.URL.createObjectURL(
        new Blob([response.data])
        );

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
    useEffect(()=>{
        fetchFolderInfo();
        fetchFiles();
    },[id]);
    return(
            <>
                <Navbar />
                {popup.show && (
                    <div className={`popup ${popup.type}`}>
                        {popup.message}
                    </div>
                )}
                <main className="folderPage">
                    {/* Folder Header */}
                    {folderInfo && (
                        <div className="folderHeader">
                            <div>
                                <p className="folderEyebrow">You are in </p>
                                <h1>{folderInfo} Folder</h1>
                            </div>
                        </div>
                    )}
                    {/* Upload Section */}
                    <section className="uploadSection">
                        <div className="uploadHeader">
                            <div>
                                <h2>Upload files</h2>
                                <p>Add files to this folder</p>
                            </div>
                        </div>
                        <form
                            className="uploadForm"
                            onSubmit={handleUpload}
                        >
                            <label className="fileInput">
                                <span>Choose files</span>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) =>
                                        setSelectedFiles([...e.target.files])
                                    }
                                />
                            </label>
                            {/* Upload Progress */}
                            {isUploading && (
                            <div className="uploadProgress">
                                <div className="uploadProgressHeader">
                                    <h3>Uploading files</h3>
                                    <span>
                                        {selectedFiles.length} files
                                    </span>
                                </div>
                                <div className="uploadFileList">
                        {selectedFiles.map((file, index) => {
                            const progress =
                                uploadProgress[file.name] || 0;
                            return (
                                <div
                                    className="uploadFileItem"
                                    key={index}
                                >
                                    <div className="uploadFileInfo">
                                        <span className="uploadFileName">
                                            {file.name}
                                        </span>
                                        <span className="uploadFileStatus">
                                            {progress === 100
                                                ? "✓ Complete"
                                                : progress === 0
                                                ? "Waiting..."
                                                : `${progress}%`
                                            }
                                        </span>
                                    </div>
                                    <div className="progressBar">
                                        <div
                                            className="progressBarFill"
                                            style={{
                                                width: `${progress}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                    <div className="selectedFiles">
                        <h3>Selected files</h3>
                        {selectedFiles.map((file, index) => (
                            <div
                                className="selectedFile"
                                key={index}
                            >
                                <span>{file.name}</span>
                                <span>
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    className="uploadButton"
                    type="submit"
                    disabled={isUploading}
                >
                    {isUploading
                        ? `Uploading ${uploadProgress}%`
                        : "Upload"}
                </button>
            </form>
        </section>
        {/* Files Section */}
        <section className="filesSection">
            <div className="filesHeader">
                <h2>Files</h2>
                <span>
                    {files.length}{" "}
                    {files.length === 1 ? "file" : "files"}
                </span>
            </div>
            {files.length === 0 ? (
                <div className="emptyFiles">
                    <p>No files in this folder yet.</p>
                </div>
            ) : (
                <div className="fileList">
                    {files.map((file) => (
                        <div
                            className="fileRow"
                            key={file._id}
                            onClick={() => setViewFile(file)}
                        >
                            <div className="fileInfo">
                                <div className="fileIcon">
                                </div>
                                <div>
                                    <h3>{file.fileName}</h3>
                                </div>
                            </div>
                            <div
                                className="fileActions"
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >
                                <button
                                    onClick={() =>
                                        handleDownload(file)
                                    }
                                >
                                    Download
                                </button>
                               <button
                                    className="deleteFile"
                                    onClick={() => setDeleteFile(file)}
                                >
                                    Delete
                                </button>
                                {deleteFile && (
                                    <div
                                        className="deleteModalOverlay"
                                        onClick={() => setDeleteFile(null)}
                                    >
                                        <div
                                            className="deleteModal"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="deleteModalContent">
                                                <h3>Delete file?</h3>
                                                <p>
                                                    Are you sure you want to delete{" "}
                                                    <strong>{deleteFile.fileName}</strong>?
                                                </p>
                                                <span>This action cannot be undone.</span>
                                            </div>
                                            <div className="deleteModalActions">
                                                <button
                                                    type="button"
                                                    className="cancelDelete"
                                                    onClick={() => setDeleteFile(null)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="confirmDelete"
                                                    onClick={async () => {
                                                        await handleDelete(deleteFile._id);
                                                        setDeleteFile(null);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    </main>
    {/* File Preview Modal */}
        {viewFile && (
        <div className="modal-overlay" onClick={() => setViewFile(null)}>
            <div
                className={`modal ${
                    viewFile.mimeType?.startsWith("image/")
                        ? "imageModal"
                        : viewFile.mimeType?.startsWith("video/")
                        ? "videoModal"
                        : "documentModal"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modalClose"
                    onClick={() => setViewFile(null)}
                >
                    ✕
                </button>
                <h3>{viewFile.fileName}</h3>
                {viewFile.mimeType?.startsWith("image/") ? (
                    <div className="imagePreview">
                        <img
                            src={`${import.meta.env.VITE_API_URL}/files/${viewFile._id}/view`}
                            alt={viewFile.fileName}
                        />
                    </div>
                ) : viewFile.mimeType?.startsWith("video/") ? (
                    <div className="videoPreview">
                        <video
                            src={`${import.meta.env.VITE_API_URL}/files/${viewFile._id}/view`}
                            controls
                            preload="metadata"
                        />
                    </div>
                ) : (
                    <iframe
                        className="documentPreview"
                        src={`${import.meta.env.VITE_API_URL}/files/${viewFile._id}/view`}
                        title={viewFile.fileName}
                    />
                )}
            </div>
        </div>
        )}
    </>
    )
}