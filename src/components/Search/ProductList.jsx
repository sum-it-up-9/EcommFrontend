import { Box,styled } from "@mui/material";
import ProductView from './ProductView';
import { useEffect } from "react";
import { useState } from "react";
import { FormControlLabel, Checkbox,FormControl,RadioGroup,Radio, Typography, Slider, Divider } from '@mui/material';
import {Brands,RatingsArr} from '../../constants/data';
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../Redux/ProductSlice";
import { Link } from "react-router-dom";

const Conatainer=styled(Box)`
    display:flex;
    background:#F2F2F2;
    
`

const LeftContainer=styled(Box)`
  display:flex;
  flex-direction:column;
  width:20%;
  max-height:1000px;
  margin:20px 20px;
  background:#fff;
`

const RightContainer=styled(Box)`
  display:flex;
  flex-direction:column;
  background:#fff;
  margin:20px 0px;
  width:75%;
`

const BoxBrand=styled(Box)`
  display:flex;
  flex-direction:column;
  padding-left:30px;
`;

const ProductList = () => {
  //const [MonitorData,setMonitorData]=useState([]);
  const state=useSelector(state=>state.product);
  //console.log(state);
  
  
  //console.log(state?.product.ProductData,'state');
  //filter state variables
  const [ratings,setRatings]=useState([]);
  const [brands,setBrands]=useState([]);
  const [price,setPrice]=useState(4000);
  const[sortType,setSortType]=useState('LTH');

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(fetchProduct());
  },[]);

  if(state.isLoading) return <div>Loading...</div>;

  const handleBrandChange= (Selectedbrand)=>{
    console.log(Selectedbrand);
    if(brands.includes(Selectedbrand)){
      setBrands(brands.filter(brand=>brand!==Selectedbrand)) 
    }
    else{
      setBrands([...brands,Selectedbrand]);
    }
  };


  const handleRatingChange=(e)=>{
    console.log(e.target.name);
    const str=e.target.name;
    const Selectedrating = parseInt(str.split(' ')[0]);
    console.log(Selectedrating);
    if(ratings.includes(Selectedrating)){
      setRatings(ratings.filter(rating=>rating!==Selectedrating));
    }
    else{
      setRatings([...ratings,Selectedrating]);
    }
    
  }

  const handleSortingChange =(e)=>{
    setSortType(e.target.value);
  }

  const handlePriceChange = (event, newPrice) => {
    console.log(newPrice,'newprice');
    setPrice(newPrice);
  };
  
  const extractNumericValue = (str) => {
    const numericPart = str.split(' ')[0];
    return parseInt(numericPart);
  };

  console.log(state.ProductData);

  // Filter the products based on the selected filters
   const filteredData = state.ProductData.filter((monitor) => {
    // Filter by brands
    if (brands.length > 0 && !brands.includes(monitor.brand)) {
      return false;
    }

    // Filter by price range
    if (monitor.price?.cost > price) {
      return false;
    }

    // Filter by ratings
    if (ratings.length > 0 && !ratings.includes(extractNumericValue(monitor.rating))) {
      return false;
    }

    return true;
  }); 

  const sortedData = [...filteredData]; 
  sortedData.sort((a, b) => {
    const priceA = a.price?.cost || 0;
    const priceB = b.price?.cost || 0;

    if (sortType === "LTH") {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  

  return (
    <>
      <Conatainer>
        {/*Filter - left container*/}
       
        <LeftContainer>
          <Typography style={{paddingTop:20,paddingLeft:30,fontWeight:600,paddingBottom:8}}>FILTERS</Typography>
          <Divider/>
          <Typography style={{paddingTop:20,paddingLeft:30,fontWeight:600,paddingBottom:5}}>BRANDS</Typography>
          <BoxBrand style={{paddingBottom:10}}>
            {Brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox onChange={()=>handleBrandChange(brand)}/>
                }
                label={ <Typography style={{ fontSize: '13px' }}>
                {brand}
              </Typography>}
              />
            ))}
          </BoxBrand>
          <Divider/>
          <Box>
            <Typography style={{paddingTop:20,paddingLeft:30,fontWeight:600,paddingBottom:5}}>PRICE RANGE</Typography>
            <Box style={{paddingLeft:30,paddingRight:20,paddingBottom:10}}>
              <Slider
              value={price}
              valueLabelDisplay="auto"
              aria-labelledby="price-range-slider"
              min={0}
              max={4000}
              onChange={(event,newPrice)=>handlePriceChange(event,newPrice)}
            /></Box>
            <Divider/>
           
          </Box>
          
          <Box>
            <Typography style={{paddingTop:20,paddingLeft:30,fontWeight:600,paddingBottom:5}}>Price Sort By</Typography>
            <FormControl style={{paddingLeft:30,paddingRight:20,paddingBottom:10}}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={sortType}
                onChange={(e)=>handleSortingChange(e)}
              >
                <FormControlLabel value="LTH" control={<Radio />} label="Low To High" />
                <FormControlLabel value="HTL" control={<Radio />} label="High To Low" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Divider/>

          <Box>
          <Typography style={{paddingTop:20,paddingLeft:30,fontWeight:600,paddingBottom:5}}>RATINGS</Typography>
          <BoxBrand style={{paddingBottom:10}}>
            {RatingsArr.map((rating) => (
              <FormControlLabel
                key={rating}
                control={
                  <Checkbox name={rating} onChange={(e)=>handleRatingChange(e)}/>
                }
                label={rating}
              />
            ))}
          </BoxBrand>     
          </Box>
          
        </LeftContainer>

        {/* ProductView- right container*/}
        <RightContainer>
            {
              sortedData.map(monitor=>(
                <Link to={`/product/${monitor.id}`} key={monitor.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ProductView  MonitorData={monitor} key={monitor._id}/>
                </Link>
              ))
            }
        </RightContainer>
      </Conatainer>
    </>
  )
}

export default ProductList;
