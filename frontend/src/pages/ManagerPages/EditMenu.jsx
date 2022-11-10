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

    
    const displayUserInput= () =>
    {
        var returnTranslate ="Ingredients: ";

        for (let i = 0; i < menu.length; i++) {
            for( let jIndex = 0 ; jIndex < ingredients.length ; jIndex++)
                 console.log(ingredients[jIndex])
                // if(parseInt(ingredients[jIndex]) === menu[i]['id'])
                // {
                //     console.log(ingredients[jIndex])
                //     returnTranslate+= menu[i]['name'];
                // }
        }
        return (returnTranslate);
    }

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
                onSubmit={(event) => {
                    addMenuItem();
                }}
            >
                {/* now we plan to dive into what is the hell that is checking user inputs and preventing stupid ones */}

                <select placeholder="category" onChange={(event) => { setCategory(event.target.value); console.log(event.target.value); }}>
                    <option value=""> null </option>
                    <option value="entree"> entree </option>
                    <option value="dessert" > dessert </option>
                    <option value="drink" > drink </option>
                </select>
                <input
                    type="number"
                    placeholder="id"
                    onChange={(event) => {
                        // see if the id exists already

                        if (!idChecker.includes(event.target.value)) {
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
                <select onChange={(event) => {
                    var initalizeIngredients = true;
                    if (initalizeIngredients) {
                        setIngredients(newArray => [...newArray, event.target.value]);
                        initalizeIngredients = false;
                    }
                    else if (!ingredients.includes(event.target.value)) {
                        setIngredients(newArray => [...newArray, event.target.value]);
                    }
                    console.log(ingredients)
                }}
                >
                    <option> null </option>
                    <option value="1000" >	pepsi </option>
                    <option value="1001">	diet pepsi </option>
                    <option value="1002">	gatorade </option>
                    <option value="1003">	mug rootbeer </option>
                    <option value="1004">	sierra mist </option>
                    <option value="1005">	brisk </option>
                    <option value="1006">	drink cup </option>
                    <option value="1007">	Lids </option>
                    <option value="1008">	straws </option>
                    <option value="2007">	chicken fillet </option>
                    <option value="2008">	burger fillet </option>
                    <option value="2009">	chicken tender </option>
                    <option value="2010">	black bean tender </option>
                    <option value="2011">	bun </option>
                    <option value="2012">	lettuce </option>
                    <option value="2013">	tomato </option>
                    <option value="2014">	pickles </option>
                    <option value="2015">	onions </option>
                    <option value="2016">	american cheese </option>
                    <option value="2017">	swiss-american cheese </option>
                    <option value="2018">	fries </option>
                    <option value="2019">	bacon </option>
                    <option value="2020">	meal tray </option>
                    <option value="2021">	salt </option>
                    <option value="2022">	pepper </option>
                    <option value="2023">	utensils </option>
                    <option value="2024">	napkins </option>
                    <option value="3025">	gigem sauce </option>
                    <option value="3026">	ketchup </option>
                    <option value="3027">	mustard </option>
                    <option value="3028">	mayo </option>
                    <option value="3029">	ranch </option>
                    <option value="3030">	honey bbq </option>
                    <option value="3031">	caesar dressing </option>
                    <option value="4032">	chocolate ice cream </option>
                    <option value="4033">	vanilla ice cream </option>
                    <option value="4034">	strawberry ice cream </option>
                    <option value="4035">	cookie sandwich </option>
                    <option value="4036">	dessert cup </option>
                    <option value="4037">	dessert bowl </option>
                    <option value="4038">	cookie </option>
                </select>


                <select
                onChange={(event) => {
                    var initalizeOptions = true;
                    if (initalizeOptions) {
                        setOptions(newArray => [...newArray, event.target.value]);
                        initalizeOptions = false;
                    }
                    else if (!options.includes(event.target.value)) {
                        setOptions(newArray => [...newArray, event.target.value]);
                    }
                    console.log(options)
                }}>

                    <option value="1000">	pepsi </option>
                    <option value="1001">	diet pepsi </option>
                    <option value="1002">	gatorade </option>
                    <option value="1003">	mug rootbeer </option>
                    <option value="1004">	sierra mist </option>
                    <option value="1005">	brisk </option>
                    <option value="1006">	drink cup </option>
                    <option value="1007">	Lids </option>
                    <option value="1008">	straws </option>
                    <option value="2007">	chicken fillet </option>
                    <option value="2008">	burger fillet </option>
                    <option value="2009">	chicken tender </option>
                    <option value="2010">	black bean tender </option>
                    <option value="2011">	bun </option>
                    <option value="2012">	lettuce </option>
                    <option value="2013">	tomato </option>
                    <option value="2014">	pickles </option>
                    <option value="2015">	onions </option>
                    <option value="2016">	american cheese </option>
                    <option value="2017">	swiss-american cheese </option>
                    <option value="2018">	fries </option>
                    <option value="2019">	bacon </option>
                    <option value="2020">	meal tray </option>
                    <option value="2021">	salt </option>
                    <option value="2022">	pepper </option>
                    <option value="2023">	utensils </option>
                    <option value="2024">	napkins </option>
                    <option value="3025">	gigem sauce </option>
                    <option value="3026">	ketchup </option>
                    <option value="3027">	mustard </option>
                    <option value="3028">	mayo </option>
                    <option value="3029">	ranch </option>
                    <option value="3030">	honey bbq </option>
                    <option value="3031">	caesar dressing </option>
                    <option value="4032">	chocolate ice cream </option>
                    <option value="4033">	vanilla ice cream </option>
                    <option value="4034">	strawberry ice cream </option>
                    <option value="4035">	cookie sandwich </option>
                    <option value="4036">	dessert cup </option>
                    <option value="4037">	dessert bowl </option>
                    <option value="4038">	cookie </option>
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
                <p>{displayUserInput}</p>


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