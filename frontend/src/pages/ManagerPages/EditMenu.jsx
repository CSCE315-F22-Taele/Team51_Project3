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
    const [idChecker, setIDChecker] = useState(null);

    async function getMenu() {
        try {
            const res = await fetch("api/v1/menuManager");
            const data = await res.json();
            setMenu(data);
            var idList = [];

            for (let i = 0 ; i < data.length ; i++)
            {
                console.log(data[i]['id'])
                idList.append(parseInt(data[i]['id']));
            }

            
        } catch (err) {
            console.error(err);

        }
        console.log(idList);
        return idList
    }
    // this returns a list of ids from the menu to error check with the user
    useEffect(() => {
        setIDChecker(getMenu());

    }, []);

    const displayInfo = menu.map((item) => {
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

                        if(! idChecker.find(event.target.value))
                        {
                            setID(event.target.value);
                        }
                        else{
                            alert( "pick a unique id ")
                        }

                    }}
                ></input>
                <input
                    type="string"
                    placeholder="name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                ></input>
                <input
                    type="number"
                    placeholder="price"
                    onChange={(event) => {
                        setPrice(event.target.value);
                    }}
                ></input>
                <input
                    type="string"
                    placeholder="ingredients"
                    onChange={(event) => {
                        setIngredients(event.target.value);
                    }}
                ></input>
                <input
                    type="string"
                    placeholder="options"
                    onChange={(event) => {
                        setOptions(event.target.value);
                    }}
                ></input>
                <input
                    type="string"
                    placeholder="png"
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
                        <th>PNG</th>
                    </tr>
                </thead>
                <tbody>{displayInfo}</tbody>
            </table>
        </div>

    );
}