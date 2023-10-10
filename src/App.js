import Home from './Home'
import Game from './Game';
import ErrorPage from './ErrorPage';
import Product from './Products';
import ProductDetail from './ProductDetail';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/tic-tac-toe" element={<Game/>}/>
        <Route path="/error-page" element={<ErrorPage />} />
        <Route path="/products" element={<Product/>} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/" element={<Navigate to="/home"/>} isExact={true}/>
        <Route path="*" element={<Navigate to="/error-page"/>} />
      </Routes>
    </BrowserRouter>
  );
}
