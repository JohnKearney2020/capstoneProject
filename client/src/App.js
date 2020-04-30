import React, { useState } from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import items from './api/api-items'
import Product from './components/Product/Product'
import Cart from './components/Cart/Cart'
import CheckoutForm from './components/CheckoutForm/CheckoutForm'
import './index.css'
import logo from './logo.svg'



export default function App () {
    const [itemsInCart, setItemsInCart] = useState([]);

    const handleAddToCartClick = id => {
        setItemsInCart(itemsInCart => {
            const itemInCart = itemsInCart.find(item => item.id === id);
            //if item found in cart then update the quantity
            if(itemInCart){
                return itemsInCart.map(item => {
                    if(item.id !==id) return item;
                    return {...itemInCart, quantity: item.quantity + 1};
                })
            }
            //else, add new itme into cart
            const item = items.find(item => item.id === id);
            return [...itemsInCart, {...item, quantity: 1}]
        });
    };
    const totalCost = itemsInCart.reduce(
        (acc,item) => acc + item.price * item.quantity, 0
    );
    
    
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <h1 className="app-header-name">Jesse's Shop</h1>
            </header>
            <main className="app-shop">
                <div className="app-products">
                    {items.map(item => (

                        <Product key={item.title} title={item.title} price={item.price} onAddToCart={() => handleAddToCartClick(item.id)} />

                    ))}
                </div>
                <Cart itemsInCart={itemsInCart} totalCost={totalCost}/>
                {itemsInCart.length > 0 && (
                    <StripeProvider apiKey="pk_test_YxnZKhFG2YcQdDL6B5KZwmey00rQAe3YsL">
                        <Elements>
                            <CheckoutForm totalCost={totalCost} />
                        </Elements>
                    </StripeProvider>
                )}
            </main>
        </div>
    );
}