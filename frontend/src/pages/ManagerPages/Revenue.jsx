import React from "react";
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";
import { useState, useEffect } from "react";
import moment from "moment";

/**
 * @author Will
 * @returns the table containing all revenue data
 */
const OrderHistory = () => {
    const navigate = useNavigate();
    const [revenue, setRevenue] = useState([]);
    const [fontSize, setFontSize] = useState(20); //for inc and dec font size

    /**
     * @function getOrderHistory pulls revenue table data from api
     */
    async function getRevenue() {
        try {
            const res = await fetch("api/revenue");
            const data = await res.json();
            setRevenue(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @function displayData
     * @returns all the rows within the revenue table in a nice format
     */
    const displayData = revenue.map((date) => (
        <tr>
            <td style={{ fontSize: `${fontSize}px` }}>{date.type}</td>
            <td style={{ fontSize: `${fontSize}px` }}>{moment(date.date).utc().format("YYYY-MM-DD")}</td>
            <td style={{ fontSize: `${fontSize}px` }}>{date.revenue}</td>
        </tr>
    ));

    useEffect(() => {
        getRevenue();
    }, []);

    return (
        <div className="revenue-page manager-page">
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
            <div className="revenue-table">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Day Type</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Date</th>
                            <th style={{ fontSize: `${fontSize + 2}px` }}>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>{displayData}</tbody>
                </table>
            </div>
            <div className="inventory-actions">
                <div className="inventory-accessibility">
                    <button className="button" onClick={() => setFontSize(fontSize + 2)}>
                        + Font Size
                    </button>
                    <button className="button" onClick={() => setFontSize(fontSize - 2)}>
                        - Font Size
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
