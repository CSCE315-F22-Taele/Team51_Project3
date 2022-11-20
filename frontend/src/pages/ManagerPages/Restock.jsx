import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

export default function Restock() {
  const [items, setTable] = useState([]);
  const [inventory, setInventory] = useState();
  const [inventoryCheck, setCheck] = useState(100);

  const navigate = useNavigate();

  useEffect(() => { getTable(); }, []
  );

  async function getTable() {
    try {
      const res = await fetch("api/inventory");
      const data = await res.json();
      setTable(data);
    } catch (err) {
      console.error(err);
    }
  }

  const displayInfo = items.map((item) => {
    const restockNeeded = () => {
      if (item.inventory < inventoryCheck) {
        return "restock needed"
      }
      else {
        return "item is fine"
      }
    }
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.inventory}</td>
        <td>{restockNeeded()}</td>

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
      <h1>Restock Report </h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>inventory</th>
            <th>Restock Needed?</th>

          </tr>
        </thead>
        <tbody>{displayInfo}</tbody>
      </table>
    </div>
  );

}
