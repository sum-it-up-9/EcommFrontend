import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductData } from "../../service/api";
import { Box, Typography,Button, styled,Grid,Table, TableBody, TableRow, TableCell, } from "@mui/material";
import { LocalOffer as Badge } from '@mui/icons-material';
import { AddToCart } from "../../Redux/CartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;


const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`

const LeftConatiner=styled(Box)`
  min-width:40%;
  padding:40px 0 0 80px;
`;

const Image=styled('img')({
  padding:'15px 20px',
  border:'1px solid #f0f0f0',
  width:'92%',
  
})


const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
    }
`

const StyledButton=styled(Button)`
    width:46%;
    height:50px;
    border-radius:5px;
    font-weight:bold;
`

const DetailsView = () => {

  const {account, setAccount,open,setOpen,openLoginDialog}=useContext(DataContext);
  const { userDetails, setUserDeatils}=useContext(DataContext);


  const [productData,setproductData]=useState({});
  const {id}=useParams();
  const date = new Date(new Date().getTime()+(5*24*60*60*1000));
    
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    const getData=async(id)=>{
      let data= await getProductData(id);
      setproductData(data?.data);
      console.log(data);
    }
    getData(id);
  },[id]);

  const handleAddToCart=(productData)=>{
    console.log(productData);
    dispatch(AddToCart(productData));
    navigate('/cart');
  }

  const postOrder=async(productData)=>{
    try{
      const url='http://localhost:8000/order';
      console.log(productData,'ds');
      const res=await axios.post(url,{...productData,email:userDetails.email});
      console.log(res);
   }
   catch(error){
    console.log('error while posting order',error);
   }
   
  }

  const initPayment = (data,productData) => {
		const options = {
			key: "rzp_test_KXjoyP6t5tES5B",
			amount: productData?.price?.cost,
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
            postOrder(productData);
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


  const buyNow=async function(productData){
    try {
      if(!account){
        setOpen(true);
        return;
      }
			const orderUrl = "http://localhost:8000/orders";
			const { data } = await axios.post(orderUrl, { amount: productData?.price?.cost });
			console.log(data);
			initPayment(data.data,productData);
		} catch (error) {
			console.log(error);
		}
  }

  return (
    <>{
      productData && (
      <Grid container>
        {/* Left Container */}
        <Grid item lg={4} md={4} sm={8} xs={12}>
          <LeftConatiner>
            <Box style={{marginBottom:10}}>
              <Image src={productData?.url} />
            </Box>
            <StyledButton onClick={()=>{handleAddToCart(productData)}} variant="contained" style={{marginRight:10,background:'#ff9f00'}} >Add to Cart</StyledButton>
            <StyledButton onClick={()=>{buyNow(productData)}} variant="contained" style={{background:'#fb541b'}}>Buy Now</StyledButton>
          </LeftConatiner>
        </Grid>

        {/* Right Container */}
        <Grid item lg={8} md={8} sm={8} xs={12} style={{marginTop:55,paddingRight:20,paddingLeft:40}}>
          <Typography>{productData?.title?.longTitle}</Typography>
          <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
            8 Ratings & 1 Reviews
          
          </Typography>
          <Typography>
            <span style={{ fontSize: 28 }}>₹{productData?.price?.cost}</span>&nbsp;&nbsp;&nbsp; 
            <span style={{ color: '#878787' }}><strike>₹{productData?.price?.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
            <span style={{ color: '#388E3C' }}>{productData?.price?.discount} off</span>
          </Typography>
          <Typography>Available offers</Typography>
          <SmallText>
                  <Typography><StyledBadge />Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Typography>
                  <Typography><StyledBadge />Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</Typography>
                  <Typography><StyledBadge />Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</Typography>
                  <Typography><StyledBadge />Partner OfferExtra 10% off upto ₹500 on next furniture purchase</Typography>
          </SmallText>
          <Table style={{marginTop:30}}>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                        <TableCell>No Warranty</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                        <TableCell>
                            <span style={{ color: '#2874f0' }}>SuperComNet</span>
                            <Typography>GST invoice available</Typography>
                
                        </TableCell>
                    </ColumnText>
            
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Description</TableCell>
                        <TableCell>{productData?.description}</TableCell>
                    </ColumnText>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <img src={'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50'} style={{ width: 390 }} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Grid>
      </Grid>
      )
    
      
    }
      
    </>
  )
}

export default DetailsView;
