import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";

function Product(props) {
  let { id, resizeTo, price, rating, numOfRev } = props;

  let data = { id, resizeTo, price, rating, numOfRev };

  console.log(data);
  return (
    <div className="product">
      <Link to={"/product/" + id}>
        <h2 className="product-Title">{resizeTo}</h2>
      </Link>

      <div className="product-price">${price}</div>
      <div className="product-price">{rating}</div>
      <div className="product-price">{numOfRev}</div>

      <button
        className="product-buy-button"
        onClick={(data) => {
          console.log("button clicked", data);
          props.add(data);
        }}
      >
        Add to Cart
      </button>

      {props.cart.cartItems.map((item) => {
        return (
          <li key={item.id}>
            {item.title} | {item.price}
          </li>
        );
      })}
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    add: (cartObj) => dispatch(addToCart(cartObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

// export default Product;
