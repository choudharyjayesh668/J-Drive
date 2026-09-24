import { useState } from "react"
import axios from "axios";

import { useNavigate } from "react-router-dom";
export default function Signup(){
    const navigate = useNavigate();
    const [userdata,setUserData]=useState({username:"",email:"",password:""});
    
    const handleOnChange=(event)=>{
        setUserData((curruserdata)=>{
            return{...curruserdata,[event.target.name]:event.target.value};
        });
    };
    const handleOnSubmit=async(event)=>{
        event.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/signup`,
                userdata
            );

            console.log(response.data);
            navigate("/login");

        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("ERROR:", error.message);
        }
    }
    return(
        <>
            <div className="signup">
                <h1>Welcome To SignUp</h1>
                <form onSubmit={handleOnSubmit}>
                    <input type="text"
                placeholder="Enter Username"
                value={userdata.username}
                onChange={handleOnChange}
                name="username"
                />
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