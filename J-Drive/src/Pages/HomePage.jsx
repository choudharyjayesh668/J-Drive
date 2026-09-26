import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function HomePage(){
    const navigate =  useNavigate();
    const [createFolder,setCreateFolder] = useState({ name : "" });
    const [allfolder,setAllFolder] = useState([]);
    const [folderNewName,setFolderNewName] = useState("");
    const [showRename,setShowRename] = useState(false);
    const [renameId,setRenameId] = useState(null);
    const [popup,setPopup] = useState({
        show:false,
        message:"",
        type:"",
    });
    const handleOnChange = (event) =>{
        setCreateFolder({[event.target.name]:event.target.value})
    }
    const handleDelete = async (id) => {
        console.log("Deleting folder:", id);
        try{
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/folder/${id}`,
                {
                    withCredentials:true,
                },
            );
            console.log(response.data.message);
            fetchFolder();
        }catch(error){
            console.log(`Delete Failed ${error}`);
        }
    }
    const fetchFolder = async () => {
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/folder`,
                {
                    withCredentials:true,
                },
            )
            setAllFolder(response.data.data);
        }catch(error){

        }
    }
    useEffect(()=>{
        fetchFolder();
    },[]);
    const handleCreateFolder = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/createFolder`,
                createFolder,
                {
                    withCredentials:true,
                },
            );
            setCreateFolder({name:""});
            console.log(response.data.message);
            setPopup({
                show:true,
                message:response.data.message,
                type:"success",
            });
            fetchFolder();
            setTimeout(()=>{
                setPopup({
                    show: false,
                    message: "",
                    type: "",
                })
            },3000);
        }catch(error){
            console.error("Create folder error:", error);
            setPopup({
            show: true,
            message:
                error.response?.data?.message ||
                "Failed to create folder",
            type: "error",
            });
            setTimeout(() => {
            setPopup({
                show: false,
                message: "",
                type: "",
            });
            }, 5000);
        }
    };
    const handleOpenFolder = async (id) => {
        console.log("Double Clicked");
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/folder/${id}`,
                {
                    withCredentials:true,
                },
            );
            navigate(`/folder/${id}`);
        }catch(error){
            console.log(`Folder Opened Failed ${error}`);
        }
    }
    const handleRename = async (id) =>{
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/folder/${id}`,
                {
                    withCredentials:true,
                },
            );
            setFolderNewName(response.data.folder.folderName);
            setRenameId(id);
            setShowRename(true);
        }catch(error){
            console.log(error);
        }
    }
    const handleRenameSubmit = async (event) =>{
        event.preventDefault();
        try{
            console.log(folderNewName);
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/folder/${renameId}`,
                {
                    folderName:folderNewName,
                },
                {
                    withCredentials:true,
                },
            );
            setShowRename(false);
            fetchFolder();
        }catch(error){
            conbsole.log(error);
        }
    }
    const handleLogout = async () => {
    try {
        await axios.post(
            "http://localhost:3000/logout",
            {},
            {
                withCredentials: true,
            }
        );
        window.location.href = "/login";
        // navigate("/login");
    } catch (err) {
        console.log(err);
    }
}
    return(
        <>
            <h1>Homepage</h1>
            <button onClick={handleLogout}>Logout</button>
            <form onSubmit={handleCreateFolder}>
                <input type="text" 
                name="name"
                value={createFolder.name}
                onChange={handleOnChange}
                placeholder="Enter Folder Name"
                />
                <button type="Submit">Create +</button>
            </form>
            <div>
                {allfolder.map((folder)=>(
                    <div key={folder._id} >
                        <h3 onDoubleClick={()=>handleOpenFolder(folder._id)}>{folder.folderName}</h3>
                        <button onClick={()=>handleRename(folder._id)}>Rename </button>
                        <button onClick={()=>handleDelete(folder._id)}>Delete -</button>
                    </div>
                ))}
            </div>
            {
                showRename && (
                    <div>
                        <form onSubmit={handleRenameSubmit}>
                            <h1>Rename Folder{folderNewName}</h1>
                            <input type="text" 
                            placeholder="Rename Folder"
                            value={folderNewName}
                            onChange={(e) => setFolderNewName(e.target.value)}
                            />
                            <button type="submit">Apply Changes</button>
                            <button type="button" onClick={()=>setShowRename(false)}>Cancle</button>
                        </form>
                    </div>  
                )
            }
            {popup.show && (
            <div className={`popup ${popup.type}`}>
                {popup.message}
            </div>
            )}
        </>
    );
};