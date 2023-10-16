import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        showImage: false,
        filterText: ''
    },
    reducers: {
        toggleImage: (state) => {
            state.showImage = !state.showImage;
        },
        updateFilterText: (state, action) => {
            state.filterText = action.payload;
        }
    }
})

export const { toggleImage, updateFilterText } = productSlice.actions;

export const selectShowImage = (state) => state.products.showImage;
export const selectFilterText = (state) => state.products.filterText;

export default productSlice.reducer