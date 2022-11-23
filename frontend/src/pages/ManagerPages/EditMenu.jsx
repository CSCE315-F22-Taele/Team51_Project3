import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

export default function EditMenu() {
    const [menu, setMenu] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.0);
    const [ingredients, setIngredients] = useState("");
    const [png, setPNG] = useState("");
    const [options, setOptions] = useState("");
    const [id, setID] = useState(0);
    const [idChecker, setIDChecker] = useState([]);
    const [ingredientList, setInventory] = useState([]);
    const [idRemove, setIdRemove] = useState();
    const [saveError, setError] = useState();
    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(16); //for inc and dec font size

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
        if (!id) {
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
                    ingredients: JSON.stringify(ingredients),
                    png: png,
                    options: JSON.stringify(options),
                    id: parseInt(id),
                }),
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }
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
            setInventory(data);
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
    // makes the options human readable
    const displayChoice = () => {
        var ingredientReturn = "Return ingredients: ";
        checkOptionsInIDs();
        for (let index = 0; index < ingredientList.length; index++) {
            for (
                let ingredientIndex = 0;
                ingredientIndex < ingredients.length;
                ingredientIndex++
            ) {
                //console.log(ingredientList[index]['id'])
                //console.log(menu[index]['id'])
                // console.log(parseInt(ingredients[ingredientIndex]) == parseInt(ingredientList[index]['id']))
                if (
                    parseInt(ingredients[ingredientIndex]) ===
                    parseInt(ingredientList[index]["id"])
                ) {
                    ingredientReturn += ingredientList[index]["name"] + " ";
                }
            }
        }
        return ingredientReturn;
    };
    // makes the options human readable
    const displayOptions = () => {
        var optionsReturn = "Options are: ";
        for (let index = 0; index < ingredientList.length; index++) {
            for (
                let ingredientIndex = 0;
                ingredientIndex < options.length;
                ingredientIndex++
            ) {
                ///console.log(ingredientList[index]['id'])
                //console.log(menu[index]['id'])
                // console.log(parseInt(options[ingredientIndex]) == parseInt(ingredientList[index]['id']))
                if (
                    parseInt(options[ingredientIndex]) ===
                    parseInt(ingredientList[index]["id"])
                ) {
                    optionsReturn += ingredientList[index]["name"] + " ";
                }
            }
        }
        checkOptionsInIDs();
        return optionsReturn;
    };

    const displayInfo = menu.map((item) => {
        return (
            <tr>
                <td style={{ fontSize: `${fontSize}px` }}>{item.category}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.id}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.name}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.price}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.ingredients}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.options}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.png}</td>
            </tr>
        );
    });
    const displayDropDown = ingredientList.map((inventory) => {
        return <option value={inventory.id}> {inventory.name}</option>;
    });
    return (
        <div className="App">
            <button onClick={() => setFontSize(fontSize + 2)}>
                + increase font size
            </button>
            <button onClick={() => setFontSize(fontSize - 2)}>
                - decrease font size
            </button>
            <div>
                <button>
                    <img
                        onClick={() => {
                            navigate("/ManagerMenu");
                        }}
                        className="backbutton"
                        src={backbutton}
                        alt="back"></img>
                </button>
            </div>
            <h1>Edit Menu </h1>
            <form
                onSubmit={(event) => {
                    addMenuItem(id);
                    setIngredients((newArray) => [...newArray, event.target.value]);
                    setOptions((newArray) => [...newArray, event.target.value]);
                    displayChoice();
                }}>
                {/* now we plan to dive into what is the hell that is checking user inputs and preventing stupid ones */}

                <select
                    placeholder="category"
                    onChange={(event) => {
                        setCategory(event.target.value);
                        console.log(event.target.value);
                    }}>
                    <option value=""> null </option>
                    <option value="entree"> entree </option>
                    <option value="dessert"> dessert </option>
                    <option value="drink"> drink </option>
                </select>
                <input
                    type="number"
                    placeholder="id"
                    onChange={(event) => {
                        // see if the id exists already

                        if (!idChecker.includes(event.target.value)) {
                            setID(event.target.value);
                        } else {
                            // if it exists find the last id and add 1
                            setID(idChecker[idChecker.length - 1] + 1);
                        }
                    }}></input>
                <input
                    type="string"
                    placeholder="name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}></input>
                <input
                    type="float"
                    placeholder="price"
                    onChange={(event) => {
                        if (event.target.value > 0) {
                            setPrice(event.target.value);
                        } else {
                            setPrice(4.2);
                        }
                    }}></input>
                <select
                    onChange={(event) => {
                        var initalizeIngredients = true;
                        if (initalizeIngredients) {
                            setIngredients((newArray) => [
                                ...newArray,
                                event.target.value,
                            ]);
                            initalizeIngredients = false;
                        } else if (!ingredients.includes(event.target.value)) {
                            setIngredients((newArray) => [
                                ...newArray,
                                event.target.value,
                            ]);
                        }
                        console.log(ingredients);
                    }}>
                    {displayDropDown}
                </select>
                <select
                    onChange={(event) => {
                        var initalizeOptions = true;
                        if (initalizeOptions) {
                            setOptions((newArray) => [...newArray, event.target.value]);
                            initalizeOptions = false;
                        } else if (!options.includes(event.target.value)) {
                            setOptions((newArray) => [...newArray, event.target.value]);
                        }
                        // console.log(options)
                    }}>
                    {displayDropDown}
                </select>
                <input
                    type="string"
                    placeholder="png"
                    onChange={(event) => {
                        setPNG(event.target.value);
                    }}></input>

                <button onClick>Add New Menu Item</button>
            </form>

            <form
                onSubmit={(event) => {
                    removeMenuById();
                }}>
                <input
                    type="number"
                    placeholder="id to REMOVE"
                    onChange={(event) => {
                        setIdRemove(event.target.value);
                    }}></input>
                <button>Remove menu item by id</button>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ fontSize: `${fontSize}px` }}>Category</th>
                        <th style={{ fontSize: `${fontSize}px` }}>Id</th>
                        <th style={{ fontSize: `${fontSize}px` }}>Name</th>
                        <th style={{ fontSize: `${fontSize}px` }}>Price</th>
                        <th style={{ fontSize: `${fontSize}px` }}>Ingredients</th>
                        <th style={{ fontSize: `${fontSize}px` }}>Options</th>
                        <th style={{ fontSize: `${fontSize}px` }}>PNG</th>
                    </tr>
                </thead>
                <tbody>{displayInfo}</tbody>
            </table>
            <form onSubmit>
                <button
                    onClick={() => {
                        ingredients.length = 0;
                        options.length = 0;
                    }}>
                    Clear presets
                </button>
                <p>{displayChoice()}</p>
                <p>{displayOptions()}</p>
            </form>
        </div>
    );
}
