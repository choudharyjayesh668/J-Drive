import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";

export default function Folder(){
    const navigate = useNavigate();
    const [folderInfo,setFolderInfo] = useState();
    const [selectedFiles,setSelectedFiles] = useState([]);
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
            console.log(`Failed to load FolderInfo ${error}`)
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
    }catch (error) {
        console.log("Upload failed:", error);
    }
    };
    useEffect(()=>{
        fetchFolderInfo();
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
        </>
    )
}