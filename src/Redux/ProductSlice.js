import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const url='http://localhost:8000';

//action
export const fetchProduct=createAsyncThunk('fetchProduct',async () =>{
    try{
        const response = await axios.get(`${url}/monitors`);
        // Extract only the data property from the Axios response
        return response.data;
    }catch(error){
        console.log('error while calling getMonitorsData api: ',error);
        return error.response;
    }
});


const ProductSlice=createSlice({
    name:"product",
    initialState:{
        isLoading:false,
        ProductData:[],
        isError:false,
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchProduct.pending,(state,action)=>{
            state.isLoading=true;
        });
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
            console.log(action.payload,'ap');
            state.ProductData=action.payload;
            state.isLoading=false;
           
        });
        builder.addCase(fetchProduct.rejected,(state,action)=>{
            console.log('err',action.payload);
            state.isError=true;
        })
    }
    
})

export default ProductSlice.reducer;