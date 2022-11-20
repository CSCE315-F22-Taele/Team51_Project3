import React from "react";
import { useState, useEffect } from "react";

import "./index.css"

export default function Product(props) {
    const { product, onAdd } = props;

    //const [fontSize, setFontSize] = useState(16); //for inc and dec font size

    return (
        <div className="App">
                <div>
                    <img 
                    className="small" src={`./posPhotos/${product.png}`} alt={product.name}></img>
                    <h3
                    >{product.name}</h3>
                    <div
                    >${product.price}</div>
                    <div>
                        <button onClick={() => onAdd(product)}>Add To Cart</button>
                </div>
            </div>
        </div>
    );
}
