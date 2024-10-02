import { createSlice } from "@reduxjs/toolkit";

const requestSlice= createSlice({
    name: 'request',
    initialState: null,
    reducers : {
        addRequest : (state,action) => {
            return action.payload;
        },
        removeRequest :(state,action) =>{
            const data=state.filter(x => x._id !== action.payload)
            return data;
        }
    }
})

export const {addRequest,removeRequest} = requestSlice.actions;

export default requestSlice.reducer;