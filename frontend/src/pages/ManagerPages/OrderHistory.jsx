import React from 'react'
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";
import { useState, useEffect } from "react";
import moment from "moment";


/**
 * @author Will
 * @returns the table containing all order history data
 */
const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  /**
   * @function getOrderHistory pulls order history table data from api
   */
  async function getOrderHistory() {
    try {
      const res = await fetch("api/revenue");
      const data = await res.json();
      setOrders(data);
      //console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @function displayData
   * @returns all the rows within the order history table in a nice format
   */
  const displayData = orders.map((order) => (
    <div className="orders-table">
      <table className="styled-table">
        <thead>
          <tr>
            <th>{order.orderid}</th>
            <th>{moment(order.date).utc().format("YYYY-MM-DD")}</th>
            <th>{order.amount}</th>
            <th>{order.itemcount}</th>
          </tr>
        </thead>
      </table>
    </div>
  ));


  useEffect(() => {
    getOrderHistory();
  }, []);

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
      <div className="orders-table">
        <table className="styled-table">
          <thead>
            <tr>
              <th className="table-head">Order ID</th>
              <th className="table-head">Date</th>
              <th className="table-head">Revenue</th>
              <th className="table-head">Item Count</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistory;