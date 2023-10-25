import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        showImage: false,
        filterText: '',
        products: [],
        status: 'idle',
        error: null
    },
    reducers: {
        toggleImage: (state) => {
            state.showImage = !state.showImage;
        },
        updateFilterText: (state, action) => {
            state.filterText = action.payload;
        },
        resetProducts: (state) => {
            state.status = 'idle';
            state.products = [];
            state.filterText = '';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
})

export const { toggleImage, updateFilterText, resetProducts } = productSlice.actions;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
    // await setTimeout(() => {
    //     console.log('in timout');
    // }, 2000);
    await delay();
    const res = await axios.get('/data/products.json');
    return res.data;
})

const delay = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
} 

export const selectShowImage = (state) => state.products.showImage;
export const selectFilterText = (state) => state.products.filterText;
export const selectAllProducts = (state) => state.products.products;
export const selectProductStatus = (state) => state.products.status;

export default productSlice.reducer