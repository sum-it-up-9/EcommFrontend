
import styled from "@emotion/styled";
import { AppBar,List, Toolbar,Box, InputBase,Button,Typography,Badge,ListItem } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LoginDialog from "./LoginDialog";
import { useState,useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BoxStyled=styled(Box)`
    margin-left:12%;
`;
const Searchbox=styled(Box)`
    background:#fff;
    width:38%;
    border-radius:2px;
    margin-left:  10px;
    display:flex;
`;

const InputSearchBox=styled(InputBase)`
    width:100%;
    padding-left:10px;
`;

const SearchIconBox=styled(Box)`
    color:gray;
    padding:5px;
`;

const Container = styled(Box)`
    display:flex;
    margin-left:7%;
    & > button, & > p, & div{
        margin-right:30%;
        align-items:center;
        
    }
`;

const IconContainer=styled(Box)`
    display:flex;
    margin-top:5px;
    margin-left:30px;
`;

const ButtonStyled=styled(Button)`
    text-transform:none;
    color:#2874f0;
    background:#fff;
    padding:5px 70px;
    border-radius:2px;
    box-shadow:none;
    font-weight:600;
`;
const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
 
 
  background: lightgray;
  margin-top: 48px;
`;

const Header = () => {
    const url="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
    // const [open,setOpen]=useState(false);
    const {account,openLoginDialog}=useContext(DataContext); 
    const [searchText,setSearchText]=useState('');
    const [ open, setOpen ] = useState(true)
    
    const productData=useSelector(state=>state.product.ProductData)
    
   
       // const openLoginDialog=()=>{
    //     setOpen(true);
    // }

   
    const fetchSearchResults = (e) =>{
        
    }

    const handleSrachChange=(e)=>{
        setSearchText(e.target.value);
        setOpen(false)
    }

    const {cartItems}=useSelector(state=>state.cart);

    return(
        <AppBar>
            <Toolbar>
                <BoxStyled>
                    <img src={url} alt="FlipkartLogo" style={ {width: 75}} />
                </BoxStyled>
                <Searchbox>
                    <SearchIconBox onClick={(e)=>fetchSearchResults(e)}><SearchIcon/></SearchIconBox>  
                    <InputSearchBox placeholder="Search for products, brands and more"    onChange={(e)=>handleSrachChange(e)} />
                    {
                    searchText &&
                    <ListWrapper hidden={open}>
                        {
                            productData.filter((product,index)=>{
                                return product.title.longTitle.toLowerCase().includes(searchText.toLowerCase());
                            }).map((product,index)=>{
                                return <ListItem key={index}>
                                    <Link  to={`/product/${product.id}`}  style={{ textDecoration:'none', color:'inherit'}} onClick={() => setOpen(true)}     >
                                        {product.title.longTitle}
                                    </Link>
                                </ListItem>
                            })
                        }
                    </ListWrapper>
                }
                </Searchbox>
               
                <Container>

                    {
                        account? <Profile account={account}/>
                        : 
                        <ButtonStyled variant="contained" onClick={()=> openLoginDialog()}>LOGIN</ButtonStyled>


                    }
                   
                    <Link to={'/monitors'} style={{ textDecoration: 'none', color: 'inherit',marginRight:'5px' }}>
                        <Typography style={{marginTop:5}}>Products</Typography>
                    </Link>

                    <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <IconContainer>
                            <ShoppingCartIcon />
                            <Typography>Cart</Typography>
                            <Badge style={{ marginLeft: 20 }} badgeContent={cartItems?.length} color="secondary"></Badge>
                        </IconContainer>
                    </Link>
                   

                </Container>
                <LoginDialog />
            </Toolbar>
        </AppBar>
    )
}

export default Header;