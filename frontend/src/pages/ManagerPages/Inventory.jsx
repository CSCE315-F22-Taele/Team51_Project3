import { useState, useEffect } from 'react';


export default function Inventory() {
   const [items, setInventory] = useState([]);
   const [amount, setAmounts] = useState({});

   useEffect(() => {
      getInventory();
   }, []);

   async function getInventory() {
      try {
         const res = await fetch("api/v1/inventory");
         const data = await res.json();
         setInventory(data);
      }
      catch (err) {
         console.log(err);
      }
   }

   async function editInventory() {
      try {
         const res = await fetch("api/v1/inventory");
         const data = await res.json();

      }
      catch (err) {
         console.log(err);
      }
   }
   const handleChange = (event) =>
   {
      // here should be the database call and thhen we can rerender the input
      
   }
   const displayData = items.map((item) => {
      return (
         <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
               <form>
                  <input type='number' name={item.name} value={amount.name || ""} onChange={handleChange}></input>
               </form>
            </td>
            <td>{item.inventory}</td>
         </tr>
      )
   })

   return (
      <div className="App">
         <table className='table table-striped'>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Change Amount</th>
                  <th>Inventory</th>
               </tr>
            </thead>
            <tbody>
               {displayData}
            </tbody>
         </table>
      </div>
   )
}

