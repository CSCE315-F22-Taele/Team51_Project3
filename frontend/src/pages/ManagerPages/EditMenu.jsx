import React, { Component } from "react";
import { useState, useEffect } from 'react';
export default function EditMenu() {
    const [menu, setMenu] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.0);
    const [ingredients, setIngredients] = useState('');
    const [png, setPNG] = useState('');
    const [options, setOptions] = useState('');
    const [id, setID] = useState(0);
    const [idChecker, setIDChecker] = useState([]);

    async function getMenu() {
        try {
            const res = await fetch("api/v1/menuManager");
            const data = await res.json();
            setMenu(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getMenu();
    }, []);

    const displayInfo = menu.map((item) => {
        const makeIDlist = (idList) => {
            setIDChecker(idList);
        }
        return (
            <tr>
                <td>{item.category}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.ingredients}</td>
                <td>{item.png}</td>
                <td>{item.options}</td>

            </tr>
        );
    });
    return (
        <div className="App">
            <h1>Edit Menu </h1>
            <form
                onSubmit={(event) => {
                }}
            >
                <select placeholder="category">  
                <option value="entree" onChange={(event) => {setCategory(event.target.value);}}> entree </option>  
                <option value="dessert" onChange={(event) => {setCategory(event.target.value);}}> dessert </option>  
                <option value="drink" onChange={(event) => {setCategory(event.target.value);}}> drink </option>  
                </select>  
                <input
                    type="number"
                    placeholder="id"
                    onChange={(event) => {
                        setID(event.target.value);
                    }}
                ></input>
                <input
                    type="string"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                ></input>
                <input
                    type="number"
                    onChange={(event) => {
                        setPrice(event.target.value);
                    }}
                ></input>
                <input
                    type="string"
                    onChange={(event) => {
                        setIngredients(event.target.value);
                    }}
                ></input>
                <input
                    type="string"
                    onChange={(event) => {
                        setOptions(event.target.value);
                    }}
                ></input>
                <input
                    type="string"
                    onChange={(event) => {
                        setPNG(event.target.value);
                    }}
                ></input>



                <button onClick >Add New Menu Item</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Ingredients</th>
                        <th>Modifiable</th>
                        <th>PNG</th>
                        <th>options</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>{displayInfo}</tbody>
            </table>
        </div>

    );
}