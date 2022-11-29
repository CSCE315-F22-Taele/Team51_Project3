import React, { useEffect } from "react";
import "./pos.css";

export default function Basket(props) {
    const { cartItems, onAdd, onRemove, onCheckout } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0); //basically, loop for adding prices
    const taxPrice = itemsPrice * 0.0825; //texas sales taxes are typically 8.25% for restaurants
    const totalPrice = itemsPrice + taxPrice;

    useEffect(() => {
        let basketDiv = document.getElementsByClassName("cart--basket")[0];
        basketDiv.scrollTop = basketDiv.scrollHeight;
    }, [cartItems]);

    return (
        <div className="cart">
            <div className="cart__container">
                <div className="cart--basket">
                    {cartItems.map((item) => (
                        <div key={item.id} className="item__container">
                            <div className="item--name">{item.name}</div>
                            <div className="item--action">
                                <button onClick={() => onRemove(item)} className="remove action-btn">
                                    -
                                </button>
                                <button onClick={() => onAdd(item)} className="add action-btn">
                                    +
                                </button>
                            </div>
                            <div className="item--price">
                                {item.qty} x ${item.price.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart--info">
                    <hr></hr>
                    <div className="cart--info__box">
                        <div className="">Price of Items</div>
                        <div className="">${itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className="cart--info__box">
                        <div className="">Sales Tax</div>
                        <div className="">${taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="cart--info__box">
                        <div className="">Total Price</div>
                        <div className="">${totalPrice.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div className="cart--checkout">
                <button className="checkout-btn" onClick={onCheckout}>Checkout ${totalPrice.toFixed(2)}</button>
            </div>
        </div>
    );
}
