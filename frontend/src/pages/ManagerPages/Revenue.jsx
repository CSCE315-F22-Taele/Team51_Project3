import React, { Component } from "react";
import { useState, useEffect } from 'react';


export default function Revenue() {
  const[sales, setRevenue] = useState([]);
  const[startDate, setStartDate]= useState();
  const[endDate, setEndDate]= useState();

  async function getSales() {
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
          <td> {item.orderid} </td>
          <td>{moment(item.date).utc().format("YYYY-MM-DD")}</td>
          <td> {item.amount} </td>
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
                    <th>ITEM</th>
                    <th>DATE</th>
                    <th>REVENUE</th>
                </tr>
            </thead>
            <tbody>{displayInfo}</tbody>
        </table>
    </div>
    
   );

}
  