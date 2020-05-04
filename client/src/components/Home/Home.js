import React, {useEffect} from 'react'
import Products from '../Products/Products'
// import Cart from '../Cart/Cart'
// import CheckoutForm from '../CheckoutForm/CheckoutForm'
// import { Elements, StripeProvider } from 'react-stripe-elements'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { listItems } from '../../actions/itemActions';

function Home() {
    
    const itemList = useSelector(state => state.itemList)
    const { products, loading, error} = itemList;
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(listItems())

        return () => {
            //
        }
    }, [])
    
    return (
        loading? <div>Loading...</div> : error? <div>{error}</div> :
    <div className="app">
        <main className="app-shop">
            
            <div className="app-products">
                {products.map(item => (

                    <Products key={item.title} title={item.title} price={item.price} rating={item.rating} numOfRev={item.numOfRev} id={item._id}/>

                ))}
            </div>
        </main>
    </div>
    );
    
}
export default Home;





///=======OLD CODE =======
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
    //     <div className="app">
    //     <main className="app-shop">
    //         <div className="app-products">
    //             {items.map(item => (

    //                 <Product key={item.title} title={item.title} price={item.price} onAddToCart={() => handleAddToCartClick(item.id)} />

    //             ))}
    //         </div>

    //     </main>
    // </div>

    // ============CODE FOR STRIPE==========
    // <Cart itemsInCart={itemsInCart} totalCost={totalCost}/>
    // {itemsInCart.length > 0 && (
    //     <StripeProvider apiKey="pk_test_YxnZKhFG2YcQdDL6B5KZwmey00rQAe3YsL">
    //         <Elements>
    //             <CheckoutForm totalCost={totalCost} />
    //         </Elements>
    //     </StripeProvider>
    // )}