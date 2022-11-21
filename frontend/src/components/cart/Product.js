import React from "react";
import "./index.css"

export default function Product(props) {
    const { product, onAdd } = props;
    
    return (
        <div>
            <img className="small" src={`./posPhotos/${product.png}`} alt={product.name}></img>
            <h3>{product.name}</h3>
            <div>${product.price}</div>
            <div>

                <img
                    className="small" src={`./posPhotos/${product.png}`} alt={product.name}>
                </img>
        
                <h3
                    className="products"
                    >{product.name}
                </h3>
                    <div
                        className="products"
                    >
                    ${product.price}
                    </div>
                <div>
                    <button 
                    onClick={() => onAdd(product)}>
                        Add To Cart
                    </button>
                </div> 
            </div>
        </div>
    );
}
