import React from 'react'
import { useState, useEffect } from "react";
export default function Excess() {

  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [items, setTable] = useState([])

  async function callExcess(date1,date2)
  {
    try {
      const res = await fetch(`api/v1/inventory/${date1},${date2}`);
      const data = await res.json();
      setTable(data);
  } catch (err) {
      console.error(err);
  }
  }
  const userInput = () => {
  }

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
                <th>inventory ordered</th>
            </tr>
        </thead>
        <tbody>{userInput}</tbody>
    </table>
</div>
  )


}
