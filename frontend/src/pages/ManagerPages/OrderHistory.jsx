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
    <tr>
      <th>{order.orderid}</th>
      <th>{moment(order.date).utc().format("YYYY-MM-DD")}</th>
      <th>{order.amount}</th>
      <th>{order.itemcount}</th>
    </tr>
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
        <table className="styled-table-orders">
          <thead>
            <tr>
              <th className="table-head">Order ID</th>
              <th className="table-head">Order Date</th>
              <th className="table-head">Order Revenue</th>
              <th className="table-head">Items Sold</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistory;