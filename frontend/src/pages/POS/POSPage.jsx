import Main from "./main";
import Basket from "./basket";
import React, { useEffect, useState } from "react";
//import "./colorblindPOS.css"
//import "./pos.css";
import Navbar from "../../components/navbar/navbar";

/**
 * @function POSPage
 * @author Will
 * @returns display data for all menu items in the database, top-level controller for POS
 * Contains logic for adding/removing from a cart (basket)
 */
const POSPage = () => {
    const [menu, setMenu] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [stylePath, setStylePath] = useState("pos.css");

    //CART ADD/REMOVE
    /**
     * 
     * @param product same as a row in the menu table in database
     * @author Will
     * [onAdd] adds an item into the basket for checkout, increments quantity if already in cart
     */
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

    /**
     * 
     * @param product same as a row in the menu table in database
     * @author Will
     * [onRemove] decrements quantity of an item from the basket by 1,
     * removes item if the quanity is 1
     */
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

    /**
     * 
     * @param id the id of an ingredient in the database
     * @param quantity quantity of the ingredient to be removed from database (# of menu items containing that ingredient)
     * @author Will
     * [decreaseIngredientInventory] decreases the inventory of the ingredient given by id by quantity
     */
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

    /**
     * 
     * @author Will
     * [onCheckout] call [decreaseIngredientInventory] for all ingredients per item in cart when checkout button pressed, takes user back to home page
     */
    const onCheckout = () => {
        cartItems.map((menuItem) =>
            menuItem.ingredients.split(",").map(
                (ingredient) => decreaseIngredientInventory(ingredient, menuItem.qty)
            )
        );
        alert("Thank you for your order!");
        window.location = "/";
    };

    /**
     * @author Will
     * [getMenu] gets data to display all menu items
     */
    async function getMenu() {
        try {
            const res = await fetch("api/pos");
            const data = await res.json();
            setMenu(data);
            //console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    // # # # # # # # # # # # # # # # # # # # # #
    // CONTROLS CSS SETTINGS FOR ACCESSIBILITY
    // # # # # # # # # # # # # # # # # # # # # #

    /**
     * @author Will
     * [setColorBlindMode]
     * Changes stylesheet to colorblind friendly palette
     */
     const setColorBlindMode = () => {
        setStylePath("colorblindPOS.css");
    };

    const setDefaultMode = () => {
        setStylePath('pos.css');
    }


    /**
     * @author Margaret
     * [setFontZoom]
     * edit this as you need
     */
    const setFontZoom = () => {
    };

    // DYNAMIC MENU LOADING
    useEffect(() => {
        getMenu();
        //for changing stylesheets
        var head = document.head;
        var link = document.createElement("link");

        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "/" + stylePath;

        head.appendChild(link);

        return () => { head.removeChild(link); }
        
        
    }, [stylePath]);

    return (
        <div className="pos">
            <Dropdown
                trigger={<button className="dropdown"><img className="dropImage" src="settings.png" alt="Settings"></img></button>}
                menu={[
                    <button onClick={setColorBlindMode}>Colorblind Mode</button>,
                    <button onClick={setFontZoom}>Font Zoom</button>,
                    <button onClick={setDefaultMode}>Default</button>
                ]}
            />
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

// # # # # # # # # # # # # # # # # # # # # #
// CONTROLLER FOR THE SETTINGS DROPDOWN MENU
// Shouldn't need to modify this
// # # # # # # # # # # # # # # # # # # # # #
const Dropdown = ({ trigger, menu }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
            {React.cloneElement(trigger, {
                onClick: handleOpen,
            })}
            {open ? (
                <ul className="droptext">
                    {menu.map((menuOption, index) => (
                        <li key={index}>
                            {React.cloneElement(menuOption, {
                                onClick: () => {
                                    menuOption.props.onClick();
                                    setOpen(false);
                                },
                            })}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default POSPage;
