import React from 'react'
import CartItem from './CartItem/CartItem'


export default function Cart({ itemsInCart, totalCost }) {
    return (
        <div className="cart">
            <h2 className="cart-title">Shopping Cart</h2>
            {itemsInCart.length ? (
                <div>
                    {itemsInCart.map(item => (
                        <CartItem
                            key={item.id}
                            title={item.title}
                            cost={item.price * item.quantity}
                            quantity={item.quantity}
                        />
                    ))}
                    <div className="total-cost">
                        Total Cost: ${totalCost.toFixed(2)}
                    </div>
                </div>
            ) : (
                <div>Cart is empty</div>
            )}
        </div>
    );
}