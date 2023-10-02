import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate();

    function handleClick(){
        navigate("/tic-tac-toe");
    }

    return (
        <>
            <div>Welcome to Home Page</div>
            <br/>
            <button onClick={handleClick}>Click here to play</button>
        </>
    )
}