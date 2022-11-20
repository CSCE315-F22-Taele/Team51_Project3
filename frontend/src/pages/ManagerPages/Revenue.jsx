import React, { Component } from "react";
import { useState, useEffect } from 'react';
import moment from "moment";

export default function Revenue() {
  const[items, setRevenue] = useState([]);
  const[startDate, setStartDate]= useState("");
  const[endDate, setEndDate]= useState("");

  const [fontSize, setFontSize] = useState(16); //for inc and dec font size

 
  async function getSalesBetweenDates() {
    try {
        const res = await fetch(`api/revenue/${startDate}/${endDate}`);
        const data = await res.json();
        setRevenue(data); 
             
    } catch (err) {
        console.error(err);
    }
}

   const displayInfo = items.map((item) => {
      return (
        <tr>
          <td
          style={{fontSize: `${fontSize}px`}}
          > {item.orderid} </td>
          <td
          style={{fontSize: `${fontSize}px`}}
          >{moment(item.date).utc().format("YYYY-MM-DD")}</td>
          <td
          style={{fontSize: `${fontSize}px`}}
          > {item.amount} </td>
        </tr>
      );
   });

   return (
      <div className="App">
        <button onClick={() => setFontSize(fontSize + 2)} > 
            + increase font size 
            </button>
            <button onClick={() => setFontSize(fontSize - 2)} > 
            - decrease font size 
            </button>
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
                    style={{fontSize: `${fontSize}px`}}
                    >ITEM</th>
                    <th
                    style={{fontSize: `${fontSize}px`}}
                    >DATE</th>
                    <th
                    style={{fontSize: `${fontSize}px`}}
                    >REVENUE</th>
                </tr>
            </thead>
            <tbody>{displayInfo}</tbody>
        </table>
    </div>
    
   );

}
  