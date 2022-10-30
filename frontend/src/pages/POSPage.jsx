import React, { useEffect, useState } from 'react';


const POSPage = () => {
    const [menu, setMenu] = useState([]);

   useEffect(() => {
      getMenu();
   }, []);

   async function getMenu() {
      try 
      {
         const res = await fetch("http://localhost:3001/api/v1/pos");
         const data = await res.json();
         setMenu(data);
      } 
      catch (err) 
      {
         console.log(err);
      }
   }

   return (
      <div className="App">
         {menu.map((menuItem, index) => (
            <div key={index}>
               <p>
                  <button>{menuItem.name}</button>
               </p>
            </div>
         ))}
      </div>
   );
}

export default POSPage;