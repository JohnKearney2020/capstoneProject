import React from 'react'



export default function Product({ onAddToCart, price, title }) {
    return (
        <div className="product">
            <h2 className="product-Title">{title}</h2>
            <div className="product-price">{price}</div>
            <button className="product-buy-button" onClick={onAddToCart}>Add to Cart</button>
        </div>
    )
}