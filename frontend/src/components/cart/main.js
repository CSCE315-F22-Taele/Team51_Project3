//import React from 'react';
import './index.css';
import Product from './Product';

const Main = (props) => {
    const {menu, onAdd} = props;

    return (
        <main className='block col-2'>
            <h2>Products</h2>
            <div className='row'>
            {menu.map((product) => (
                <Product key={product.id} product = {product} onAdd={onAdd}></Product>
            ))}
            </div>
        </main>
    );
}

export default Main;