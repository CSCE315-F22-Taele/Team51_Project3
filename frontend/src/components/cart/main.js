//import React from 'react';
import './index.css';
import Product from './Product';

const Main = (props) => {
    const {menu, onAdd} = props;

    return (
        <main className="menu">
            <div className="menu__container">
            {menu.map((product) => (
                <Product key={product.id} product = {product} onAdd={onAdd}></Product>
            ))}
            </div>
        </main>
    );
}

export default Main;