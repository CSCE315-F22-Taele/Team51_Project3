import React from "react";
import { useSelector } from "react-redux";
import "./pos.css";

/**
 * @author Will
 * @param {*} props product (menu item, see menu in POSPage) and onAdd (see POSPage)
 * @returns data for each product
 */
export default function Product(props) {
    const { product, onAdd, isColorBlind} = props;
    const { type } = useSelector((state) => state.auth);
    const userType = type["type"];
    const name = product.name;
    const png = product.png;
    const price = product.price;

    return !isColorBlind ? (
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
    ): (
        <div className="menu-item-colorblind" onClick={() => onAdd(product)}>
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
