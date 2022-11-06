import React, { Component } from "react";
import { useState, useEffect } from 'react';


export default function Revenue() {
  const [sales, setTable] = useState([]);
  const [firstDate, setStartDate] = useState();
  const [secondDate, setEndDate] = useState();

  async function getExcess() {
    try {
      const res = await fetch("api/v1/excess");
      console.log(res)
      const data = await res.json();
      setTable(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getExcess();
  }, []);

  async function editExcessDates() {
    try {
      const res = await fetch(`api/v1/excess/${firstDate}/${secondDate}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Acces-Control-Allow-Methods": "PATCH",
        },
        body: JSON.stringify(sales),
      });
      setTable(res);
      window.location = "/Excess";

    }
    catch (err) {
      console.log(err);
    }
  }

  const displayInfo = sales.map((item) => {
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


// }
