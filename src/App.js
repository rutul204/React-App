import Home from './home/Home'
import Game from './game/Game';
import ErrorPage from './error-page/ErrorPage';
import Product from './products/Products';
import ProductDetail from './products/ProductDetail';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/game" element={<Game/>}/>
        <Route path="/error-page" element={<ErrorPage />} />
        <Route path="/products" element={<Product/>} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/" element={<Navigate to="/home"/>} isExact={true}/>
        <Route path="*" element={<Navigate to="/error-page"/>} />
      </Routes>
    </BrowserRouter>
  );
}
