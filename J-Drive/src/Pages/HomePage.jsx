import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function HomePage(){
    const navigate =  useNavigate();
    const [createFolder,setCreateFolder] = useState({ name : "" });
    const [allfolder,setAllFolder] = useState([]);
    const handleOnChange = (event) =>{
        setCreateFolder({[event.target.name]:event.target.value})
    }
    const handleDelete = async (id) => {
        console.log("Deleting folder:", id);
        try{
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/folder/${id}`
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
                `${import.meta.env.VITE_API_URL}/folder`
            )
            console.log(response.data.data);
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
            );
            setCreateFolder({name:""});
            console.log(response.data.message);
            console.log(response.data.folder);
            fetchFolder();
        }catch(error){
            console.error("Create folder error:", error);
            alert(error.response?.data?.message || "Failed to create folder");
        }
    };
    const handleOpenFolder = async (id) => {
        console.log("Double Clicked");
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/folder/${id}`,
            );
            navigate(`/folder/${id}`);
        }catch(error){
            console.log(`Folder Opened Failed ${error}`);
        }
    }
    const handleRename = async (id) =>{
        
    }
    return(
        <>
            <h1>Homepage</h1>
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
        </>
    );
};