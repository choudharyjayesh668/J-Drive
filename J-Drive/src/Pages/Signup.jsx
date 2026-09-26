import { useState } from "react"
import axios from "axios";

import { useNavigate } from "react-router-dom";
export default function Signup(){
    const navigate = useNavigate();
    const [userdata,setUserData]=useState(
        {
            username:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    );
    const [error,setError] = useState(
        {
            username:"",
            email:"",
            password:"",
            confirmPassword:"",
            matchPassword:"",
        },
    );
    const validationForm = () => {
    const {
        username,
        email,
        password,
        confirmPassword
    } = userdata;

    const newError = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        matchPassword: "",
    };

    if (!username.trim()) {
        newError.username = "Enter Username";
    }

    if (!email.trim()) {
        newError.email = "Enter Email";
    }

    if (!password) {
        newError.password = "Enter Password";
    }

    if (!confirmPassword) {
        newError.confirmPassword = "Enter Confirm Password";
    }

    if (
        password &&
        confirmPassword &&
        password !== confirmPassword
    ) {
        newError.matchPassword = "Passwords do not match";
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
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/signup`,
                userdata
            );
            console.log(response.data);
            navigate("/login");
        } catch (error) {
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
                <h1>Welcome To SignUp</h1>
                <form onSubmit={handleOnSubmit}>
                    <input type="text"
                placeholder="Enter Username"
                value={userdata.username}
                onChange={handleOnChange}
                name="username"
                />
                {error.username && <p className="error">{error.username}</p>}
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
                <input type="password"
                placeholder="Enter Confirm Password"
                value={userdata.confirmPassword}
                onChange={handleOnChange}
                name="confirmPassword"
                />
                {error.password && <p className="error">{error.password}</p>}
                {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
                {error.matchPassword && <p className="error">{error.matchPassword}</p>}
                <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}