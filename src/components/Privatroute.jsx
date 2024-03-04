import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const Privatroute = ({component}) => {

    const {account,setAccount}=useContext(DataContext);

  return (
    <>
      {
        account? <component/> : alert('You need to Log IN') 
      }
    </>
  )
}

export default Privatroute
