import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Layout from "../components/base/Layout";
import Detail from "../pages/product/detail";
import Profile from "../pages/user/profile";
import Cart from "../pages/cart";
import Transaction from "../pages/transaction";

const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<Detail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="transaction" element={<Transaction />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRoutes;
  