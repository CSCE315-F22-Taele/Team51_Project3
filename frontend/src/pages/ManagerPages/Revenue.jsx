import React, { Component } from "react";
import { useState, useEffect } from 'react';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

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
        <td
          style={{ fontSize: `${fontSize}px` }}
        > {item.orderid} </td>
        <td
          style={{ fontSize: `${fontSize}px` }}
        >{moment(item.date).utc().format("YYYY-MM-DD")}</td>
        <td
          style={{ fontSize: `${fontSize}px` }}
        > {item.amount} </td>
      </tr>
    );
  });

  return (
    <div className="App">
      <tr>
        <th> <div>
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
        </div> </th>
        <th><button onClick={() => setFontSize(fontSize + 2)} >
          + increase font size
        </button> </th>
        <th> <button onClick={() => setFontSize(fontSize - 2)} >
          - decrease font size
        </button> </th>
      </tr>
      <h1>Sales Report </h1>
      <form
        onSubmit={(e) => {
          getSalesBetweenDates();
          e.preventDefault();
          getSalesBetweenDates();
        }}
      >
        <input
          type="string"
          placeholder="yyyy-mm-dd"
          onChange={(event) => {
            setStartDate(event.target.value);
          }}

        >
        </input>
        <input
          type="string"
          placeholder="yyyy-mm-dd"
          onChange={(event) => {
            setEndDate(event.target.value);
          }}
        ></input>
        <button>Submit</button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th
              style={{ fontSize: `${fontSize}px` }}
            >ITEM</th>
            <th
              style={{ fontSize: `${fontSize}px` }}
            >DATE</th>
            <th
              style={{ fontSize: `${fontSize}px` }}
            >REVENUE</th>
          </tr>
        </thead>
        <tbody>{displayInfo}</tbody>
      </table>
    </div>

  );

}
