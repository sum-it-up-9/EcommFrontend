import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography,styled } from "@mui/material";

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    color: green;
`



const PricingDetails = () => {

  const {cartItems}=useSelector(state=>state.cart);
  console.log(cartItems);
  let TotalMrp=0,TotalCost=0;

  const CalculatePrice=()=>{
    TotalMrp=cartItems.reduce((csum,item)=> csum+ (item.price.mrp * item.count),0);
    TotalCost=cartItems.reduce((csum,item)=> csum+(item.price.cost * item.count),0);
  }

  CalculatePrice();

  return (
    <>
        <Box>  
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({cartItems.length} item)
                    <Price component="span">₹{TotalMrp}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span" style={{color:'green'}}>-₹{TotalMrp-TotalCost}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span" style={{color:'green'}} >Free</Price>
                </Typography>
                <TotalAmount>Total Amount
                    <Price>₹{TotalCost}</Price>
                </TotalAmount>
                <Discount style={{fontSize: '16px' }}>You will save ₹{TotalMrp-TotalCost} on this order</Discount>
            </Container>
        </Box>
    </>
  )
}

export default PricingDetails;
