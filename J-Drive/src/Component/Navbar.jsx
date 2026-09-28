import axios from "axios";
import { useEffect, useState } from "react";
import "../global.css";
export default function Navbar(){
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            window.location.href = "/login";
        } catch (err) {
            console.log(err);
        }
    }
    const fetchUserName = async () => {
        try{
            const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/me`,
            {
                withCredentials: true,
            }
        );
            setUserName(response.data.name);
            setEmail(response.data.email);
            setIsLoggedIn(true);
        }catch(error){
            setIsLoggedIn(false);
            setUserName("");
            setEmail("");
        }
    }
    useEffect(()=>{
        fetchUserName();
    },[])
    return(
        <div className="navbar">
            <div className="navbarLeft">
                <p>J-Drive</p>
            </div>
            <div className="right">
                {isLoggedIn ? (
                    <>
                        <div className="loddgedinNavbar">
                            <p>{userName}</p>
                            <a href="/homepage">Homepage</a>
                            <a href="/setting">Setting</a>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </>
                ):(
                <>
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                </>)}
            </div>
        </div>
    )
}