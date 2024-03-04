import { Box,styled,Typography,Divider } from "@mui/material";
import { LocalOffer as Badge } from '@mui/icons-material';

const Conatainer=styled(Box)`
    display:flex;
    justify-content:space-between;
    Padding-top:40px;
    flex-wrap:wrap;
`;

const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`
const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;

const ProductSpecs=styled(Box)`
    flex-basis: 40%;
`;

const PriceContainer=styled('Box')`
  flex-basis:20%;
  font-weight:bold;
  font-size:24px;
`
const ImageContainer=styled(Box)`
  flex-basis:25%;
  padding-left:20px;

  
`

const ProductView = ({MonitorData}) => {
  return (
    <>
      <Conatainer>
        <ImageContainer>
          <img  src={MonitorData?.url} alt="desktops"/>
        </ImageContainer>
        <ProductSpecs>
          <Typography>{MonitorData?.title?.longTitle}</Typography>
          <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
            <span style={{backgroundColor:'#388e3c',color:'#fff',fontSize:'11px',height:'17px',width:'40px',display: 'inline-block',textAlign:'center',marginRight:'8px',borderRadius:'6px'}}>
              {MonitorData.rating} ★</span>
            8 Ratings & 1 Reviews</Typography>
          
          <SmallText>
            {
              MonitorData.specifications.map((data,index)=>{
                return <Typography key={index}><StyledBadge />{data}</Typography>
              })
            }
          </SmallText>
        </ProductSpecs>

        <PriceContainer>
        ₹{MonitorData.price.cost}
        </PriceContainer>

      </Conatainer>
      <Divider/>
    </>
  )
}

export default ProductView;
