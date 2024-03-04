import axios from 'axios';

const url='http://localhost:8000';

export const authenticateSignup = async (data)=>{
    try{
        console.log(data);
        return await axios.post(`${url}/signup`,data);
    }catch(error){
        console.log('error while calling singUp api: ',error);
    }
 }


 
export const authenticateLogin = async (data)=>{
    try{
        console.log(data);
        return await axios.post(`${url}/login`,data);
    }catch(error){
        console.log('error while calling login api: ',error);
        return error.response;
    }
 }
 

 export const getProducts=async ()=>{
    try{
        return  await axios.get(`${url}/products`);
    }catch(error){
        console.log('error while calling getProduct api: ',error);
        return error.response;
    }
 }

 export const getProductData=async (id)=>{
    try{
        return await axios.get(`${url}/products/${id}`)
    }catch(error){
        console.log('error while calling ProductDetails api: ',error);
        return error.response;
    }
 }

 export const getMonitorsData=async ()=>{
    try{
        return  await axios.get(`${url}/monitors`);
    }catch(error){
        console.log('error while calling getMonitorsData api: ',error);
        return error.response;
    }
 }
 

 export const pay = async (data) =>{
    try{
        let res=await axios.post(`${url}/payment`,data);
        return res.data;
    }catch(error){
        console.log('error while calling payments apis',error.response);
    }
 }