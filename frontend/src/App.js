import React from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar"
// import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import POSPage from "./pages/POSPage";
import ManagerMenu from "./pages/ManagerMenu/ManagerMenu";
import Inventory from "./pages/ManagerPages/Inventory";
import OrderHistory from "./pages/ManagerPages/OrderHistory";
import Excess from "./pages/ManagerPages/Excess";
import Pair from "./pages/ManagerPages/Pair";
import Restock from "./pages/ManagerPages/Restock";

const isAuth = true;

const PrivateRoutes = () => {
    return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
    return <>{!isAuth ? <Outlet /> : <Navigate to="/POSPage" />}</>;
};

export default function App() {
    return (
        <Router>
            { (isAuth) ? <Navbar /> : null }
            <Routes>
                <Route exact path="/" element={<Login />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/POSPage" element={<POSPage />} />
                    <Route path="/ManagerPage" element={<ManagerMenu />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/OrderHistory" element={<OrderHistory />} />
                    <Route path="/Excess" element={<Excess />} />
                    <Route path="/Pair" element={<Pair />} />
                    <Route path="/Restock" element={<Restock />} />
                </Route>
                <Route element={<RestrictedRoutes />}>
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </Router>
    );
}
