import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { useState, useEffect } from 'react';


function Revenue() {
  const[sales, setRevenue] = useState([]);

  //getRevenue();
  useEffect(()=> {
      getRevenue();
  }, []);

  async function getRevenue() {
      try {
         const res = await fetch("api/v1/revenue");
         const data = await res.json();
         setRevenue(data);
         //console.log(data);
      }
      catch (err) {
         console.log(err);
      }
   }
  }


  class App extends Component {
    render() {
      return (
        <ReactEcharts
          option={{
            xAxis: {
              type: "category",
              //needs to be orderids from orderinfo
              data: ["ID#", "ID#", "ID#", "ID#", "ID#", "ID#", "ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#","ID#"]
            },
            yAxis: {

              name: "Revenue of Menu Items",

              type: "value"
            },
            series: [{ 
              //hardcoded right now, but needs to be revenue
              data: [820, 932, 901, 934, 820, 932, 901, 934,820, 932, 901, 934, 1290, 1330, 1320, 1290, 1330, 1320, 1290, 1330, 1320],
              type: "bar"
            }]
          }}
        />
      );
    }
  }
  export default App;

/*import React from 'react'
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// const client = new ApolloClient({
//     uri: "api/v1/graphql",
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
           const res = await fetch("api/v1/revenue");
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
        fetch("api/v1/revenue", {
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