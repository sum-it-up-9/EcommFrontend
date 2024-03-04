import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box,  styled,Grid,Button} from "@mui/material";
import CartItem from './CartItem';
import PricingDetails from './PricingDetails';
import EmptyCart from './EmptyCart';
import axios from 'axios';
import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { clearCart } from '../../Redux/CartSlice';

const LeftContainer=styled(Box)`
    display:flex;
    flex-wrap:no-wrap;
    background:#fff;
    width:98%;
    padding-top:10px;
    border-bottom: 1px dashed gray;
`
const StyledGrid=styled(Grid)`
  padding:35px 35px 0px 135px;
  background:#F2F2F2;
  height:100vh;
  
 `

 const BottomWrapper = styled(Box)`
  width:94%;
  padding:20px;
 background: #fff;
 box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
 border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
margin-left:80%;
 background: #fb641b;
 color: #fff;
 border-radius: 2px;
 height: 51px;
`;


const Cart = () => {
    
  const {cartItems}=useSelector(state=>state.cart);
  const {userDetails,account,open,setOpen}=useContext(DataContext);
  //console.log(cartItems);

  const dispatch=useDispatch();

  
    if(!cartItems.length){
      return <EmptyCart/>
    } 
     
  
      const postOrder=async()=>{
        try{
          const url='http://localhost:8000/order';
         // console.log(productData,'ds');
          const res=await axios.post(url,{...cartItems,email:userDetails.email});
          //console.log(res);
          dispatch(clearCart());

       }
       catch(error){
        console.log('error while posting order',error);
       }
       
      }
    
      const initPayment = (data) => {
        const options = {
          key: "rzp_test_KXjoyP6t5tES5B",
          amount: data.amount,
          currency: data.currency,
          name: 'New Product',
          description: "Test Transaction",
          order_id: data.id,
          handler: async (response) => {
            try {
              const verifyUrl = "http://localhost:8000/verify";
              const { data } = await axios.post(verifyUrl, response);
              console.log(data,'payment info');
              if(data.message==='Payment verified successfully'){
                postOrder();
              }
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
    
    
      const buyNow=async function(){
        try {
          if(!account){
            setOpen(true);
            return;
          }
          const orderUrl = "http://localhost:8000/orders";
          const ans=cartItems.reduce((acc,item)=>{ return acc+ (item.price.cost)},0);
          console.log(ans,'ans');
          const { data } = await axios.post(orderUrl, { amount: cartItems.reduce((acc,item)=>{ return acc+ (item?.price?.cost * (item.count))},0) });
          console.log(data);
          initPayment(data.data);
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <StyledGrid container>
      <Grid item lg={8} md={8} sm={12} xs={12}>
       
        {
          cartItems.map((item)=>(
            <LeftContainer>
               <CartItem item={item} />
                
            </LeftContainer>
          ))
        }
        <BottomWrapper>
          <StyledButton onClick={()=>{buyNow()}}  variant="contained">Place Order</StyledButton>
        </BottomWrapper>
      </Grid>
      
      <Grid item  lg={4} md={4} sm={12} xs={12}>
        <PricingDetails/>
      </Grid>
    </StyledGrid>
  )
}

export default Cart;
