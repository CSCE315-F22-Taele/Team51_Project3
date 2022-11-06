import React, { Component } from "react";
import { useState, useEffect } from 'react';


export default function Excess() {
  const [sales, setTable] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [excessReportCalled, setExcess] = useState(false);


  // async function getExcess() {
  //   try {
  //     const res = await fetch("api/v1/excess");
  //     console.log(res)
  //     const data = await res.json();
  //     setTable(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   editExcessDates();
  // }, []);

  /**
 * Sends a HTTP PATCH request with the quantity of the ID to be modified
 * @author  Joshua
 * @param   {date} startDate first date for btwn
 * @param   {date} endDate second date in btwn
 */
  // async function editExcessDates() {
  //   try {
  //     const res = await fetch(`api/v1/excess/${firstDate}/${secondDate}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Acces-Control-Allow-Methods": "PATCH",
  //       },
  //       body: JSON.stringify(sales),
  //     });
  //     setTable(res);
  //     window.location = "/Excess";

  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }  
  async function editExcessDates() {
    try {
      const res = await fetch(`api/v1/excess/${startDate}/${endDate}`);
      const data = await res.json();
      setTable(data);
      setExcess = true;
      // var saveFirstDate = startDate;
      // var saveSecondDate = endDate;
      // localStorage.setItem(startDate, saveFirstDate);
      // localStorage.setItem(endDate, saveSecondDate);
      console.log(startDate, endDate);
    } catch (err) { console.error(err); }
  }

  const displayInfo = sales.map((item) => {
    if (excessReportCalled)
    {
      // return functionality and parser here
    }
    return (
      <tr>
        <td>{item.orderId}</td>
        <td>{item.date}</td>
        <td>{item.amount}</td>
        <td>{item.items}</td>
        <td>{item.inventory_ordered}</td>

      </tr>
    );
  });

  return (
    <div className="App">
      <h1>Excess Report </h1>
      <form 
        onSubmit={(event) => {
          editExcessDates();
          event.preventDefault();
          editExcessDates();
        }}
      >
        <input

          type="string"

          placeholder="yyyy-mm-dd"
          onChange={(event) => {
            setStartDate(event.target.value);
          }}
          onKeyPress="setStorage(this)"
        >
        </input>
        <input
          type="string"
          placeholder="yyyy-mm-dd"
          onChange={(event) => {
            setEndDate(event.target.value);
          }}
          onKeyPress="setStorage(this)"
          ></input>
        <button>Submit</button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>orderId</th>
            <th>date</th>
            <th>amount</th>
            <th>items</th>
            <th>inventory_ordered</th>
          </tr>
        </thead>
        <tbody>{displayInfo}</tbody>
      </table>
    </div>

  );

};

// import React from 'react'
// import { useState, useEffect } from "react";
// export default function Excess() {

//   const [date1, setDate1] = useState();
//   const [date2, setDate2] = useState();
//   const [items, setTable] = useState([])

//   async function callExcess(date1, date2) {
//     const res = await fetch(`api/v1/inventory/${date1}/${date2}`)
//     const data = res.json()
//     setTable(data)
//   }
//   // useEffect(() => {
//   //   callExcess(date1,date2);
//   // }, []);
//   const userInput = items.map((displayItem) => {
//     return (
//       <tr>
//         <td>{displayItem.orderId}</td>
//         <td>{displayItem.date}</td>
//         <td>{displayItem.amount}</td>
//         <td>{displayItem.items}</td>
//         <td>{displayItem.inventory_ordered}</td>
//       </tr>
//     );
//   });

//   return (
//     <div className="App">
//       <form
//         onSubmit={(event) => {
//           callExcess(date1, date2);
//         }}
//       >
//         <input
//           type="string"
//           placeholder="yyyy-mm-dd"
//           onChange={(event) => {
//             setDate1(event.target.value);
//           }}
//         >
//         </input>
//         <input
//           type="string"
//           placeholder="yyyy-mm-dd"
//           onChange={(event) => {
//             setDate2(event.target.value);
//           }}
//         ></input>
//       </form>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>orderId</th>
//             <th>date</th>
//             <th>amount</th>
//             <th>items</th>
//             <th>inventory_ordered</th>
//           </tr>
//         </thead>
//         <tbody>{userInput}</tbody>
//       </table>
//     </div>
//   )

