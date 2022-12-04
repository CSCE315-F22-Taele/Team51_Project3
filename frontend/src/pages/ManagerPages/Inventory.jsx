import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./managerPages.css";

export default function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [quantity, setQuantity] = useState();
    const [idCheckList, setIDChecker] = useState();
    const [newID, setnewID] = useState(0);
    const [removeID, setremoveID] = useState(0);
    const [newName, setNewName] = useState("");
    const [newInventory, setNewInventory] = useState(0);

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
            setIDChecker(idList);
        } catch (err) {
            console.error(err);
        }
    }
    /**
     * Sends a HTTP POST request of a new ingredient
     * @author  Joshua, Johnny
     * @param   {int} id the identification value of the ingredient being modified
     * @param   {string} newName the new name of the ingredient
     * @param   {int} newInventory the new inventory value to be assigned to the ingredient
     */
    async function ingredientCreate(event) {
        event.preventDefault();
        if (!newID) {
            setnewID(idCheckList[idCheckList.length - 1] + 1);
        }
        try {
            await fetch("api/inventory/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                },
                body: JSON.stringify({
                    newID: parseInt(newID),
                    newName: newName,
                    newInventory: parseInt(newInventory),
                }),
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    // Refreshes / Regrabs the Inventory on Update
    useEffect(() => {
        getInventory();
    }, [updateIngredientInventory]);

    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Joshua, Johnny
     * @param   {int} id the identification value of the ingredient being modified
     * @param   {int} quantity the new inventory value to be assigned to the ingredient
     */
    async function updateIngredientInventory(event, id, quantity) {
        event.preventDefault();
        console.log(quantity);
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
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Sets the information to be display given the ingredients
     * @author  Joshua, Johnny
     * @param   {object} ingredients the object containing an ingredient's information
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
                        }}
                    >
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
                            }}
                        ></input>
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
                    }}
                >
                    <img
                        className="backbutton"
                        src={require("../../images/backbutton.png")}
                        alt="back"
                    ></img>
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
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                Status
                            </th>
                            <th style={{ fontSize: `${fontSize}px` }}>Change Amount</th>
                        </tr>
                    </thead>
                    <tbody>{displayData}</tbody>
                </table>
            </div>
            <div className="inventory-actions">
                <tr>
                    <th>
                        <button onClick={() => setFontSize(fontSize + 2)}>
                            + increase font size
                        </button>{" "}
                    </th>
                    <th>
                        {" "}
                        <button onClick={() => setFontSize(fontSize - 2)}>
                            - decrease font size
                        </button>{" "}
                    </th>
                </tr>
                <form
                    onSubmit={(event) => {
                        ingredientCreate(event);
                    }}
                >
                    <input
                        type="number"
                        placeholder="id"
                        onChange={(event) => {
                            // Check if ID already exists in the Database
                            if (
                                !idCheckList.includes(event.target.value) &&
                                event.target.value > 0
                            ) {
                                setnewID(event.target.value);
                            } else {
                                // if it exists find the last id and add 1
                                setnewID(idCheckList[idCheckList.length - 1] + 1);
                            }
                        }}
                    ></input>
                    <input
                        type="string"
                        placeholder="name"
                        onChange={(event) => {
                            setNewName(event.target.value);
                        }}
                    ></input>
                    <input
                        type="number"
                        placeholder="inventory"
                        onChange={(event) => {
                            if (event.target.value >= 0) {
                                setNewInventory(event.target.value);
                            } else {
                                setNewInventory(0);
                            }
                        }}
                    ></input>
                    <button>Create Ingredient</button>
                </form>
                <form
                    id="inventory-form--remove"
                    onSubmit={(event) => {
                        ingredientRemove(event);
                        document.getElementById("inventory-form--remove").reset();
                    }}
                >
                    <input
                        type="number"
                        placeholder="Ingredient ID"
                        onChange={(event) => {
                            setremoveID(event.target.value);
                        }}
                    ></input>
                    <button>Remove Ingredient</button>
                </form>
            </div>
        </div>
    );
}
