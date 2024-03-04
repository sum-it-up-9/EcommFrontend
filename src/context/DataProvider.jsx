import { createContext, useState } from "react";


export const DataContext=createContext(null);



const DataProvider = ({children}) => {

  const [account,setAccount]=useState('');
  const [userDetails,setUserDeatils]=useState({});
  const [open,setOpen]=useState(false);
 
  const openLoginDialog=()=>{
    setOpen(true);
  }
  return (
    <DataContext.Provider value={{
        account,
        setAccount,
        userDetails,
        setUserDeatils,
        open,
        setOpen,
        openLoginDialog
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;
