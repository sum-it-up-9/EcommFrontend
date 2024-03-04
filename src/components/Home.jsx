import styled from "@emotion/styled";
import { navData } from "../constants/data";
import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import { bannerData } from "../constants/data";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { getMonitorsData, getProducts } from "../service/api";
import Slide from "./Slide";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../Redux/ProductSlice";
import { useDispatch, useSelector } from "react-redux";


const Container=styled(Box)`
    display:flex;
    margin: 55px 150px 0 160px;
    justify-content:space-between;
   
`;

const ItemConatiner=styled(Box)`
    padding:12px 8px;
    text-align:center;
    &:hover {
        cursor: pointer;
    }
`;


const Image=styled('img')`
    width:100%;
    height:280;
`;

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Home = () =>{

    // const[productData,setproductData]=useState([]);
    const productData=useSelector(state=>state.product.ProductData);

    const dispatch=useDispatch();

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         let data = await getMonitorsData();
        //         setproductData(data?.data);
        //         console.log(data?.data);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // };
        // fetchData();
        dispatch(fetchProduct());
        
    }, []);
   
    const navigate=useNavigate();

    const handleNavigate=()=>{
      navigate('/monitors');
    }

    return (


        <>
            <Container>
                {
                    navData.map(data=>(
                        <ItemConatiner onClick={()=>handleNavigate()}>
                            <img src={data.url} alt="nav" style={{width:64}} />
                            <Typography style={{fontSize:14,fontWeight:600}}>{data.text}</Typography>
                        </ItemConatiner>
                    ))
                    
                }
            </Container>
            <Carousel responsive={responsive} infinite={true}   swipeable={false}
  draggable={false} autoPlay={true}  containerClass="carousel-container" dotListClass="custom-dot-list-style"  itemClass="carousel-item-padding-40-px"  autoPlaySpeed={4000}>
                {
                    bannerData.map(data=>(
                        <Image src={data.url}/>
                    ))
                }
            </Carousel>
            <Slide productData={productData}/>
        </>
    )
}

export default Home;