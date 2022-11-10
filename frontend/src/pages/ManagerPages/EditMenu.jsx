import React, { Component } from "react";
import { useState, useEffect } from 'react';
export default function EditMenu() {
    const [menu, setMenu] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.0);
    const [ingredients, setIngredients] = useState([]);
    const [png, setPNG] = useState('');
    const [options, setOptions] = useState('');
    const [id, setID] = useState(0);
    const [idChecker, setIDChecker] = useState(null);


    async function getMenu() {
        try {
            const res = await fetch("api/menuManager");
            const data = await res.json();
            setMenu(data);
            var idList = [];

            for (let i = 0; i < data.length; i++) {
                idList.push(data[i]['id']);
            }
            // const idList = data['id']


        } catch (err) {
            console.error(err);

        }
        idList.sort();
        //console.log(idList);
        return idList
    }
    /**
     * Sends a HTTP put request with new order into the menu
     * @author  Joshua
     * @param   {string} category is the inputed label of the items, entree, dessert, or drink
     * @param   {string} name is the item name
     * @param   {float} price is the manager set price
     * @param   {string} ingredients is the string of item ids that represent the order
     * @param   {string} options are the functioning number of editable items 
     * @param   {int} id is the items unique id
     */
    async function addMenuItem() {
        try {
            var stringIngredients = toString(ingredients)
            var stringOptions = toString(options)
            const res = await fetch(`api/menuManager/${category}/${name}/${price}/${stringIngredients}/${png}/${stringOptions}/${id}`);
            const data = await res.json();
            setMenu(data);
        } catch (err) {
            console.error(err);
        }
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
                <td>{item.options}</td>
                <td>{item.png}</td>




            </tr>
        );
    });

    return (


        <div className="App">
            <h1>Edit Menu </h1>
            <form
                onSubmit={(event) => {addMenuItem();
                }}
            >
                {/* now we plan to dive into what is the hell that is checking user inputs and preventing stupid ones */}

                <select placeholder="category">
                    <option value="entree" onChange={(event) => { setCategory(event.target.value); }}> entree </option>
                    <option value="dessert" onChange={(event) => { setCategory(event.target.value); }}> dessert </option>
                    <option value="drink" onChange={(event) => { setCategory(event.target.value); }}> drink </option>
                </select>
                <input
                    type="number"
                    placeholder="id"
                    onChange={(event) => {
                        // see if the id exists already

                        if (!idChecker.include(event.target.value)) {
                            setID(event.target.value);
                        }
                        else {
                            // if it exists find the last id and add 1
                            setID(idChecker[idChecker.length - 1] + 1);
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
                <select multiple>

                    <option value="1000" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	pepsi </option>
                    <option value="1001" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	diet pepsi </option>
                    <option value="1002" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	gatorade </option>
                    <option value="1003" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	mug rootbeer </option>
                    <option value="1004" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	sierra mist </option>
                    <option value="1005" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	brisk </option>
                    <option value="1006" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	drink cup </option>
                    <option value="1007" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	Lids </option>
                    <option value="1008" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	straws </option>
                    <option value="2007" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	chicken fillet </option>
                    <option value="2008" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	burger fillet </option>
                    <option value="2009" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	chicken tender </option>
                    <option value="2010" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	black bean tender </option>
                    <option value="2011" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	bun </option>
                    <option value="2012" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	lettuce </option>
                    <option value="2013" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	tomato </option>
                    <option value="2014" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	pickles </option>
                    <option value="2015" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	onions </option>
                    <option value="2016" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	american cheese </option>
                    <option value="2017" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	swiss-american cheese </option>
                    <option value="2018" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	fries </option>
                    <option value="2019" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	bacon </option>
                    <option value="2020" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	meal tray </option>
                    <option value="2021" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	salt </option>
                    <option value="2022" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	pepper </option>
                    <option value="2023" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	utensils </option>
                    <option value="2024" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	napkins </option>
                    <option value="3025" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	gigem sauce </option>
                    <option value="3026" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	ketchup </option>
                    <option value="3027" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	mustard </option>
                    <option value="3028" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	mayo </option>
                    <option value="3029" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	ranch </option>
                    <option value="3030" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	honey bbq </option>
                    <option value="3031" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	caesar dressing </option>
                    <option value="4032" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	chocolate ice cream </option>
                    <option value="4033" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	vanilla ice cream </option>
                    <option value="4034" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	strawberry ice cream </option>
                    <option value="4035" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	cookie sandwich </option>
                    <option value="4036" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	dessert cup </option>
                    <option value="4037" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	dessert bowl </option>
                    <option value="4038" onChange={(event) => { setIngredients(newArray => [...newArray, event.target.value]); }}>	cookie </option>
                </select>
                <select multiple>

                    <option value="1000" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	pepsi </option>
                    <option value="1001" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	diet pepsi </option>
                    <option value="1002" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	gatorade </option>
                    <option value="1003" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	mug rootbeer </option>
                    <option value="1004" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	sierra mist </option>
                    <option value="1005" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	brisk </option>
                    <option value="1006" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	drink cup </option>
                    <option value="1007" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	Lids </option>
                    <option value="1008" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	straws </option>
                    <option value="2007" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	chicken fillet </option>
                    <option value="2008" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	burger fillet </option>
                    <option value="2009" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	chicken tender </option>
                    <option value="2010" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	black bean tender </option>
                    <option value="2011" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	bun </option>
                    <option value="2012" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	lettuce </option>
                    <option value="2013" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	tomato </option>
                    <option value="2014" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	pickles </option>
                    <option value="2015" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	onions </option>
                    <option value="2016" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	american cheese </option>
                    <option value="2017" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	swiss-american cheese </option>
                    <option value="2018" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	fries </option>
                    <option value="2019" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	bacon </option>
                    <option value="2020" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	meal tray </option>
                    <option value="2021" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	salt </option>
                    <option value="2022" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	pepper </option>
                    <option value="2023" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	utensils </option>
                    <option value="2024" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	napkins </option>
                    <option value="3025" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	gigem sauce </option>
                    <option value="3026" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	ketchup </option>
                    <option value="3027" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	mustard </option>
                    <option value="3028" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	mayo </option>
                    <option value="3029" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	ranch </option>
                    <option value="3030" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	honey bbq </option>
                    <option value="3031" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	caesar dressing </option>
                    <option value="4032" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	chocolate ice cream </option>
                    <option value="4033" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	vanilla ice cream </option>
                    <option value="4034" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	strawberry ice cream </option>
                    <option value="4035" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	cookie sandwich </option>
                    <option value="4036" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	dessert cup </option>
                    <option value="4037" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	dessert bowl </option>
                    <option value="4038" onChange={(event) => { setOptions(newArray => [...newArray, event.target.value]); }}>	cookie </option>
                </select>
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
                        <th>Options</th>
                        <th>PNG</th>
                    </tr>
                </thead>
                <tbody>{displayInfo}</tbody>
            </table>
        </div>

    );
}