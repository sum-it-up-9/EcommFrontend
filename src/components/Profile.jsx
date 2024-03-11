import { Typography, Menu, MenuItem, Box  } from "@mui/material"
import { useContext, useState } from "react";
import { clearCart } from "../Redux/CartSlice";
import { useDispatch } from "react-redux";
import { DataContext } from "../context/DataProvider";
import {useNavigate} from 'react-router-dom';
import {  toast } from 'react-toastify';

const Profile = ({account}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
     const [open,setOpen]=useState(false);
     const {setUserDeatils,setAccount}=useContext(DataContext); 
     const handleClick=(event)=>{
        setOpen(event.currentTarget);
    }

    const handleClose=(event)=>{
        setOpen(false);
        setAccount('');
        setUserDeatils({});
        dispatch(clearCart());
        localStorage.removeItem('accessToken');
        toast.success('Logout sucess!');
        navigate('/');
    }

  return (
    <>
        <Box onClick={handleClick}>
            <Typography style={{marginTop:5,marginRight:80}}>{account}</Typography>
        </Box>
        <Menu
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
       
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        
      </Menu>      
    </>
  )
}

export default Profile;

