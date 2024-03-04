import React from 'react';
import { Box, Typography,styled,Button,ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart,DeletFromCart, RemoveFromCart } from '../../Redux/CartSlice';

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;


const ProductImage = styled(Box)`
    flex-basis: 17%;
    padding:5px 0px 0px 20px;
`;


const ProductSpecs=styled(Box)`
  margin-top:2px;
  flex-basis:56%;
`




const CartItem = ({item}) => {

  const {cartItems}=useSelector(state=>state.cart);
  const dispatch=useDispatch();
  const ItemInCart = cartItems.find(cartItem => cartItem.id === item.id);

  const handleAddItem= (item)=>{
    dispatch(AddToCart(item))
  }

  const handleDeleteItem = (item) =>{
    dispatch(DeletFromCart(item));
  }

  const handleRemoveItem=(item)=>{
    dispatch(RemoveFromCart(item));
  }

  return (
    <>
        <ProductImage key={item._id}>
            <img src={item.detailUrl} style={{height:'110px', width:'110px'}} alt="productimg" />
        </ProductImage>
        <ProductSpecs>
            <Typography style={{fontWeight:'bold'}}>{item.title.longTitle}</Typography>
            <SmallText>Seller: TechRetail</SmallText>
            <Box style={{margin: '10px 0'}}>
              <span style={{fontSize:'16px',textDecoration:'line-through'}}>{item.price.mrp}</span>            
              <span style={{marginLeft:'20px',fontWeight:'bold'}}>₹{item.price.cost}</span>
            </Box>
           
            <Button  onClick={()=>handleDeleteItem(item)} variant="contained" style={{marginBottom:20,fontSize:10,fontWeight:'bold',height:'25px',width:'50px'}}>Remove</Button>
        </ProductSpecs>
        <Box>
          <Typography style={{fontSize:14}}> Delivery by Thu Aug 3 | <span style={{color:'green'}}>Free</span> </Typography> 
          <Box>

          <ButtonGroup style={{marginTop:30}} size="small" variant="contained"  aria-label="small outlined button group">
            <Button onClick={()=>handleRemoveItem(item)}>-</Button>
            <Button disabled style={{color:'black',background:'white'}}>{ItemInCart.count}</Button>
            <Button onClick={()=>handleAddItem(item)}>+</Button>
          </ButtonGroup>
          </Box>
         
        </Box>
       
    </>
  )
}

export default CartItem;
