import React from "react";
import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
    const [items, setRevenue] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(16); //for inc and dec font size

    /**
     * Fetches information from database table 'orders' between specfied parameter dates
     * @author  Margaret
     * @param   {date} firstDate first date for btwn
     * @param   {date} secondDate second date in btwn
     */
    async function getSalesBetweenDates() {
        try {
            const res = await fetch(`api/revenue/${startDate}/${endDate}`);
            const data = await res.json();
            setRevenue(data);
        } catch (err) {
            console.error(err);
        }
    }
    /**
     * Sets the information to be display given the item
     * @author  Margaret
     * @param   {object} item the object containing an item's information
     */
    const displayInfo = items.map((item) => {
        return (
            <tr>
                <td style={{ fontSize: `${fontSize}px` }}> {item.orderid} </td>
                <td style={{ fontSize: `${fontSize}px` }}>
                    {moment(item.date).utc().format("YYYY-MM-DD")}
                </td>
                <td style={{ fontSize: `${fontSize}px` }}> {item.amount} </td>
            </tr>
        );
    });

    return (
        <div className="orderhistory-page manager-page">
            <div className="orderhistory-topbar">
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
                <div className="orderhistory-actions">
                    <form
                        id="orderhistory-form"
                        className="orderhistory-actions__container"
                        onSubmit={(e) => {
                            getSalesBetweenDates();
                            e.preventDefault();
                            getSalesBetweenDates();
                        }}>
                        <input
                            className="orderhistory-actions--input"
                            type="date"
                            placeholder="yyyy-mm-dd"
                            onChange={(event) => {
                                setStartDate(event.target.value);
                            }}></input>
                        <input
                            className="orderhistory-actions--input"
                            type="date"
                            placeholder="yyyy-mm-dd"
                            onChange={(event) => {
                                setEndDate(event.target.value);
                            }}></input>
                        <button className="button">Search</button>
                    </form>
                </div>
                <div className="orderhistory-accessibility">
                    <button className="button" onClick={() => setFontSize(fontSize + 2)}>
                        + Font Size
                    </button>
                    <button className="button" onClick={() => setFontSize(fontSize - 2)}>
                        - Font Size
                    </button>
                </div>
            </div>
            <div className="orderhistory-table">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>ORDER ID</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>DATE</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>REVENUE</th>
                        </tr>
                    </thead>
                    <tbody>{displayInfo}</tbody>
                </table>
            </div>
        </div>
    );
}
