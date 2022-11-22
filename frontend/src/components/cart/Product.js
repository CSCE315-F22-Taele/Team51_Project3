import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

export default function Product(props) {
    const { product, onAdd } = props;
    const { isAuth, type } = useSelector((state) => state.auth);

    return (
        <div>
            {type["type"] === "user" ? (
                <img
                    className="small"
                    src={`./posPhotos/${product.png}`}
                    alt={product.name}></img>
            ) : null}
            <h3>{product.name}</h3>
            <div>${product.price}</div>
            <div>
                <button onClick={() => onAdd(product)}>Add To Cart</button>
            </div>
        </div>
    );
}
