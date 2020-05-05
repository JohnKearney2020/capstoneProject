import React from "react";
import { Link } from "react-router-dom";


function Product({id, title, price, numOfRev, rating}) {


  return (
    <div className="product">
      <Link to={"/product/" + id}>
        <h2 className="product-Title">{title}</h2>
      </Link>
    
      <div className="product-price">${price}</div>
      <div className="product-price">{rating}</div>
      <div className="product-price">{numOfRev}</div>

      <button
        className="product-buy-button">
        <Link to={"/product/"+ id }  >Add to Cart</Link>
      </button>
    </div>
  );
}

export default Product;
