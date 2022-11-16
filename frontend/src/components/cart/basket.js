import React from 'react';
import './index.css';

export default function Basket(props) {
    const { cartItems, onAdd, onRemove, onCheckout } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0); //basically, loop for adding prices
    const taxPrice = itemsPrice * 0.0825; //texas sales taxes are typically 8.25% for restaurants
    const totalPrice = itemsPrice + taxPrice;



    return (
        <aside className='block col-1'>
            <h2>Cart Items</h2>
            <div> {cartItems.length === 0 && <div>Cart is Empty</div>} </div>
            {cartItems.map((item) => (
                <div key={item.id} className="row">
                    <div className='col-2'>{item.name}</div>
                    <div className='col-2'>
                        <button onClick={() => onRemove(item)} className="remove">-</button>
                        <button onClick={() => onAdd(item)} className="add">+</button>
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
                        <div className='col-2'>Price of Items</div>
                        <div className='col-1 text-right'>${itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className='row'>
                        <div className='col-2'>Sales Tax</div>
                        <div className='col-1 text-right'>${taxPrice.toFixed(2)}</div>
                    </div>
                    <div className='row'>
                        <div className='col-2'>Total Price</div>
                        <div className='col-1 text-right'>${totalPrice.toFixed(2)}</div>
                    </div>
                    <hr />
                    <div className='row'>
                        <button onClick={onCheckout}>Checkout</button>
                    </div>
                </>
            )}
        </aside>
    );
}

