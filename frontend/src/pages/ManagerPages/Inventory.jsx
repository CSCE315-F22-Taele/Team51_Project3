import { useState, useEffect } from 'react';


const Inventory = () => {
   const [items, setInventory] = useState([]);

   useEffect(() => {
      getInventory();
   }, []);

   async function getInventory() {
      try {
         const res = await fetch("http://localhost:3001/api/v1/inventory");
         const data = await res.json();
         setInventory(data);
      }
      catch (err) {
         console.log(err);
      }
   }

   const displayData = items.map((item) => {
      return (
         <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
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

export default Inventory;
