import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterText, selectShowImage, toggleImage, updateFilterText } from "./productSlice";

export default function Product(){
    const dispatch = useDispatch();
    // const [filterText, setFilterText] = useState('');
    const filterText = useSelector(selectFilterText);
    // const [showImage, setShowImage] = useState(true);
    const showImage = useSelector(selectShowImage);
    // const [products, setProducts] = useState([]);
    const res = useFetch('/data/products.json');
    // const [filteredProducts, setFilteredProducts] = useState();
    const navigate = useNavigate();
    const products = res.data;
    
    // useEffect(() => {
    //     setTimeout(() => {
    //         axios.get('/data/products.json')
    //         .then(res => {
    //             setProducts(res.data);
    //             setFilteredProducts(res.data);
    //             setIsLoading(false);
    //         })
    //     }, 2000);
    // }, []);

    function handleFilter(value){
        // setFilterText(value);
        dispatch(updateFilterText(value));
        // applyFilter(value);
    }

    // function applyFilter(value){
    //     value = value.toLocaleLowerCase();
    //     let filteredProducts = res.data.filter(p => p.productName.toLocaleLowerCase().includes(value));
    //     setFilteredProducts(filteredProducts);
    //     setFilteredProducts(res.data.filter(p => p.productName.toLocaleLowerCase().includes(value)));
    // }

    function filterProducts(value){
        value = value.toLocaleLowerCase();
        return products.filter(p => p.productName.toLocaleLowerCase().includes(value));
    }

    // function toggleImage(){
    //     setShowImage(!showImage);
    // }

    function gotoDetailsPage(id){
        let index = products.findIndex(p => p.productId == id);
        let product = products[index];
        navigate('/products/'+id, {state : product});
    }

    if(res?.loading){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    let productsView = filterProducts(filterText)?.map(p => {
        return (
            <tr key={p.productId}>
                <td>
                    {showImage? <img src={p.imageUrl} width='50' height='50'/> : ''}
                </td>
                <td>
                    <a className="productLink" onClick={() => gotoDetailsPage(p.productId)}>{p.productName}</a>
                </td>
                <td>{p.productCode}</td>   
                <td>{p.releaseDate}</td>
                <td>{p.price}</td>
                <td>{p.starRating}</td>
            </tr> 
        )
    });

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">Product List</div>
                <div className="card-body">
                    <label>Filter By:</label>
                    <input value={filterText} type="text" onChange={e => handleFilter(e.target.value)}/>
                    <br/><br/>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>
                                    <button className="btn btn-primary" onClick={() => dispatch(toggleImage())}>
                                        {showImage ? 'Hide' : 'Show'} Image
                                    </button>
                                </td>
                                <td>Product</td>
                                <td>Code</td>
                                <td>Available</td>
                                <td>Price</td>
                                <td>Rating</td>
                            </tr>
                        </thead>
                        <tbody>
                            {productsView}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}