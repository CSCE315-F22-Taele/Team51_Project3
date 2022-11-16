import React, { Component } from "react";
import { useState, useEffect } from 'react';


export default function Revenue() {
  const[sales, setRevenue] = useState([]);
  const[startDate, setStartDate]= useState();
  const[endDate, setEndDate]= useState();

  async function getSales() {
    try {
        //const res = await fetch(`api/revenue/${startDate}/${endDate}`);
        const res = await fetch("api/revenue");
        const data = await res.json();
        setRevenue(data);
    } catch (err) {
        console.error(err);
    }
}

useEffect(() => {
    getSales();
}, []);

  // //getRevenue();
  // useEffect(()=> {
  //     getRevenue();
  // }, []);

/*
  async function getRevenue(startDate,endDate) {
    try {
        const res = await fetch(`api/revenue/${startDate}/${endDate}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Acces-Control-Allow-Methods": "PATCH",
          },
          body: JSON.stringify(sales),
        });
        setRevenue(res);
        window.location = "/Revenue";
        // const data = await res.json();
        //console.log(data);
    }
    catch (err) {
        console.log(err);
    }
   }
   */

   const displayInfo = sales.map((item) => {
    return (
      <tr>
        <td> {item.name} </td>
        <td> {item.revenue} </td>

      </tr>
    );
   });

   return (
      <div className="App">
        <h1>Sales Report </h1>
      <form
       /*onSubmit={(event) => {
          getRevenue(startDate,endDate);
        }}*/
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
                    <th>item</th>
                    <th>revenue</th>
                </tr>
            </thead>
            <tbody>{displayInfo}</tbody>
        </table>
    </div>
    
   );

}
  // class App extends Component {
  //   render() {
  //     return (
  //       <ReactEcharts
  //         option={{
  //           xAxis: {
  //             type: "category",
  //             //needs to be orderids from orderinfo
  //             data: ["ID#", "ID#", "ID#", "ID#", "ID#", "ID#", "ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#"]
  //           },
  //           yAxis: {

  //             name: "Revenue of Menu Items",

  //             type: "value"
  //           },
  //           series: [{ 
  //             //hardcoded right now, but needs to be revenue
  //             data: [820, 932, 901, 934, 820, 932, 901, 934,820, 932, 901, 934, 1290, 1330, 1320, 1290, 1330, 1320, 1290, 1330, 1320],
  //             type: "bar"
  //           }]
  //         }}
  //       />
  //     );
  //   }
  // }
  // export default App;

/*import React from 'react'
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// const client = new ApolloClient({
//     uri: "api/graphql",
//     cache: new InMemoryCache(),
//   });
function Revenue() {
    const[sales, setRevenue] = useState([]);
    //getRevenue();
    useEffect(()=> {
        getRevenue();
    }, []);
    async function getRevenue() {
        try {
           const res = await fetch("api/revenue");
           const data = await res.json();
           setRevenue(data);
           //console.log(data);
        }
        catch (err) {
           console.log(err);
        }
     }
    return (
    <div className="App">
        <h1> ENTER NUMBER DAYS: </h1>
        <EnterNumberDays />
        {sales.map((sales, index) => (
        <div key={index}>
            <h2>{sales.title}</h2>
        </div>
    ))}
    </div>
    
    );
}
export default Revenue;
//create a text box for user to enter number of days in time window
function EnterNumberDays() {
    const[days, setDays] = useState('');
    function handleSubmit(e) {
        e.preventDefault(); //browser doesn't refresh page upon submit
        fetch("api/revenue", {
            method: 'POST',
            body: JSON.stringify({days}),
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='days'
                value={days} //bind value to input
                onChange={(e) => setDays(e.target.value)}
            />
            <button>Submit</button>
        </form>
    );
}*/