
import { useState, useEffect } from 'react';


export default function Inventory() {
   const [items, setInventory] = useState([]);
   const [amount, editInventoryById] = useState([]);
   
   
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

   async function changeInventory(amount, id ) {
      try {
         const res = await fetch("api/v1/inventory/?amount=${amount}&id=${id}");
         const data = await res.json();
         editInventoryById(data);

      }
      catch (err) {
         console.log(err);
      }
   }
   const displayData = items.map((item) => {
      // const handleChange = (amount,id) =>
      // {
      //    // here should be the database call and thhen we can rerender the input
      //    const { data, status } = useQuery([amount, id], editInventory)
      //    // setAmounts( values =>( {...values, [items.inventory] :values}))
      // }
      return (
         <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
               <form>
                  <input type='number' name={item.name} defaultValue={item.inventory} onChange={changeInventory(amount,item.id)}
                  >

                  </input>
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

