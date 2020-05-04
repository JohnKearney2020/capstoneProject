
// import items from './api/api-items'
// import Product from './components/Product/Product'
// import Cart from './components/Cart/Cart'
// import CheckoutForm from './components/CheckoutForm/CheckoutForm'
// import { Elements, StripeProvider } from 'react-stripe-elements'
import './index.css'
// import logo from './logo.svg'
import React from 'react'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import BaseLayout from './components/layout/BaseLayout'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import Home from './components/Home/Home'
import ProductView from './components/ProductsView/ProductView'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'



function App () {
    

    return(
        <BrowserRouter>
            <BaseLayout>
                <Switch>
                    <Route exact path='/' component={Home}  />
                    <Route path='/product/:id' component={ProductView} />
                    <Route path='/cart/:id?' component={ShoppingCart}/> 
                    <Route path="/signin" component={SignIn} />
                    <Route path="/register" component={Register}/>
                </Switch>
            </BaseLayout>
        </BrowserRouter>
    )
    // const [itemsInCart, setItemsInCart] = useState([]);

    // const handleAddToCartClick = id => {
    //     setItemsInCart(itemsInCart => {
    //         const itemInCart = itemsInCart.find(item => item.id === id);
    //         //if item found in cart then update the quantity
    //         if(itemInCart){
    //             return itemsInCart.map(item => {
    //                 if(item.id !==id) return item;
    //                 return {...itemInCart, quantity: item.quantity + 1};
    //             })
    //         }
    //         //else, add new itme into cart
    //         const item = items.find(item => item.id === id);
    //         return [...itemsInCart, {...item, quantity: 1}]
    //     });
    // };
    // const totalCost = itemsInCart.reduce(
    //     (acc,item) => acc + item.price * item.quantity, 0
    // );
    
    
    // return (
    //     <div className="app">
    //         <header className="app-header">
    //             <img src={logo} className="app-logo" alt="logo" />
    //             <h1 className="app-header-name">Jesse's Shop</h1>
    //         </header>
    //         <main className="app-shop">
    //             <div className="app-products">
    //                 {items.map(item => (

    //                     <Product key={item.title} title={item.title} price={item.price} onAddToCart={() => handleAddToCartClick(item.id)} />

    //                 ))}
    //             </div>
    //             <Cart itemsInCart={itemsInCart} totalCost={totalCost}/>
    //             {itemsInCart.length > 0 && (
    //                 <StripeProvider apiKey="pk_test_YxnZKhFG2YcQdDL6B5KZwmey00rQAe3YsL">
    //                     <Elements>
    //                         <CheckoutForm totalCost={totalCost} />
    //                     </Elements>
    //                 </StripeProvider>
    //             )}
    //         </main>
    //     </div>
    // );
}
export default App;