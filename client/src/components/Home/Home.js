import React, {useState} from 'react'
import items from '../../api/api-items'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import { Elements, StripeProvider } from 'react-stripe-elements'
import ProductView from '../ProductsView/ProductView'

function Home() {
    

    
    return (
    <div className="app">
        <main className="app-shop">
            <div className="app-products">
            <Products />
            </div>
        </main>
    </div>
    );
    
}
export default Home;





