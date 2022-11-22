import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

export default function Excess() {
    const [firstDate, setStartDate] = useState("");
    const [secondDate, setEndDate] = useState("");
    const [ingredientsID, setIngredientsID] = useState();
    const [usageCount, setUsageCount] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [initialInventory, setInitialInventory] = useState([]);
    const [excessItems, setExcessItems] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    const didMount = useRef(false);
    const didMount2 = useRef(false);

    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(16); //for inc and dec font size


    useEffect(() => {
        getInventory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredientsID]);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
        } else {
            checkExcessGivenDate();
        }
    }, [usageCount]);

    useEffect(() => {
        if (!didMount2.current) {
            didMount2.current = true;
        } else {
            setDisplayData(setTableView());
        }
    }, [excessItems]);

    /**
     * Fetches the information from Database Table: 'Ingredients' that was sent to resource (HTTP)
     */
    async function getInventory() {
        try {
            let ids = [];
            const data = await (await fetch("api/inventory")).json();
            setInventory(data);

            for (let i = 0; i < data.length; i++) {
                ids[i] = data[i]["id"];
            }
            if (JSON.stringify(ids) !== JSON.stringify(ingredientsID)) {
                setIngredientsID(ids);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getIngredientUsage = async (event) => {
        event.preventDefault();
        try {
            await fetch("api/excess/ingredientusage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                },
                body: JSON.stringify({
                    ids: ingredientsID,
                    firstDate: firstDate,
                    secondDate: secondDate,
                }),
            }).then((response) => {
                response
                    .json()
                    .then((data) => ({
                        data: data,
                        status: response.status,
                    }))
                    .then((res) => {
                        setUsageCount(res.data);
                    });
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Joshua
     * @param   {date} firstDate first date for btwn
     * @param   {date} secondDate second date in btwn
     */

    async function checkExcessGivenDate() {
        try {
            await fetch(`api/excess/dailyinventory/${firstDate}`).then((response) => {
                response.json().then((data) => {
                    setInitialInventory(data);
                });
            });
        } catch (err) {
            console.error(err);
        }

        const excessed = inventory.filter(function (item) {
            try {
                if (usageCount[item.id] < initialInventory[0][item.id] * 0.1) {
                    return true;
                }
            } catch (err) {
                return false;
            }
            return false;
        });
        setExcessItems(excessed);
    }

    function setTableView() {
        
        const displayInfo = excessItems.map((item) => {
            return (
                <tr>
                    <td
                    style={{fontSize: `${fontSize}px`}}
                    >{item.id}</td>
                    <td
                    style={{fontSize: `${fontSize}px`}}
                    >{item.name}</td>
                    <td
                    style={{fontSize: `${fontSize}px`}}
                    >{Number(
                    usageCount[item.id] / parseFloat(initialInventory[0][item.id])
                ).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                })}</td>
                </tr>
            );
        });
        return displayInfo;
    }

    return (
        <div className="App">
            <button onClick={() => setFontSize(fontSize + 2)} > 
            + increase font size 
            </button>
            <button onClick={() => setFontSize(fontSize - 2)} > 
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
            <h1>Excess Report </h1>
            <form
                onSubmit={(event) => {
                    getIngredientUsage(event);
                }}>
                <input
                    type="string"
                    placeholder="yyyy-mm-dd"
                    onChange={(event) => {
                        setStartDate(event.target.value);
                    }}
                    required></input>
                <input
                    type="string"
                    placeholder="yyyy-mm-dd"
                    onChange={(event) => {
                        setEndDate(event.target.value);
                    }}
                    required></input>
                <button>Submit</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th
                        style={{fontSize: `${fontSize}px`}}
                        >Item ID</th>
                        <th
                        style={{fontSize: `${fontSize}px`}}
                        >Item Name</th>
                        <th
                        style={{fontSize: `${fontSize}px`}}
                        >Percentage Sold</th>
                    </tr>
                </thead>
                <tbody>{displayData}</tbody>
            </table>
        </div>
    );
}
