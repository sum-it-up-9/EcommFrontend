import styled from "@emotion/styled";
import { Dialog,Box, Button,TextField,Typography } from "@mui/material"
import { useState, useContext } from "react";
import { authenticateSignup, authenticateLogin } from "../service/api";
import { DataContext } from "../context/DataProvider";


const Container=styled(Box)`
    height:60vh;
    width:90vh;
    display:flex;
`;

const Image=styled(Box)`
    height:82%;
    background:#2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width:40%;
    padding:45px 35px;
    & > p,& >h5{
        color:white;
        font-weight:600;
    }
`;

const LoginContainer=styled(Box)`
    display:flex;
    flex-direction:column;
    padding:45px 35px;
    & > div, & > button, &>p{
         margin-Top:20px
    }
`;


const LoginBtn=styled(Button)`
&&{
  background: #FB641B;
  color:#fff;
  height:48px;
}
&:hover {
  background: #fb641b; /* Change the background color on hover */
}
`;

const LoginGuestBtn=styled(Button)`
&& {
  background: #222b49;
  color: white;
  height: 48px;
  text-decoration: underline;

  &:hover {
    background: #3f51b5; /* Change the background color on hover */
  }
}
  
`;

const Text=styled(Typography)`
    font-size:14px;
`;

const NewToCart=styled(Typography)`
    text-align:center;
    font-weight:600;
    cursor:pointer;
    color:#2874f0;
`;

const signupObj={
  email:"",
  firstName:"",
  lastName:"",
  password:""
};

const loginObj={
  email:"",
  password:""
};

const Error=styled(Typography)`
  color:#ff6161;
  margin-top:10px;
  font-size:11px;
  line-height:0;
`;

const LoginDialog = () => {

  const {account, setAccount,open,setOpen,openLoginDialog, userDetails, setUserDeatils}=useContext(DataContext);
 

  const handleClose=()=>{
    setOpen(false);
    setLogin(true);
    setError(false);
  }
  const [login,setLogin]=useState(true);

  const handleLogin=()=>{
    setLogin(prev=>!prev);
  }

  const [signup,setSignup]=useState(signupObj);
  const [loginval,setLoginval]=useState(loginObj);
  const[error,setError]=useState(false);

  const OnInputChange=(e)=>{
    //e.target.name is bvariable, so use bracket notation to set object's property
    setSignup({...signup,[e.target.name]:e.target.value});
  }

  const OnLoginInputChange=(e)=>{
    //e.target.name is bvariable, so use bracket notation to set object's property
    setLoginval({...loginval,[e.target.name]:e.target.value});
  }


  const SignUpUser=async ()=>{
    console.log(signup);
    let res=await authenticateSignup(signup);
    if(!res) return;
    handleClose();
    setAccount(res?.data?.Userdata?.firstName) ; 
   
   // console.log(account);
  }

  const LoginUser=async ()=>{
    let res=await authenticateLogin(loginval);
    if(res.status===200){
      const accessToken = res.data.accessToken; // Assuming the access token is returned from the API response
      localStorage.setItem('accessToken', accessToken); // Store the access token in localStorage
      setAccount(res?.data?.Userdata?.firstName);
      setUserDeatils(res?.data?.Userdata);
      handleClose();
      console.log('userDetails',res?.data?.Userdata);
    }
    else{
      setError(true);
    }
   
  }

  const LoginAsGuest = async () =>{
    let res=await authenticateLogin({email:'sumitadsul9@gmail.com',password:'3232ewef'});
    console.log(res,'r');
    if(res.status===200){
      const accessToken = res.data.accessToken; // Assuming the access token is returned from the API response
      localStorage.setItem('accessToken', accessToken); // Store the access token in localStorage
      setAccount(res?.data?.Userdata?.firstName);
      setUserDeatils(res?.data?.Userdata);
      handleClose();
      console.log('userDetails',res?.data?.Userdata);
    }
    else{
      setError(true);
    }
  }
  
  return (
    <>
      <Dialog open={open}  onClose={()=>handleClose()} PaperProps={ {sx:{maxWidth:'unset'}}}>
        <Container>
            <Image>
                <Typography variant="h5">Login</Typography>
                <Typography style={{marginTop:20}}>Get access to your Orders, Wishlist and Recommendation</Typography>
            </Image>
            {
              login===true?
                <LoginContainer>
                  <TextField variant="standard" label="Enter Email" name="email" onChange={(e)=>OnLoginInputChange(e)}></TextField>
                  <TextField variant="standard" label="Enter Password"  name="password" onChange={(e)=>OnLoginInputChange(e)}></TextField>
                  {
                    error && <Error>Please enter valid email or pasword</Error>
                  }
                  <Text>By continuing, you agree to Terms of Use and Privacy policy</Text>
                  <LoginGuestBtn onClick={()=>{LoginAsGuest()}}>Login As Guest</LoginGuestBtn>
                  <LoginBtn onClick={()=>{LoginUser()}}>Login</LoginBtn>    
                  <NewToCart onClick={()=> handleLogin()}>New to Cart? Create an account</NewToCart>
                </LoginContainer>
              :
              <LoginContainer>
                <TextField variant="standard" label="Enter Email" name="email" onChange={(e)=>OnInputChange(e)}></TextField>
                <TextField variant="standard" label="Enter First Name" name="firstName" onChange={(e)=>OnInputChange(e)}></TextField>
                <TextField variant="standard" label="Enter Last Name" name="lastName" onChange={(e)=>OnInputChange(e)}></TextField>
                <TextField variant="standard" label="Enter Password" name="password" onChange={(e)=>OnInputChange(e)}></TextField>
                <Text>By continuing, you agree to Terms of Use and Privacy policy</Text>
                
                <LoginBtn onClick={()=>SignUpUser()}>SignUp</LoginBtn>    
                <NewToCart onClick={()=> handleLogin()}>Already registred? Login</NewToCart>
            
              </LoginContainer>
            }
           
        </Container>
      </Dialog>
    </>
  )
}

export default LoginDialog
