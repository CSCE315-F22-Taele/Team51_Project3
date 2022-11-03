import { useState, useEffect } from "react";

export default function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [quantity, setQuantity] = useState();

    /**
     * Fetches the information from Database Table: 'Ingredients' that was sent to resource (HTTP)
     */
    async function getInventory() {
        try {
            const res = await fetch("api/v1/inventory");
            const data = await res.json();
            setInventory(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getInventory();
    }, []);

    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Joshua, Johnny
     * @param   {int} int the identification value of the ingredient being modified
     * @param   {any} quantity the new inventory value to be assigned to the ingredient
     */
    async function updateIngredientInventory(id, quantity) {
        try {
            console.log(JSON.stringify(parseInt(quantity)));
            const res = await fetch(`/api/v1/inventory/${id}`, {
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

    const displayData = inventory.map((ingredient) => {
        return (
            <tr>
                <td>{ingredient.id}</td>
                <td>{ingredient.name}</td>
                <td>{ingredient.inventory}</td>
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
                                setQuantity(event.target.value);
                            }}
                        ></input>
                    </form>
                </td>
            </tr>
        );
    });

    return (
        <div className="App">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Inventory</th>
                        <th>Change Amount</th>
                    </tr>
                </thead>
                <tbody>{displayData}</tbody>
            </table>
        </div>
    );
}
