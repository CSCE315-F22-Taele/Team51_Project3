import React, { Component } from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

export default function Excess() {
    const [sales, setTable] = useState([]);

    const [firstDate, setStartDate] = useState("");
    const [secondDate, setEndDate] = useState("");
    const [excessItems, setExcess] = useState();
    const [ingredients , setIngredients] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getInventory();
    }, []);
    /**
     * Fetches the information from Database Table: 'Ingredients' that was sent to resource (HTTP)
     */
     async function getInventory() {
        try {
            const res = await fetch(`api/inventory`);
            const data = await res.json();

            var idList = [];

            for (let i = 0; i < data.length; i++) {
                idList.push(data[i]['name']);
            }
            // const idList = data['id']


            idList.sort();
            //console.log(idList);
            setIngredients(idList);
        } catch (err) {
            console.error(err);
        }

    }
    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Joshua
     * @param   {date} firstDate first date for btwn
     * @param   {date} secondDate second date in btwn
     */

    async function editExcessDates() {
        try {
            let res = await fetch(`api/excess/${firstDate}/${secondDate}`);

            const data = await res.json();
            console.log(ingredients)
            var excessItems = [];
            for (let i = 0; i < data.length; i++) {
                excessItems.push(data[i][ingredients[i]]);
                // console.log(data[i][ingredients[i]])
            }
            console.log(excessItems)
        } catch (err) {
            console.error(err);
        }
    }

    const displayInfo = sales.map((item) => {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{moment(item.date).utc().format("YYYY-MM-DD")}</td>
                <td>{item.amount}</td>
                <td>{excessItems}</td>
                <td>{item.inventory_ordered}</td>
            </tr>
        );
    });

    return (
        <div className="App">
            <div>
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
            </div>
            <h1>Excess Report </h1>
            <form
                onSubmit={(event) => {
                    setExcess(editExcessDates());
                    event.preventDefault();
                    setExcess(editExcessDates());
                }}>
                <input
                    type="string"
                    placeholder="yyyy-mm-dd"
                    onChange={(event) => {
                        setStartDate(event.target.value);
                    }}
                    onKeyPress="setStorage(this)"></input>
                <input
                    type="string"
                    placeholder="yyyy-mm-dd"
                    onChange={(event) => {
                        setEndDate(event.target.value);
                    }}
                    onKeyPress="setStorage(this)"></input>
                <button>Submit</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>orderId</th>
                        <th>date</th>
                        <th>amount</th>
                        <th>items</th>
                        <th>inventory_ordered</th>
                    </tr>
                </thead>
                <tbody>{displayInfo}</tbody>
            </table>
        </div>
    );
}

