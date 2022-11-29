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
                <div className="menu-item--info">
                    <div className="menu-item--price text--right">{`$${price}`}</div>
                    <img
                        className="menu-item--photo"
                        src={`./posPhotos/${png}`}
                        alt={name}
                    ></img>
                    <h3 className="menu-item--name ">{name}</h3>
                </div>
            ) : (
                <div>
                    <h3 className="menu-item--name ">{name}</h3>
                </div>
            )}
        </div>
    );
}
