import React from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar"
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register"
import POSPage from "./pages/POSPage";
import ManagerMenu from "./pages/ManagerMenu/ManagerMenu";
import Inventory from "./pages/ManagerPages/Inventory";
import OrderHistory from "./pages/ManagerPages/OrderHistory";
import Excess from "./pages/ManagerPages/Excess";
import Pair from "./pages/ManagerPages/Pair";
import Restock from "./pages/ManagerPages/Restock";
import Revenue from "./pages/ManagerPages/Revenue";

import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
  }
  
  const RestrictedRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return <>{!isAuth ? <Outlet /> : <Navigate to='/POSPage' />}</>
  }

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/POSPage" element={<POSPage />} />
                    <Route path="/ManagerPage" element={<ManagerMenu />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/OrderHistory" element={<OrderHistory />} />
                    <Route path="/Excess" element={<Excess />} />
                    <Route path="/Pair" element={<Pair />} />
                    <Route path="/Restock" element={<Restock />} />
                    <Route path="/Revenue" element={<Revenue />} />
                </Route>
                <Route element={<RestrictedRoutes />}>
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App
