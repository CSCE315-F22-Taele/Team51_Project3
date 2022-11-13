import { useState, useEffect } from "react";

export default function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [quantity, setQuantity] = useState();
    const [idCheckList, setIDChecker] = useState();
    const [id, setID] = useState();
    const [name, setName] = useState();
    const [inventoryEnter, inventoryEnterSet] = useState();


    /**
     * Fetches the information from Database Table: 'Ingredients' that was sent to resource (HTTP)
     */
    async function getInventory() {
        try {
            const res = await fetch("api/inventory");
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
    async function ingredientUpdate()
    {
        try{
            const res = await fetch(`api/inventory/${id}/${name}/${inventoryEnter}`);
            const data = await res.json();
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getInventory();
    }, []);

    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Joshua, Johnny
     * @param   {int} id the identification value of the ingredient being modified
     * @param   {any} quantity the new inventory value to be assigned to the ingredient
     */
    async function updateIngredientInventory(id, quantity) {
        try {
            console.log(JSON.stringify(parseInt(quantity)));
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
                                if(event.target.value > 0)
                                {
                                    setQuantity(event.target.value);
                                }
                                else{
                                    setQuantity(1000);

                                }
                            }}
                        ></input>
                    </form>
                </td>
            </tr>
        );
    });

    return (
        <div className="App">
            <form onSubmit={ingredientUpdate()}>
            <input
                    type="number"
                    placeholder="id"
                    onChange={(event) => {
                        // see if the id exists already

                        if (!idCheckList.includes(event.target.value) && event.target.value > 0) {
                            setID(event.target.value);
                        }
                        else {
                            // if it exists find the last id and add 1
                            setID(idCheckList[idCheckList.length - 1] + 1);
                        }

                    }}
                ></input>
                <input
                    type="string"
                    placeholder="name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                ></input>
                    <input
                    type="number"
                    placeholder="inventory"
                    onChange={(event) => {
                        if( event.target.value > 0)
                        {
                            inventoryEnterSet(event.target.value);
                        }
                        else{
                            
                            inventoryEnterSet(1000);
                        }
                    }}
                ></input>
                <button>Update Ingrdients</button>
            </form>
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
