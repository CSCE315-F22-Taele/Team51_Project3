import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./managerPages.css";

export default function EditMenu() {
    const [menu, setMenu] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.0);
    const [ingredients, setIngredients] = useState([]);
    const [png, setPNG] = useState("");
    const [options, setOptions] = useState([]);
    const [id, setID] = useState(0);
    const [idChecker, setIDChecker] = useState([]);
    const [ingredientList, setIngredientList] = useState([]);
    const [idRemove, setIdRemove] = useState();
    const [saveError, setError] = useState();
    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(15); //for inc and dec font size

    /**
     * Sends a HTTP get for all menu items, then gets all ids for data validation
     * @author  Joshua
     */
    async function getMenu() {
        try {
            const res = await fetch("api/menuManager");
            const data = await res.json();
            setMenu(data);
            var idList = [];

            for (let i = 0; i < data.length; i++) {
                idList.push(data[i]["id"]);
            }
            // const idList = data['id']
        } catch (err) {
            console.error(err);
        }
        idList.sort();
        //console.log(idList);
        setIDChecker(idList);
        setID(idList[idList.length - 1] + 1);
        return idList;
    }
    /**
     * Sends a HTTP put request with new order into the menu
     * @author  Joshua
     * @param   {string} category is the inputed label of the items, entree, dessert, or drink
     * @param   {string} name is the item name
     * @param   {float} price is the manager set price
     * @param   {string} ingredients is the string of item ids that represent the order
     * @param   {string} options are the functioning number of editable items
     * @param   {int} id is the items unique id
     */
    async function addMenuItem(id) {
        // If ID already exists
        if (idChecker.includes(id)) {
            setID(idChecker[idChecker.length - 1] + 1);
        }
        try {
            let res = await fetch("api/menuManager/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                },
                body: JSON.stringify({
                    category: category,
                    name: name,
                    price: parseFloat(price),
                    ingredients: ingredients,
                    png: png,
                    options: options,
                    id: parseInt(id),
                }),
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }

    /**
     * Send HTTP request to delete the item in the Database
     * @author  Joshua
     */
    async function removeMenuById() {
        try {
            await fetch("api/menuManager/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE",
                },
                body: JSON.stringify({
                    idRemove: parseInt(idRemove),
                }),
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    /**
     * Sends a HTTP get request for all ingredients to then display in the dropdown menu
     * @author  Joshua
     */
    async function getInventory() {
        try {
            const res = await fetch("api/inventory");
            const data = await res.json();
            setIngredientList(data);
        } catch (err) {
            console.error(err);
        }
    }

    // event returns a list of ids from the menu to error check with the user
    useEffect(() => {
        getInventory();
        getMenu();
        checkOptionsInIDs();
    }, []);

    const checkOptionsInIDs = () => {
        for (
            let ingredientIndex = 0;
            ingredientIndex < ingredients.length;
            ingredientIndex++
        ) {
            for (let index = 0; index < options.length; index++) {
                if (!ingredients.includes(options[index])) {
                    ingredients.push(options[index]);
                }
            }
        }
    };

    /**
     * Parses List of Ingredient ID to Readable Strings
     * @author  Joshua, Johnny
     */
    const parseIDToString = (array, list) => {
        var readableList = [];
        array.forEach((id, i) => {
            readableList.push(list.find((o) => o.id === id).name);
        });

        return readableList;
    };

    const displayInfo = menu.map((item) => {
        return (
            <tr>
                <td style={{ fontSize: `${fontSize}px` }}>{item.category}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.id}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.name}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.price}</td>
                <td style={{ fontSize: `${fontSize}px` }}>
                    {item.ingredients.toString()}
                </td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.options ? item.options.toString() : ""}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.png}</td>
            </tr>
        );
    });
    const displayDropDown = ingredientList.map((inventory) => {
        return <option value={inventory.id}> {inventory.name}</option>;
    });
    return (
        <div className="edit-menu-page manager-page">
            <div className="edit-menu-topbar">
                <div className="back__container">
                    <button
                        onClick={() => {
                            navigate("/managermenu");
                        }}>
                        <img
                            className="backbutton"
                            src={require("../../images/backbutton.png")}
                            alt="back"></img>
                    </button>
                </div>
                <div className="edit-menu-accessibility">
                    <button className="button" onClick={() => setFontSize(fontSize + 2)}>
                        + Font Size
                    </button>
                    <button className="button" onClick={() => setFontSize(fontSize - 2)}>
                        - Font Size
                    </button>
                </div>
            </div>
            <div className="edit-menu-table">
                <table className="edit-menu-table styled-table">
                    <thead>
                        <tr>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Category</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Id</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Name</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Price</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Ingredients</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Options</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>PNG</th>
                        </tr>
                    </thead>
                    <tbody>{displayInfo}</tbody>
                </table>
            </div>
            <div className="edit-menu-actions">
                <div className="edit-menu-actions--create">
                    <form
                        className="edit-menu-actions__container"
                        onSubmit={(event) => {
                            addMenuItem(id);
                            // setIngredients((newArray) => [...newArray, event.target.value]);
                            // setOptions((newArray) => [...newArray, event.target.value]);
                            // parseIDToString();
                        }}>
                        {/* now we plan to dive into what is the hell that is checking user inputs and preventing stupid ones */}

                        <select
                            className="edit-menu-actions--input"
                            placeholder="Category"
                            onChange={(event) => {
                                setCategory(event.target.value);
                                console.log(event.target.value);
                            }}>
                            <option value="entree"> Entree </option>
                            <option value="dessert"> Dessert </option>
                            <option value="drink"> Drink </option>
                        </select>
                        <input
                            className="edit-menu-actions--input"
                            type="number"
                            placeholder="ID"
                            onChange={(event) => {
                                setID(event.target.value);
                            }}
                        />
                        <input
                            className="edit-menu-actions--input"
                            type="string"
                            placeholder="Item Name"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <input
                            className="edit-menu-actions--input"
                            type="float"
                            placeholder="Price"
                            onChange={(event) => {
                                if (event.target.value >= 0) {
                                    setPrice(event.target.value);
                                } else {
                                    setPrice(0.0);
                                }
                            }}
                        />
                        <p className="edit-menu-actions--header">Select Ingredients</p>
                        <select
                            className="edit-menu-actions--input"
                            onChange={(event) => {
                                var initalizeIngredients = true;
                                if (initalizeIngredients) {
                                    setIngredients((newArray) => [
                                        ...newArray,
                                        parseInt(event.target.value),
                                    ]);
                                    initalizeIngredients = false;
                                } else if (!ingredients.includes(event.target.value)) {
                                    setIngredients((newArray) => [
                                        ...newArray,
                                        parseInt(event.target.value),
                                    ]);
                                }
                            }}>
                            {displayDropDown}
                        </select>
                        <div className="edit-menu-actions--info">
                            {parseIDToString(ingredients, ingredientList).toString()}
                        </div>
                        <p className="edit-menu-actions--header">Select Options</p>
                        <select
                            className="edit-menu-actions--input"
                            onChange={(event) => {
                                var initalizeOptions = true;
                                if (initalizeOptions) {
                                    setOptions((newArray) => [
                                        ...newArray,
                                        parseInt(event.target.value),
                                    ]);
                                    initalizeOptions = false;
                                } else if (!options.includes(event.target.value)) {
                                    setOptions((newArray) => [
                                        ...newArray,
                                        parseInt(event.target.value),
                                    ]);
                                }
                                // console.log(options)
                            }}>
                            {displayDropDown}
                        </select>
                        <div className="edit-menu-actions--info">
                            {parseIDToString(options, ingredientList).toString()}
                        </div>
                        <input
                            className="edit-menu-actions--input"
                            type="string"
                            placeholder="PNG File Name"
                            onChange={(event) => {
                                setPNG(event.target.value);
                            }}></input>
                        <button className="button">Add New Menu Item</button>
                        <button
                            className="button"
                            onClick={() => {
                                ingredients.length = 0;
                                options.length = 0;
                            }}>
                            Clear presets
                        </button>
                    </form>
                </div>
                <div className="edit-menu-actions--remove">
                    <form
                        className="edit-menu-actions__container"
                        onSubmit={(event) => {
                            removeMenuById();
                        }}>
                        <input
                            className="edit-menu-actions--input"
                            type="number"
                            placeholder="ID"
                            onChange={(event) => {
                                setIdRemove(event.target.value);
                            }}
                        />
                        <button className="button">Remove Menu Item</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
