import React from "react";
import { useSelector } from "react-redux";
import "./index.css";
import Product from "./Product";

const Main = (props) => {
    const { menu, onAdd } = props;
    const { type } = useSelector((state) => state.auth);
    const userType = type["type"];

    return (
        <main className="menu">
            <div className={userType === "user" ? "menu__container m__c-user_ver" : "menu__container"}>
                {menu.map((product) => (
                    <Product key={product.id} product={product} onAdd={onAdd}></Product>
                ))}
            </div>
        </main>
    );
};

export default Main;
