import React from "react";
import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Revenue() {
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
        <div className="revenue-page manager-page">
            <div className="revenue-topbar">
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
                <div className="revenue-actions">
                    <form
                        id="revenue-form"
                        className="revenue-actions__container"
                        onSubmit={(e) => {
                            getSalesBetweenDates();
                            e.preventDefault();
                            getSalesBetweenDates();
                        }}>
                        <input
                            className="revenue-actions--input"
                            type="date"
                            placeholder="yyyy-mm-dd"
                            onChange={(event) => {
                                setStartDate(event.target.value);
                            }}></input>
                        <input
                            className="revenue-actions--input"
                            type="date"
                            placeholder="yyyy-mm-dd"
                            onChange={(event) => {
                                setEndDate(event.target.value);
                            }}></input>
                        <button className="button">Search</button>
                    </form>
                </div>
                <div className="revenue-accessibility">
                    <button className="button" onClick={() => setFontSize(fontSize + 2)}>
                        + Font Size
                    </button>
                    <button className="button" onClick={() => setFontSize(fontSize - 2)}>
                        - Font Size
                    </button>
                </div>
            </div>
            <div className="revenue-table">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ fontSize: `${fontSize}px` }}>ITEM</th>
                            <th style={{ fontSize: `${fontSize}px` }}>DATE</th>
                            <th style={{ fontSize: `${fontSize}px` }}>REVENUE</th>
                        </tr>
                    </thead>
                    <tbody>{displayInfo}</tbody>
                </table>
            </div>
        </div>
    );
}
