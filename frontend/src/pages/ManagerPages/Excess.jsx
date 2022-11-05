import React from 'react'
import { useState, useEffect } from "react";
export default function Excess() {

  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [items, setTable] = useState([])

  async function callExcess(date1,date2)
  {
    try {
      const res = await fetch(`api/v1/inventory/${JSON.stringify(date1)}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PATCH",
        },
        body: JSON.stringify(date2),
    });
    setTable(res)
    window.location = "/Excess";
} catch (err) {
    console.error(err);
}
  }
  const userInput = items.map((displayItem) => {
    return(
    <tr>
    <td>{displayItem.orderId}</td>
    <td>{displayItem.date}</td>
    <td>{displayItem.amount}</td>
     <td>{displayItem.items}</td>
      <td>{displayItem.inventory_ordered}</td>
    </tr>
    );
    });

  return (
    <div className="App">
    <form
      onSubmit={(event) => {
        callExcess(date1,date2);
      }}
    >
      <input
        type="string"
        placeholder="yyyy-mm-dd"
        onChange={(event) => {
          setDate1(event.target.value);
        }}
      >
      </input>
      <input
        type="string"
        placeholder="yyyy-mm-dd"
        onChange={(event) => {
          setDate2(event.target.value);
        }}
      ></input>
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
        <tbody>{userInput}</tbody>
    </table>
</div>
  )


}
