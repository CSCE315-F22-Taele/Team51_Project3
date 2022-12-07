import React, { Component } from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

export default function Pair() {
    const [sales, setTable] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [pairReportCalled, setPair] = useState(false);
    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(16); //for inc and dec font size




    /**
     * Sends a HTTP PATCH request with the quantity of the ID to be modified
     * @author  Mohnish
     * @param   {date} startDate first date for btwn
     * @param   {date} endDate second date in btwn
     */


    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function insertPairDates(event) {
      await delay(1000);
      event.preventDefault();
      try {
          const res = await fetch(`/api/pair/${startDate}/${endDate}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "PATCH",
            },
          });
          
          const data = await res.json();
          setTable(data);
          setPair(true);

          console.log(startDate, endDate);
      } catch (err) {
          console.error(err);
      }
    }

    async function removePair(event) {
        event.preventDefault();
        try {
          const res = await fetch("/api/pair/:t", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE",
                },

            });
            
          const data = await res.json();
          setTable(data);
          setPair(true);
        
          console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    // async function editPairDates(event) {
    //   event.preventDefault();
    //   try {
    //       console.log(`api/pair/`);
    //       const res = await fetch(`api/pair/`);
    //       const data = await res.json();
    //       setTable(data);
    //       setPair(true);

    //       console.log(startDate, endDate);
    //   } catch (err) {
    //       console.error(err);
    //   }
    // }

    async function getPair(event) {
        await delay(3000);
        event.preventDefault();
        try {
            console.log(`api/pair/:p`);
            const res = await fetch(`api/pair/:p`);
            const data = await res.json();
            const temp = data;
            setTable(data);
            setPair(true);
            // for (let i = 0; i < data.length; i++) {
            //     temp[i] = data[data.length-i-1];
            // }
            console.log(data);
        } catch (err) {
            console.error(err);
        }
      }

    const displayInfo1 = sales.slice(0, -1).map((item, index, array) => {
        return (
            <tr>
                <td
                style={{fontSize: `${fontSize}px`}}
                >{item.name}</td>    
            </tr>
        );
    });
    
    const displayInfo2 = sales.slice(1).map((item, index, array) => {
        return (
            <tr>
                <td
                style={{fontSize: `${fontSize}px`}}
                >{item.name}</td>
            </tr>
        );
    });

    return (
        <div className="App">
            <tr>
                <th> <div>
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
                </div> </th>
                <th><button onClick={() => setFontSize(fontSize + 2)} >
                    + increase font size
                </button> </th>
                <th> <button onClick={() => setFontSize(fontSize - 2)} >
                    - decrease font size
                </button> </th>
            </tr>
            <h1>Pair Report </h1>
            <form
                onSubmit={(event) => {
                    removePair(event);
                    insertPairDates(event);
                    getPair(event);
                }}>
                <input
                    type="string"
                    placeholder="yyyy-mm-dd"
                    onChange={(event) => {
                        setStartDate(event.target.value);
                    }}
                    onKeyPress="setStorage(this)"></input>
                <input
                    type="string"
                    placeholder="yyyy-mm-dd"
                    onChange={(event) => {
                        setEndDate(event.target.value);
                    }}
                    onKeyPress="setStorage(this)"></input>
                <button>Submit</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th
                        style={{fontSize: `${fontSize}px`}}
                        >Item 1</th>
                        <th
                        style={{fontSize: `${fontSize}px`}}
                        >Item 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                        style={{fontSize: `${fontSize}px`}}
                        >{displayInfo1}</td>
                        <td
                        style={{fontSize: `${fontSize}px`}}
                        >{displayInfo2}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

