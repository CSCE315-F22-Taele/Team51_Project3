import React from "react";
import { useSelector } from "react-redux";
import "../../pages/POS/pos.css";

export default function Product(props) {
    const { product, onAdd } = props;
    const { type } = useSelector((state) => state.auth);
    const userType = type["type"];
    const name = product.name;
    const png = product.png;
    const price = product.price;

    return (
        <div className="menu-item" onClick={() => onAdd(product)}>
            {userType === "user" ? (
                <img
                    className=""
                    src={`./posPhotos/${png}`}
                    alt={name}
                ></img>
            ) : null}
            <h3 className="menu-item--name products">{name}</h3>
            {userType === "user" ? (
                <div className="menu-item--price products">{`${price}`}</div>
            ) : null}
        </div>
    );
}
