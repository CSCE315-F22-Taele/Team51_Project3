import Main from "./main";
import Basket from "./basket";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./pos.css";

/**
 * @function POSPage
 * @author Will
 * @returns display data for all menu items in the database, top-level controller for POS
 * Contains logic for adding/removing from a cart (basket)
 */
const POSPage = () => {
    const [menu, setMenu] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isColorBlind, setColorBlind] = useState(false);
    const [isEnlargeMenu, setEnlargeMenu] = useState(false);

    /**
     * Initialize a Revenue Entry for today's date on load
     * @author  Johnny
     */
    useEffect(() => {
        try {
            fetch("api/initialize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                },
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    // # # # # # # # # # # # # # # # # # # # # #
    // CONTROLS CSS SETTINGS FOR ACCESSIBILITY
    // # # # # # # # # # # # # # # # # # # # # #

    /**
     * @author Will
     * [toggleColorBlind] toggles the options for colorblind friendly color pallete
     */
    const toggleColorBlind = () => {
        setColorBlind(!isColorBlind);
    };


    /**
     * @author Margaret
     * [toggelEnlargeMenu] toggles the option for an enlarged menu
     */
    const toggleEnlargeMenu = () => {
        setEnlargeMenu(!isEnlargeMenu);
    }


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
            await fetch(`api/checkout/${id}`, {
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
        console.log(cartItems);
        cartItems.map((menuItem) =>
            menuItem.ingredients
                .split(",")
                .map((ingredient) =>
                    decreaseIngredientInventory(ingredient, menuItem.qty)
                )
        );
        alert("Thank you for your order!");
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

    // DYNAMIC MENU LOADING
    useEffect(() => {
        getMenu();
    }, []);

    /**
     * @author Will
     * @returns Normal color palette if the user has not selected colorblind option,
     *  colorblind scheme if they have
     */
    return isColorBlind ? (
        <div className="pos">
            <Navbar></Navbar>
            <div className="pos__box">
                <div className="pos__container">
                    <div className={isEnlargeMenu? "menu-englarge-menu" : "menu"}>
                    <Main onAdd={onAdd} menu={menu} isColorBlind={isColorBlind}></Main>
                    </div>
                    <Basket
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onCheckout={onCheckout}
                        cartItems={cartItems}
                    ></Basket>
                </div>
                <div className="dropdown__container">
                    <Dropdown
                        trigger={
                            <button className="dropdown">
                                <img
                                    className="dropImage"
                                    src="settings.png"
                                    alt="Settings"
                                ></img>
                            </button>
                        }
                        menu={[
                            <button onClick={toggleColorBlind}>Colorblind Mode</button>,
                            <button onClick={toggleEnlargeMenu}>Enlarge Menu</button>,
                            <button>Default</button>,
                        ]}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className="posColorBlind">
            <Navbar></Navbar>
            <div className="pos__box">
                <div className="pos__container">
                    <div className={isEnlargeMenu? "menu-englarge-menu" : "menu"}>
                    <Main onAdd={onAdd} menu={menu}></Main>
                    </div>
                    <Basket
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onCheckout={onCheckout}
                        cartItems={cartItems}
                    ></Basket>
                </div>
                <div className="dropdown__container">
                    <Dropdown
                        trigger={
                            <button className="dropdown">
                                <img
                                    className="dropImage"
                                    src="settings.png"
                                    alt="Settings"
                                ></img>
                            </button>
                        }
                        menu={[
                            <button onClick={toggleColorBlind}>Colorblind Mode</button>,
                            <button onClick={toggleEnlargeMenu}> Enlarge Menu</button>,
                            <button>Default</button>,
                        ]}
                    />
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
