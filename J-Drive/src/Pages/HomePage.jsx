import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
export default function HomePage(){
    const navigate =  useNavigate();
    const [createFolder,setCreateFolder] = useState({ name : "" });
    const [allfolder,setAllFolder] = useState([]);
    const [folderNewName,setFolderNewName] = useState("");
    const [showRename,setShowRename] = useState(false);
    const [renameId,setRenameId] = useState(null);
    const [deleteFolder, setDeleteFolder] = useState(null);
    const [popup,setPopup] = useState({show:false,message:"",type:"",});
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
            showPopup(response.data.message, "success");
        }catch(error){
            console.error("Delete folder error:", error);
            showPopup(
            error.response?.data?.message || "Failed to delete folder",
            "error"
            );
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
            console.error("Fetch folder error:", error);
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
        try{
            await axios.get(
                `${import.meta.env.VITE_API_URL}/folder/${id}`,
                {
                    withCredentials:true,
                },
            );
            navigate(`/folder/${id}`);
        }catch(error){
            console.log(`Folder Opened Failed ${error}`);
            showPopup(
                error.response?.data?.message || "Failed to open folder",
                "error"
            );
        }
    }
    const handleRename = async (id) => {
    try {
        const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/folder/${id}`,
        {
            withCredentials: true,
        }
        );
        setFolderNewName(response.data.folder.folderName);
        setRenameId(id);
        setShowRename(true);
    } catch (error) {
        console.error("Load folder error:", error);
        setPopup({
        show: true,
        message:
            error.response?.data?.message ||
            "Failed to load folder",
        type: "error",
        });
        setTimeout(() => {
        setPopup({
            show: false,
            message: "",
            type: "",
        });
        }, 3000);
    }
    };
    const handleRenameSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/folder/${renameId}`,
        {
            folderName: folderNewName,
        },
        {
            withCredentials: true,
        }
        );
        setShowRename(false);
        fetchFolder();
        setPopup({
        show: true,
        message: response.data.message,
        type: "success",
        });
        setTimeout(() => {
        setPopup({
            show: false,
            message: "",
            type: "",
        });
        }, 3000);
    } catch (error) {
        console.error("Rename folder error:", error);
        setPopup({
        show: true,
        message:
            error.response?.data?.message ||
            "Failed to rename folder",
        type: "error",
        });
        setTimeout(() => {
        setPopup({
            show: false,
            message: "",
            type: "",
        });
        }, 3000);
    }
    };
    return(
        <>
            <Navbar/>
            <div className="createFolder">
                <form onSubmit={handleCreateFolder}>
                    <input type="text" 
                    name="name"
                    value={createFolder.name}
                    onChange={handleOnChange}
                    placeholder="Enter Folder Name"
                    />
                    <button type="Submit">Create +</button>
                </form>
            </div>
            <div>
                {allfolder.map((folder) => (
    <div
        className="folderCard"
        key={folder._id}
        onDoubleClick={() => handleOpenFolder(folder._id)}
    >
        <div className="folderInfo">
            <div className="folderIcon">□</div>

            <div>
                <h3>{folder.folderName}</h3>
                <p>Double-click to open</p>
            </div>
        </div>

        <div className="folderActions">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleRename(folder._id);
                }}
            >
                Rename
            </button>
           <button
                className="deleteButton"
                onClick={(e) => {
                    e.stopPropagation();
                    setDeleteFolder(folder);
                }}
            >
                Delete
            </button>
            {deleteFolder && (
            <div
                className="deleteModalOverlay"
                onClick={() => setDeleteFolder(null)}
            >
                <div
                    className="deleteModal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="deleteModalContent">
                        <h3>Delete folder?</h3>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>{deleteFolder.folderName}</strong>?
                        </p>

                        <span>
                            This will permanently delete the folder and all
                            files inside it.
                        </span>
                    </div>

                    <div className="deleteModalActions">
                        <button
                            type="button"
                            className="cancelDelete"
                            onClick={() => setDeleteFolder(null)}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="confirmDelete"
                            onClick={async () => {
                                await handleDelete(deleteFolder._id);
                                setDeleteFolder(null);
                            }}
                        >
                            Delete folder
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
    )
)}
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