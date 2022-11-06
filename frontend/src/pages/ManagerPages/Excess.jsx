import React, { Component } from "react";
import { useState, useEffect } from 'react';


export default function Revenue() {
  const [sales, setTable] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  async function getExcess() {
    try {
      //const res = await fetch(`api/v1/inventory/${startDate}/${endDate}`);
      const res = await fetch("api/v1/inventory");
      const data = await res.json();
      setTable(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getExcess();
  }, []);


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
      /*onSubmit={(event) => {
         getRevenue(startDate,endDate);
       }}*/
      >
        <input
          type="date"
          placeholder="yyyy-mm-dd"
          onChange={(event) => {
            setStartDate(event.target.value);
          }}
        >
        </input>
        <input
          type="date"
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

}

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
