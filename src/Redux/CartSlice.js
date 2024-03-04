import { createSlice } from "@reduxjs/toolkit";

const CartSlice= createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
    },
    reducers:{
        AddToCart:(state,action)=>{
            const existingIdx=state.cartItems.findIndex((item)=> item.id === action.payload.id);
            if(existingIdx !== -1){
                state.cartItems[existingIdx].count +=1;
            }
            else{
                state.cartItems.push({...action.payload,count:1});
            }
        },

        RemoveFromCart:(state,action)=>{
            const Idx=state.cartItems.findIndex((item)=> item.id===action.payload.id);
            if(Idx!==-1){
                if(state.cartItems[Idx].count > 0){
                    state.cartItems[Idx].count -=1;
                    if(state.cartItems[Idx].count === 0){
                        state.cartItems.splice(Idx,1);
                    }
                }
            }
        },

        DeletFromCart:(state,action)=>{
            const existingIdx=state.cartItems.findIndex((item)=>item.id===action.payload.id);
            if(existingIdx !== -1){
                state.cartItems.splice(existingIdx,1);
            }
        },

        clearCart:(state)=>{
            state.cartItems=[];
        }
    }
})

export const {AddToCart,RemoveFromCart,DeletFromCart,clearCart}=CartSlice.actions;
export default CartSlice.reducer;