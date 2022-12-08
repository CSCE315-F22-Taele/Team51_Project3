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
            <th>{date.type}</th>
            <th>{moment(date.date).utc().format("YYYY-MM-DD")}</th>
            <th>{date.revenue}</th>
        </tr>
    ));

    useEffect(() => {
        getRevenue();
    }, []);

    return (
        <div className="App">
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
            <div className="orders-table">
                <table className="styled-table-orders">
                    <thead>
                        <tr>
                            <th className="table-head">Day Type</th>
                            <th className="table-head">Date</th>
                            <th className="table-head">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>{displayData}</tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
