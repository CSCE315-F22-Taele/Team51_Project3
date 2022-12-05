import React from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import POSPage from "./pages/POS/POSPage";
import ManagerMenu from "./pages/ManagerMenu/ManagerMenu";
import Inventory from "./pages/ManagerPages/Inventory";
import OrderHistory from "./pages/ManagerPages/OrderHistory";
import Excess from "./pages/ManagerPages/Excess";
import Pair from "./pages/ManagerPages/Pair";
// import Restock from "./pages/ManagerPages/Restock";
import Revenue from "./pages/ManagerPages/Revenue";
import EditMenu from "./pages/ManagerPages/EditMenu";

import { useSelector } from "react-redux";
import { LoginSuccess } from "./containers/Login/google";

const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);
    return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};
const ManagerRoutes = () => {
    const { type } = useSelector((state) => state.auth);
    
}
const RestrictedRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);
    return <>{!isAuth ? <Outlet /> : <Navigate to="/pospage" />}</>;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/POSPage" element={<POSPage />} />
                    <Route path="/ManagerMenu" element={<ManagerMenu />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/OrderHistory" element={<OrderHistory />} />
                    <Route path="/Excess" element={<Excess />} />
                    <Route path="/Pair" element={<Pair />} />
                    <Route path="/Revenue" element={<Revenue />} />
                    <Route path="/EditMenu" element={<EditMenu />} />
                </Route>
                <Route element={<RestrictedRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/login/success" element={LoginSuccess()} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
