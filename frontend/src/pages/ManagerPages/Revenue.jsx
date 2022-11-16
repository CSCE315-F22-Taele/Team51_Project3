import React, { Component } from "react";
import { useState, useEffect } from 'react';
import moment from "moment";

export default function Revenue() {
  const[items, setRevenue] = useState([]);
  const[startDate, setStartDate]= useState("");
  const[endDate, setEndDate]= useState("");
  // const [id, setID] = useState(0);
 
//this function does not display orderid
  async function getSalesBetweenDates() {
    try {
        const res = await fetch(`api/revenue/${startDate}/${endDate}`);
        //const res = await fetch("api/revenue");
        const data = await res.json();
        setRevenue(data); 
             
    } catch (err) {
        console.error(err);
    }
}


  // async function getSalesBetweenDates() {
  //   try {
  //       const res = await fetch(`api/revenue/${startDate}/${endDate}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           "Acces-Control-Allow-Methods": "GET",
  //         },
  //         body: JSON.stringify({
  //           id: parseInt(id),
  //           date : date,
  //           amount : amount
  //         }),
  //       });
  //       const data = await res.json();
  //       setRevenue(data);
  //       window.location = "/Revenue";
  //   }
  //   catch (err) {
  //       console.log(err);
  //   }
  //  }
   


   const displayInfo = items.map((item) => {
      return (
        <tr>
          <td> {item.id} </td>
          <td>{moment(item.date).utc().format("YYYY-MM-DD")}</td>
          <td> {item.amount} </td>
          <td> {item.count} </td>

        </tr>
      );
   });

   return (
      <div className="App">
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
                    <th>ITEM COUNT</th>
                </tr>
            </thead>
            <tbody>{displayInfo}</tbody>
        </table>
    </div>
    
   );

}
  