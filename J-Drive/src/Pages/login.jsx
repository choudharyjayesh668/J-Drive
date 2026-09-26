import { useState } from "react"
import axios from "axios";

import { useNavigate } from "react-router-dom";
export default function Login(){
    const navigate = useNavigate();
    const [userdata,setUserData]=useState({email:"",password:""});
    const [error,setError] = useState(
        {
            email:"",
            password:"",
        },
    );
        const validationForm = () => {
    const {
        email,
        password,
    } = userdata;

    const newError = {
        email: "",
        password: "",
        server: "",
    };

    if (!email.trim()) {
        newError.email = "Enter Email";
    }

    if (!password) {
        newError.password = "Enter Password";
    }

    setError(newError);

    return !Object.values(newError).some(
        (message) => message !== ""
        );
    };
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setUserData((curruserdata) => ({
            ...curruserdata,
            [name]: value,
        }));
        setError((prev) => ({
            ...prev,
            [name]: "",
            server: "",
        }));
    };
    const handleOnSubmit=async(event)=>{
        event.preventDefault();
        const isValid = validationForm();
        if(!isValid) return;
        try{
            const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            userdata,
            {
                withCredentials: true
            }
        )
        console.log(response.data);
        navigate("/homepage");
        }catch(error){
            const message = error.response?.data?.message;
            console.log(message);
            setError((prev) => ({
                ...prev,
                email: message || "Something went wrong",
            }));
        }
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
                {error.email && <p className="error">{error.email}</p>}
                <input type="password"
                placeholder="Enter Password"
                value={userdata.password}
                onChange={handleOnChange}
                name="password"
                />
                {error.password && <p className="error">{error.password}</p>}
                <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}