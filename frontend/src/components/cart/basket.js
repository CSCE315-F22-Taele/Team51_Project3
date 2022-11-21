import React from 'react';
import './index.css';
import { useState, useEffect } from "react";

export default function Basket(props) {
    const { cartItems, onAdd, onRemove, onCheckout } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0); //basically, loop for adding prices
    const taxPrice = itemsPrice * 0.0825; //texas sales taxes are typically 8.25% for restaurants
    const totalPrice = itemsPrice + taxPrice;

    const [fontSize, setFontSize] = useState(16); //for inc and dec font size

    return (
        <aside className='block col-1'>
            <button onClick={() => setFontSize(fontSize + 2)} > 
            + size
            </button>
            <button onClick={() => setFontSize(fontSize - 2)} > 
            - size
            </button>

            <h2
            style={{fontSize: `${fontSize}px`}}
            >Cart Items</h2>
            <div> {cartItems.length === 0 && <div
            style={{fontSize: `${fontSize}px`}}
            >Cart is Empty</div>} </div>
            {cartItems.map((item) => (
                <div
                style={{fontSize: `${fontSize}px`}}
                key={item.id} className="row">
                    <div 
                    style={{fontSize: `${fontSize}px`}}
                    className='col-2'>{item.name}</div>
                    <div className='col-2'>
                        <button 
                        style={{fontSize: `${fontSize}px`}}
                        onClick={() => onRemove(item)} className="remove">-</button>
                        <button
                        style={{fontSize: `${fontSize}px`}} 
                        onClick={() => onAdd(item)} className="add">+</button>
                    </div>
                    <div className='col-2 text-right'>
                        {item.qty} x ${item.price.toFixed(2)}
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                <>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-2'
                        style={{fontSize: `${fontSize}px`}}
                        >Price of Items</div>
                        <div className='col-1 text-right'
                        style={{fontSize: `${fontSize}px`}}
                        >${itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className='row'>
                        <div className='col-2'
                        style={{fontSize: `${fontSize}px`}}
                        >Sales Tax</div>
                        <div className='col-1 text-right'
                        style={{fontSize: `${fontSize}px`}}
                        >${taxPrice.toFixed(2)}</div>
                    </div>
                    <div className='row'>
                        <div className='col-2'
                        style={{fontSize: `${fontSize}px`}}
                        >Total Price</div>
                        <div className='col-1 text-right'
                        style={{fontSize: `${fontSize}px`}}
                        >${totalPrice.toFixed(2)}</div>
                    </div>
                    <hr />
                    <div className='row'>
                        <button 
                        style={{fontSize: `${fontSize}px`}}
                        onClick={onCheckout}>Checkout</button>
                    </div>
                </>
            )}
        </aside>
    );
}

