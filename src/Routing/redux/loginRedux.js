import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name:"login",
    initialState:{ value :{ Email:"",password:""}},
    reducers:{
        login:(state,action )=>{
            state.value = action.payload;
        }
    }
});
export const { login } = loginSlice.actions;
export default loginSlice.reducer;