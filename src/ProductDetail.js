import { useLocation, useParams } from "react-router-dom"

export default function ProductDetail(){
    const params = useParams();
    const location = useLocation();
    const product = location.state;

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    Product Detail : {product.productName}
                </div>
                <div className="card-body"></div>
            </div>
        </div>
    )
}