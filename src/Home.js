import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate();

    function navigateTo(path){
        navigate(path);
    } 

    return (
        <>
            <div>Welcome to Home Page</div>
            <br/>
            <button className="btn btn-primary" onClick={() => navigateTo("/tic-tac-toe")}>Click here to play</button>
            <br/><br/>
            <button className="btn btn-primary" onClick={() => navigateTo("/products")}>Click here to see Products</button>
        </>
    )
}