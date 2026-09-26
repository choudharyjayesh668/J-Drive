import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";

export default function Folder(){
    const navigate = useNavigate();
    const [folderInfo,setFolderInfo] = useState();
    const [selectedFiles,setSelectedFiles] = useState([]);
    const [viewFile, setViewFile] = useState(null);
    const [files,setFiles] = useState([])
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
    const handleHomepage = () => {
        navigate(`/homepage`)
    }
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
    const formData = new FormData();
    selectedFiles.forEach((file) => {
        formData.append("files", file);
    });
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploadFile/${id}`,
        formData,
        {
            withCredentials: true,
        }
        );
        fetchFiles();
        showPopup(response.data.message, "success");
    } catch (error) {
        console.error("Upload failed:", error);
        showPopup(
        error.response?.data?.message || "Upload failed",
        "error"
        );
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
            {popup.show && (
            <div className={`popup ${popup.type}`}>
                {popup.message}
            </div>
            )}
            <h1>Folder</h1>
            <button onClick={handleHomepage}>Homepage</button>
            { folderInfo && (
                <div>
                    <h1>{folderInfo}</h1>
                </div>
                )
            }
            <form onSubmit={handleUpload}>
                <input
                type="file"
                multiple
                onChange={(e) => setSelectedFiles([...e.target.files])}
                />
                {selectedFiles.length > 0 && (
                <div>
                    <h3>Selected Files</h3>

                    {selectedFiles.map((file, index) => (
                    <div key={index}>
                        <span>{file.name}</span>
                        <span> — {(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    ))}
                </div>
                )}
                <button type="submit">Upload</button>
            </form>
            {files.length === 0 ? (
                <p>No files in this folder yet.</p>
                ) : (
                    files.map((file)=>(
                        <div key = {file._id}>
                            <h2>{file.fileName}</h2>
                            <button onClick={()=>handleDelete(file._id)}>Delete -</button>
                            <button type="button"className="file-action-btn file-btn-download"onClick={() => handleDownload(file)}>Download</button>
                            <div onClick={() => setViewFile(file)}>  {file.fileName} </div>
                        </div>
                    ))
                )
            }
            {viewFile && (
            <div className="modal-overlay">
                <div className="modal">
                <button onClick={() => setViewFile(null)}>
                    ✕
                </button>

                <h3>{viewFile.fileName}</h3>

                <iframe
                    src={`${import.meta.env.VITE_API_URL}/files/${viewFile._id}/view`}
                    width="100%"
                    height="500px"
                />
                </div>
            </div>
            )}
        </>
    )
}