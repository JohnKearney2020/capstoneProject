import React, { useEffect} from 'react'
import { addToCart } from '../../actions/cartActions'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { removeItem } from '../../actions/cartActions'


function ShoppingCart(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;


    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeItem(productId));
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
        return () => {
            //
        };
    }, []);

    const checkOutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }


    return <div className="shopping-cart">
            <div className="cart-list">
                <ul className="list-container">
                    <li>
                        <h3>Your Shopping Cart</h3>
                        <h5>Price:</h5>
                    </li>
                    {
                        cartItems.length === 0 ? <div>Cart is Empty</div> : cartItems.map(item =>
                            <li>
                                <div className="cart-image"><img src="" alt="product" /></div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/"+ item.product}>
                                        {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty: <select value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, e.target.value))}>
                                            {[...Array(item.qtyInStock).keys()].map(param =>
                                                <option key={param + 1} value={ param + 1 }>{ param + 1 }</option>
                                            )}
                                            </select>
                                            <Button variant="danger"className="remove-button" onClick={() => removeFromCartHandler(item.product)}>Remove</Button>
                                    </div>
                                </div>
                                <div className="cart-price">$ {item.price}</div>
                            </li>
                            )
                    }
                </ul>
            </div>
            
            <Card  className="cart-action" border="dark" style={{ width: "18rem", padding: "1rem" }}>
                <h4>Subtotal ({cartItems.reduce((a, c)=> a+c.qty, 0)} items)
                :
                $ { cartItems.reduce((a,c)=> a + c.price * c.qty, 0)}
                </h4> 
                <Button onClick={checkOutHandler} className="checkout-button" variant="success" disables={cartItems.length === 0}>
                    Proceed To Checkout
                </Button>
                
            </Card>
            
        </div>

}

export default ShoppingCart