import React, { Component } from "react";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Excess() {
    const [sales, setTable] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [excessReportCalled, setExcess] = useState(false);



    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Joshua
     * @param   {date} startDate first date for btwn
     * @param   {date} endDate second date in btwn
     */

    async function editExcessDates() {
        try {
            console.log(`api/excess/${startDate}/${endDate}`);
            const res = await fetch(`api/excess/${startDate}/${endDate}`);
            const data = await res.json();
            setTable(data);
            setExcess(true);

            console.log(startDate, endDate);
        } catch (err) {
            console.error(err);
        }
    }

    const displayInfo = sales.map((item) => {
        if (excessReportCalled) {
            // return functionality and parser here
        }
        return (
            <tr>
                <td>{item.id}</td>
                <td>{moment(item.date).utc().format("YYYY-MM-DD")}</td>
                <td>{item.amount}</td>
                <td>{item.items}</td>
                <td>{item.inventory_ordered}</td>
            </tr>
        );
    });

    return (
        <div className="App">
            <h1>Excess Report </h1>
            <form
                onSubmit={(event) => {
                    editExcessDates();
                    event.preventDefault();
                    editExcessDates();
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

