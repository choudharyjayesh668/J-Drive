import { useState } from "react"
import axios from "axios";

import { useNavigate } from "react-router-dom";
export default function Login(){
    const navigate = useNavigate();
    const [userdata,setUserData]=useState({email:"",password:""});
    
    const handleOnChange=(event)=>{
        setUserData((curruserdata)=>{
            return{...curruserdata,[event.target.name]:event.target.value};
        });
    };
    const handleOnSubmit=async(event)=>{
        event.preventDefault();
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            userdata,
            {
                withCredentials: true
            }
        )
        console.log(response.data);
        navigate("/homepage");
    }
    return(
        <>
            <div className="signup">
                <h1>Welcome To Login</h1>
                <form onSubmit={handleOnSubmit}>
                <input type="text"
                placeholder="Enter Email"
                value={userdata.email}
                onChange={handleOnChange}
                name="email"
                />
                <input type="password"
                placeholder="Enter Password"
                value={userdata.password}
                onChange={handleOnChange}
                name="password"
                />
                <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}