import Main from "./main";
import Basket from "./basket";
import React, { useEffect, useState } from "react";

import "./pos.css";
import Navbar from "../../components/navbar/navbar";

const POSPage = () => {
    const [menu, setMenu] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    //const [ingredientData, setIngredientData] = useState([]);

    //CART ADD/REMOVE
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };

    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };

    /*async function getIngredient(id) {
        try {
            const res = await fetch(`api/inventory/${id}`);
            const data = await res.json();
            setIngredientData(data);
        } catch (err) {
            console.error(err);
        }
    }*/

    async function decreaseIngredientInventory(id, quantity) {
        try {
            const res = await fetch(`api/checkout/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PATCH",
                },
                body: JSON.stringify({ quantity: parseInt(quantity) }),
            });
        } catch (err) {
            console.error(err);
        }
    }

    const onCheckout = () => {
        cartItems.map((menuItem) =>
            menuItem.ingredients.split(",").map(
                (ingredient) => decreaseIngredientInventory(ingredient, menuItem.qty)
                //console.log(menuItem.qty)
            )
        );
        alert("Thank you for your order!");
        window.location = "/";
    };

    // DYNAMIC MENU LOADING
    useEffect(() => {
        getMenu();
    }, []);

    async function getMenu() {
        try {
            const res = await fetch("api/pos");
            const data = await res.json();
            setMenu(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="pos">
            <Navbar></Navbar>
            <div className="pos__box">
                <div className="pos__container">
                    <Main onAdd={onAdd} menu={menu}></Main>
                    <Basket
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onCheckout={onCheckout}
                        cartItems={cartItems}
                    ></Basket>
                </div>
            </div>
        </div>
    );
};

export default POSPage;
