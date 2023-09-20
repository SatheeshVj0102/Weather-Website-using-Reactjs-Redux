import { createSlice } from '@reduxjs/toolkit';
export const weatherSlice = createSlice({
    name:"weather",
    initialState:{value:{locationName:"",temperature:0,climate:""}},
    reducers:{
        weatherCheck:(state,action)=>{
            state.value = action.payload
        },
        
    }
});

export const { weatherCheck } = weatherSlice.actions; 
export default weatherSlice.reducer;
