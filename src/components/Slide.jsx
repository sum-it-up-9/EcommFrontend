import { Box, Typography,Button, styled, Divider } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";

const Conatiner=styled(Box)`
    background:#FFFFFF;
`;


const Component=styled(Box)`
    padding:15px 35px;
    display:flex;
    justify-content:space-between;
`;

const DealText=styled(Typography)`
    font-weight:600;
    font-size:22px;
`;

const Image=styled('img')({
    width:'auto',
    height:150
});
    
const Text=styled(Typography)`
    font-size:14px;
    margin-top:5px;
`;


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8
      },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Slide = ({productData}) => {
  const navigate=useNavigate();

  const handleNavigate=()=>{
    navigate('/monitors');
  }

  return (
    <>
    <Conatiner>
        <Component>
            <DealText>Deal of the Day</DealText>
            <Button onClick={()=>handleNavigate()} variant="contained" color="primary">View All</Button>
        </Component>
        <Divider/>
        <Carousel responsive={responsive} infinite={true}   swipeable={false}
  draggable={false} containerClass="carousel-container" dotListClass="custom-dot-list-style"  itemClass="carousel-item-padding-40-px"  autoPlaySpeed={4000}>
                {
                    productData.map(data=>(
                        <Link to={`/product/${data.id}`} key={data.id} style={{ textDecoration: 'none', color: 'inherit' }}> 
                          <Box textAlign="center" style={{padding:'25px 15px'}}>
                              <Image src={data?.url}/>
                              <Text style={{fontWeight:600, color:'#212121}'}}>{data?.title?.shortTitle}</Text>
                              <Text style={{color:'green'}}>{data?.discount}</Text>
                              <Text style={{color:'#212121}',opacity:'0.6'}}>{data?.tagline}</Text>
                          </Box>
                        </Link>
                    ))
                }
        </Carousel>
    </Conatiner>
    </>
  )
}

export default Slide;
