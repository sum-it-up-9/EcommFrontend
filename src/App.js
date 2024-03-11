import {Box} from "@mui/material";
import Home from './components/Home'
import Header from './components/Header.jsx';
import DataProvider from "./context/DataProvider";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import DetailsView from "./components/ProdcutDetails/DetailsView";
import ProductList from "./components/Search/ProductList";
import Cart from "./components/Cart/Cart";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Order from "./components/Order.jsx";
import PrivatRoute from "./components/Privatroute.jsx";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header/>
        <Box style={{marginTop:64}}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/product/:id" element={<DetailsView/>} />
            <Route path="/monitors" element={<ProductList/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<PrivatRoute component={<Order/>}/>} />
          </Routes>
        </Box>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"

        />
    </DataProvider>
  );
}

export default App;
