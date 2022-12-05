import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./managerPages.css";

export default function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [quantity, setQuantity] = useState();
    const [idCheckList, setCheckList] = useState();
    const [removeID, setRemoveID] = useState(0);

    const [newIngredientValues, setNewIngredientValues] = useState({
        newID: "",
        newName: "",
        newInventory: "",
    });

    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(20); //for inc and dec font size

    /**
     * Fetches the information from Database Table: 'Ingredients' that was sent to resource (HTTP)
     * @author  Joshua
     */
    async function getInventory() {
        try {
            const res = await fetch(`api/inventory`);
            const data = await res.json();
            setInventory(data);
            var idList = [];

            for (let i = 0; i < data.length; i++) {
                idList.push(data[i]["id"]);
            }

            idList.sort();
            setCheckList(idList);
            console.log("INSIDE", idList);
        } catch (err) {
            console.error(err);
        }
    }
    /**
     * Sends a HTTP POST request of a new ingredient
     * @author  Joshua, Johnny
     * @param   {int} id the identification value of the ingredient being modified
     * @param   {string} newName the new name of the ingredient
     * @param   {int} newInventory the new inventory value to be assigned to the ingredient\
     * @return  {boolean} returns true on success, false on fail
     */
    async function ingredientCreate(event) {
        event.preventDefault();
        let newID = parseInt(newIngredientValues.newID);
        let newName = newIngredientValues.newName;
        let newInventory = parseInt(newIngredientValues.newInventory);

        // Checks if ID already exists in the Database, if so reassign
        if (idCheckList.includes(newID) || newID < 0) {
            newID = idCheckList[idCheckList.length - 1] + 1;
        }
        try {
            console.log(parseInt(newID), newName, parseInt(newInventory));
            await fetch("api/inventory/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                },
                body: JSON.stringify({
                    newID: newID,
                    newName: newName,
                    newInventory: newInventory,
                }),
            });
            getInventory();
            return true;
        } catch (err) {
            console.log(err.message);
            return false;
        }
    }

    // Refreshes / Regrabs the Inventory on Update
    useEffect(() => {
        getInventory();
    }, []);

    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Joshua, Johnny
     * @param   {int} id the identification value of the ingredient being modified
     * @param   {int} quantity the new inventory value to be assigned to the ingredient
     */
    async function updateIngredientInventory(event, id, quantity) {
        event.preventDefault();
        try {
            await fetch(`/api/inventory/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PATCH",
                },
                body: JSON.stringify({ quantity: parseInt(quantity) }),
            });
            getInventory();
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Sends a HTTP deete request with the quantity of the ID to be removed
     * @author  Joshua, Johnny
     * @param   {int} id the identification value of the ingredient being modified
     */
    async function ingredientRemove(event) {
        event.preventDefault();
        try {
            await fetch("/api/inventory/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE",
                },
                body: JSON.stringify({
                    removeID: parseInt(removeID),
                }),
            });
            getInventory();
        } catch (err) {
            console.error(err);
        }
    }

    // Detects and Set Values When Called
    const onChange = (e) => {
        setNewIngredientValues({
            ...newIngredientValues,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Sets the information to be display given the ingredients
     * @author  Joshua, Johnny
     * @param   {object} ingredient the object containing an ingredient's information
     */
    const displayData = inventory.map((ingredient) => {
        const restockNeeded = () => {
            if (ingredient.inventory === 0) {
                return <p className="inventory-table--status status--red">Depleted</p>;
            } else if (ingredient.inventory < 10) {
                return <p className="inventory-table--status status--yellow">Low</p>;
            } else {
                return <p className="inventory-table--status status--green">Good</p>;
            }
        };
        return (
            <tr>
                <td style={{ fontSize: `${fontSize}px` }}>{ingredient.id}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{ingredient.name}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{ingredient.inventory}</td>
                <td className="center-text" style={{ fontSize: `${fontSize}px` }}>
                    {restockNeeded()}
                </td>
                <td>
                    <form
                        onSubmit={(event) => {
                            updateIngredientInventory(event, ingredient.id, quantity);
                        }}>
                        <input
                            type="number"
                            name={ingredient.name}
                            defaultValue={ingredient.inventory}
                            onChange={(event) => {
                                if (event.target.value >= 0) {
                                    setQuantity(event.target.value);
                                } else {
                                    setQuantity(0);
                                }
                            }}></input>
                    </form>
                </td>
            </tr>
        );
    });

    return (
        <div className="inventory-page">
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
            <div className="inventory-table">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ fontSize: `${fontSize}px` }}>ID</th>
                            <th style={{ fontSize: `${fontSize}px` }}>Name</th>
                            <th style={{ fontSize: `${fontSize}px` }}>Inventory</th>
                            <th
                                className="center-text"
                                style={{ fontSize: `${fontSize}px` }}>
                                Status
                            </th>
                            <th style={{ fontSize: `${fontSize}px` }}>Change Amount</th>
                        </tr>
                    </thead>
                    <tbody>{displayData}</tbody>
                </table>
            </div>
            <div className="inventory-actions">
                <form
                    id="inventory-form--create"
                    className="inventory-actions__container"
                    onSubmit={(event) => {
                        if (ingredientCreate(event)) {
                            setNewIngredientValues({
                                newID: "",
                                newName: "",
                                newInventory: "",
                            });
                        }
                    }}>
                    <input
                        className="inventory-actions--input"
                        type="number"
                        autoComplete="off"
                        placeholder="ID"
                        onChange={(event) => {
                            onChange(event);
                        }}
                        name="newID"
                        value={newIngredientValues.newID}
                        required
                    />
                    <input
                        className="inventory-actions--input"
                        type="string"
                        autoComplete="off"
                        placeholder="Name"
                        onChange={(event) => {
                            onChange(event);
                        }}
                        name="newName"
                        value={newIngredientValues.newName}
                        required
                    />
                    <input
                        className="inventory-actions--input"
                        type="number"
                        autoComplete="off"
                        placeholder="Quantity"
                        onChange={(event) => {
                            onChange(event);
                        }}
                        name="newInventory"
                        value={newIngredientValues.newInventory}
                        required
                    />
                    <button className="button">Create Ingredient</button>
                </form>
                <form
                    id="inventory-form--remove"
                    className="inventory-actions__container"
                    onSubmit={(event) => {
                        ingredientRemove(event);
                        document.getElementById("inventory-form--remove").reset();
                    }}>
                    <input
                        className="inventory-actions--input"
                        type="number"
                        placeholder="Ingredient ID"
                        onChange={(event) => {
                            setRemoveID(event.target.value);
                        }}></input>
                    <button className="button">Remove Ingredient</button>
                </form>
                <div className="inventory-accessibility">
                    <button className="button" onClick={() => setFontSize(fontSize + 2)}>
                        + Font Size
                    </button>
                    <button className="button" onClick={() => setFontSize(fontSize - 2)}>
                        - Font Size
                    </button>
                </div>
            </div>
        </div>
    );
}
