//import { cardActionAreaClasses } from '@mui/material';
import Header from "./../components/cart/header";
import Main from "./../components/cart/main";
import Basket from "./../components/cart/basket";
import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";

const POSPage = () => {
    const [menu, setMenu] = useState([]);
    const [cartItems, setCartItems] = useState([]);

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

    //DYNAMIC MENU LOADING
    useEffect(() => {
        getMenu();
    }, []);

    async function getMenu() {
        try {
            const res = await fetch("api/pos");
            const data = await res.json();
            setMenu(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Layout>
                <Header countCartItems={cartItems.length}></Header>
                <div className="row">
                    <Main onAdd={onAdd} menu={menu}></Main>
                    <Basket
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartItems={cartItems}></Basket>
                </div>
            </Layout>
        </div>
    );
};

export default POSPage;
