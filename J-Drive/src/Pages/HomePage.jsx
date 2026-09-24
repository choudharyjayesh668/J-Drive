import {useEffect, useState} from "react";
import axios from "axios";
export default function HomePage(){
    const [createFolder,setCreateFolder] = useState({ name : "" });
    const [allfolder,setAllFolder] = useState([]);
    const handleOnChange = (event) =>{
        setCreateFolder({[event.target.name]:event.target.value})
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
        }catch(error){
            console.error("Create folder error:", error);
            alert(error.response?.data?.message || "Failed to create folder");
        }
    };
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
                    <div key={folder._id}>
                        <h3>{folder.folderName}</h3>
                    </div>
                ))}
            </div>
        </>
    );
};