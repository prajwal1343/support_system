import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ticketData : {}
}
const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    
    reducers: {
        addInfo: (state, action) => {
            state.ticketData = { ...state.ticketData, ...action.payload };
        },
    },
})

export const { addInfo } = ticketSlice.actions;
export default ticketSlice.reducer;