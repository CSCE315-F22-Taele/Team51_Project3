import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

export default function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [quantity, setQuantity] = useState();
    const [idCheckList, setIDChecker] = useState();
    const [newId, setNewID] = useState(0);
    const [idRemove, setIdRemove] = useState(0);
    const [newName, setNewName] = useState('');
    const [inventoryEnter, inventoryEnterSet] = useState(0);

    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(16); //for inc and dec font size


    /**
     * Fetches the information from Database Table: 'Ingredients' that was sent to resource (HTTP)
     */
    async function getInventory() {
        try {
            const res = await fetch(`api/inventory`);
            const data = await res.json();
            setInventory(data);
            var idList = [];

            for (let i = 0; i < data.length; i++) {
                idList.push(data[i]['id']);
            }
            // const idList = data['id']


            idList.sort();
            //console.log(idList);
            setIDChecker(idList);
        } catch (err) {
            console.error(err);
        }

    }
    /**
      * Sends a HTTP POST request of a new ingredient
      * @author  Joshua
      * @param   {int} id the identification value of the ingredient being modified
      * @param   {string} newName the new name of the ingredient
      * @param   {int} inventoryEnter the new inventory value to be assigned to the ingredient
      */
    async function ingredientCreate() {
        if (!newId) {
            setNewID(idCheckList[idCheckList.length - 1] + 1);
        }
        try {
            let res = await fetch("api/inventory/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                },
                body: JSON.stringify({
                    newId: parseInt(newId),
                    newName: newName,
                    inventoryEnter: parseInt(inventoryEnter),
                }),
            });
            const data = await res.json();
            console.log(data)

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getInventory();
    }, []);

    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Joshua, Johnny
     * @param   {int} id the identification value of the ingredient being modified
     * @param   {int} quantity the new inventory value to be assigned to the ingredient
     */
    async function updateIngredientInventory(id, quantity) {
        try {
            const res = await fetch(`/api/inventory/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PATCH",
                },
                body: JSON.stringify({ quantity: parseInt(quantity) }),
            });

            window.location = "/Inventory";
        } catch (err) {
            console.error(err);
        }
    }
    /**
     * Sends a HTTP deete request with the quantity of the ID to be removed
     * @author  Joshua,
     * @param   {int} id the identification value of the ingredient being modified

     */

    async function ingredientRemove() {
        try {
            const res = await fetch("/api/inventory/", {
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
            console.error(err);
        }
    }
    const displayData = inventory.map((ingredient) => {
        const restockNeeded = () => {
            if (ingredient.inventory < 10) {
                return "restock needed"
            }
            else {
                return "item is fine"
            }
        }
        return (
            <tr>
                <td
                    style={{ fontSize: `${fontSize}px` }}
                >{ingredient.id}</td>
                <td
                    style={{ fontSize: `${fontSize}px` }}
                >{ingredient.name}</td>
                <td
                    style={{ fontSize: `${fontSize}px` }}
                >{ingredient.inventory}</td>
                <td>
                    <form
                        onSubmit={(event) => {
                            updateIngredientInventory(ingredient.id, quantity);
                        }}
                    >
                        <input
                            type="number"
                            name={ingredient.name}
                            defaultValue={ingredient.inventory}
                            onChange={(event) => {
                                if (event.target.value > 0) {
                                    setQuantity(event.target.value);
                                }
                                else {
                                    setQuantity(1000);

                                }
                            }}
                        ></input>
                    </form>
                </td>
                <td style={{ fontSize: `${fontSize}px` }}>
                    {restockNeeded()}
                </td>
            </tr>
        );
    });

    return (
        <div className="App">
            <tr>
                <th> <div>
                    <button>
                        <img
                            onClick={() => {
                                navigate("/ManagerMenu")
                            }}
                            className="backbutton"
                            src={backbutton}
                            alt="back">
                        </img>
                    </button>
                </div> </th>
                <th><button onClick={() => setFontSize(fontSize + 2)} >
                    + increase font size
                </button> </th>
                <th> <button onClick={() => setFontSize(fontSize - 2)} >
                    - decrease font size
                </button> </th>
            </tr>
            <form onSubmit={(event) => {
                ingredientCreate()
            }}>
                <input
                    type="number"
                    placeholder="id"
                    onChange={(event) => {
                        // see if the id exists already

                        if (!idCheckList.includes(event.target.value) && event.target.value > 0) {
                            setNewID(event.target.value);
                        }
                        else {
                            // if it exists find the last id and add 1
                            setNewID(idCheckList[idCheckList.length - 1] + 1);
                        }
                        console.log(newId)
                    }}
                ></input>
                <input
                    type="string"
                    placeholder="name"
                    onChange={(event) => {
                        setNewName(event.target.value);
                        console.log(newName)
                    }}
                ></input>
                <input
                    type="number"
                    placeholder="inventory"
                    onChange={(event) => {
                        if (event.target.value > 0) {
                            inventoryEnterSet(event.target.value);
                        }
                        else {

                            inventoryEnterSet(1000);
                        }
                        console.log(inventoryEnter)
                    }}
                ></input>
                <button>Create New Ingredient</button>
            </form>
            <form onSubmit={(event) => {
                setIdRemove(event.target.value)
                ingredientRemove()

            }}>
                <input
                    type="number"
                    placeholder="id"
                    onChange={(event) => {
                        // see if the id exists already
                        setIdRemove(event.target.value)
                        console.log(idRemove)
                    }}
                >

                </input>
                <button> remove ingredient button</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th
                            style={{ fontSize: `${fontSize}px` }}
                        >ID</th>
                        <th
                            style={{ fontSize: `${fontSize}px` }}
                        >Name</th>
                        <th
                            style={{ fontSize: `${fontSize}px` }}
                        >Inventory</th>
                        <th
                            style={{ fontSize: `${fontSize}px` }}
                        >Change Amount</th>
                        <th
                            style={{ fontSize: `${fontSize}px` }}
                        >Restock Needed?</th>
                    </tr>
                </thead>
                <tbody>{displayData}</tbody>
            </table>
        </div>
    );
}
