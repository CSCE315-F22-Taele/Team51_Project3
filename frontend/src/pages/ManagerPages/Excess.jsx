import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

export default function Excess() {
    const [firstDate, setStartDate] = useState("");
    const [secondDate, setEndDate] = useState("");
    const [ingredientsID, setIngredientsID] = useState([]);
    const [usageCount, setUsageCount] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [initialInventory, setInitialInventory] = useState([]);
    const [excessItems, setExcessItems] = useState([]);

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
        console.log(firstDate, secondDate);
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
    }

    useEffect(() => {
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
    }, [initialInventory]);

    console.log(usageCount, initialInventory);
    const displayInfo = excessItems.map((item) => {
        if (initialInventory.length < 1 || initialInventory === undefined) {
            return;
        }
        return (
            <tr>
                <td style={{ fontSize: `${fontSize}px` }}>{item.id}</td>
                <td style={{ fontSize: `${fontSize}px` }}>{item.name}</td>
                <td style={{ fontSize: `${fontSize}px` }}>
                    {Number(
                        usageCount[item.id] / parseFloat(initialInventory[0][item.id])
                    ).toLocaleString("en-US", {
                        style: "percent",
                        minimumFractionDigits: 2,
                    })}
                </td>
            </tr>
        );
    });

    return (
        <div className="excess-page manager-page">
            <div className="excess-topbar">
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
                <div className="excess-actions">
                    <form
                        id="excess-form"
                        className="excess-actions__container"
                        onSubmit={(event) => {
                            getIngredientUsage(event);
                        }}
                    >
                        <input
                            className="excess-actions--input"
                            type="date"
                            placeholder="yyyy-mm-dd"
                            onChange={(event) => {
                                setStartDate(event.target.value);
                            }}
                            required
                        />
                        <input
                            className="excess-actions--input"
                            type="date"
                            placeholder="yyyy-mm-dd"
                            onChange={(event) => {
                                setEndDate(event.target.value);
                            }}
                            required
                        />
                        <button className="button">Search</button>
                    </form>
                </div>
                <div className="excess-accessibility">
                    <button className="button" onClick={() => setFontSize(fontSize + 2)}>
                        + Font Size
                    </button>
                    <button className="button" onClick={() => setFontSize(fontSize - 2)}>
                        - Font Size
                    </button>
                </div>
            </div>
            <div className="excess-table">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ fontSize: `${fontSize}px` }}>Item ID</th>
                            <th style={{ fontSize: `${fontSize}px` }}>Item Name</th>
                            <th style={{ fontSize: `${fontSize}px` }}>Percentage Sold</th>
                        </tr>
                    </thead>
                    <tbody>{displayInfo}</tbody>
                </table>
            </div>
        </div>
    );
}
