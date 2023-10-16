import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../game/gameSlice";
import productReducer from "../products/productSlice";

export default configureStore({
    reducer: {
        game: gameReducer,
        products: productReducer
    }
})