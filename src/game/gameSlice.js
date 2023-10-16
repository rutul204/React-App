import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        history: [Array(9).fill(null)],
        currentMove: 0,
        toggleList: false
    },
    reducers: {
        toggleHistory: (state) => {
            state.toggleList = !state.toggleList;
        },
        updateCurrentMove: (state, action) => {
            state.currentMove = action.payload; 
        },
        updateGameHistory: (state, action) => {
            state.history = [...state.history.slice(0, state.currentMove+1), action.payload];
            state.currentMove = state.history.length - 1;
            // state.history = action.payload;
            // state.currentMove++;
        }
    }
})

export const { toggleHistory, updateCurrentMove, updateGameHistory } = gameSlice.actions;

export const selectHistory = (state) => state.game.history;
export const selectCurrentMove = (state) => state.game.currentMove;
export const selectToggleList = (state) => state.game.toggleList;

export default gameSlice.reducer