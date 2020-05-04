import React, {useEffect} from 'react'
import Products from '../Products/Products'
// import Cart from '../Cart/Cart'
// import CheckoutForm from '../CheckoutForm/CheckoutForm'
// import { Elements, StripeProvider } from 'react-stripe-elements'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { listItems } from '../../actions/itemActions';
// import Cart from '../Cart/Cart'
// import CheckoutForm from '../CheckoutForm/CheckoutForm'
// import { Elements, StripeProvider } from 'react-stripe-elements'
// import ProductView from '../ProductsView/ProductView'

function Home() {
    
    const itemList = useSelector(state => state.itemList)
    const { products, loading, error} = itemList;
    const dispatch = useDispatch();

    console.log("Checking error for Home component on Client Side")
    console.log(error)

    useEffect(() => {

        dispatch(listItems())

        return () => {
            //
        }
    }, [])
    
    return (
        loading? <div>Loading...</div> :
   ( <div className="app">
        <main className="app-shop">
            
            <div className="app-products">
                
            <Products />
            </div>
        </main>
    </div>)
    );
    
}
export default Home;





