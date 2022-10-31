import React from 'react';
import './index.css'

export default function Header(props) {
    const {countCartItems} = props;
    return (
        <header className='row block center'>
            <div>
                <h1>SELECT ITEMS TO ADD TO THE CART</h1>
            </div>
            <div>
                <a href='#/cart'>
                    Cart{' '}
                    {countCartItems ? (
                        <button className='badge'>{countCartItems}</button>
                    ) : (
                        ''
                    )}
                </a>{' '}
            </div>
        </header>
    );
}