import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}
const loginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            
        },
         
        signOut: (state) => {
            state.currentUser = null;
        }
    }
})

export const {signInSuccess, signOut} = loginSlice.actions;
export default loginSlice.reducer;