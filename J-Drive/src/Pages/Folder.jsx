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
    const handleFileChange = (event) => {
        setSelectedFile(event.target.file[0]);
    }
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
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/folder/${id}/files`,
                {
                    withCredentials: true,
                }
            );
            setFiles(response.data.data);
        }catch(error){
            console.log(error);
        }
    }
    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedFiles) return;
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
        console.log(response.data);
        fetchFiles();
    }catch (error) {
        console.log("Upload failed:", error);
    }
    };
    const handleDelete = async (fileId) => {
        try{
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/file/${fileId}`,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            fetchFiles();
        }catch(error){
            console.log(error);
        }
    }
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
    } catch (err) {
        console.error(err);
        alert("Download failed");
    }
    };
    useEffect(()=>{
        fetchFolderInfo();
        fetchFiles();
    },[id]);
    return(
        <>
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
                <button type="submit">Upload</button>
            </form>
            {
                files.map((file)=>(
                    <div key = {file._id}>
                        <h2>{file.fileName}</h2>
                        <button onClick={()=>handleDelete(file._id)}>Delete -</button>
                        <button type="button"className="file-action-btn file-btn-download"onClick={() => handleDownload(file)}>Download</button>
                        <div onClick={() => setViewFile(file)}>  {file.fileName} </div>
                    </div>
                ))
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