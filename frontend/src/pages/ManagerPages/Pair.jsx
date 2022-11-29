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

    // async function editPairDates() {
    //     try {
    //         console.log(`api/pair/${startDate}/${endDate}`);
    //         const res = await fetch(`api/pair/${startDate}/${endDate}`);
    //         const data = await res.json();
    //         setTable(data);
    //         setPair(true);

    //         console.log(startDate, endDate);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    async function insertPairDates() {
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

    async function removePair() {
        try {
            console.log(`api/pair/:t`);
            const res = await fetch(`api/pair/:t`);
            const data = await res.json();
            setTable(data);
            setPair(true);

        } catch (err) {
            console.error(err);
        }
      }

    async function editPairDates() {
      try {
          console.log(`api/pair/`);
          const res = await fetch(`api/pair/`);
          const data = await res.json();
          setTable(data);
          setPair(true);

          console.log(startDate, endDate);
      } catch (err) {
          console.error(err);
      }
    }

    const displayInfo = sales.map((item) => {
        if (pairReportCalled) {
            // return functionality and parser here
        }
        return (
            <tr>
                <td
                style={{fontSize: `${fontSize}px`}}
                >{item.name}</td>
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
                    // insertPairDates();
                    // editPairDates();
                    event.preventDefault();
                    // insertPairDates();
                    // editPairDates();
                    removePair();
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
                <tbody>{displayInfo}</tbody>
            </table>
        </div>
    );
}

