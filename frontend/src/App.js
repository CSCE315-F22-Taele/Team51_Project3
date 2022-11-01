import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import POSPage from "./pages/POSPage";
import ManagerMenu from "./pages/ManagerMenu/ManagerMenu";
import Inventory from "./pages/ManagerPages/Inventory";
import OrderHistory from "./pages/ManagerPages/OrderHistory";
import Excess from "./pages/ManagerPages/Excess";
import Pair from "./pages/ManagerPages/Pair";
import Restock from "./pages/ManagerPages/Restock";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/POSPage" element={<POSPage />} />
        <Route path="/ManagerPage" element={<ManagerMenu />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/Excess" element={<Excess />} />
        <Route path="/Pair" element={<Pair />} />
        <Route path="/Restock" element={<Restock />} />
      </Routes>
    </Router>
  );
}

export default App;
