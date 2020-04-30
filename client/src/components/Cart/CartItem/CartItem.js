import React from 'react'


export default function CartItem({title, cost, quantity}) {
    return(
        <div className="cart-item">
            <div>{title}</div>
            <div className="cart-item-details">
                <div className="cart-item-quantity">Qty: {quantity}</div>
                <div>${cost.toFixed(2)}</div>
            </div>
        </div>
    );
}