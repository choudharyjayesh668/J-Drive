import { useNavigate } from "react-router-dom"

export default function Folder(){
    const navigate = useNavigate();
    const handleHomepage = () => {
        navigate(`/homepage`)
    }
    return(
        <>
            <h1>Folder</h1>
            <button onClick={handleHomepage}>Homepage</button>
        </>
    )
}