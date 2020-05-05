import React,{useEffect,Component} from "react";
import {  useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import {getEtsyItems} from "../../actions/etsyAction"
import PropTypes from 'prop-types';
import axios from 'axios'
import './Products.css'









 class Products extends Component {

  // constructor(props) {
  //   super(props)
  //   this.handlePageChange = this.handlePageChange.bind(this);
  //   this.state = {
  //       etsyProducts:[]
  //   }
// }

handlePageChange() {
  window.location.hash = "/product/:id";
}


componentDidMount() {
    this.props.getEtsyItems()
  
}
// componentWillReceiveProps(nextProps, nextContext) {
//   console.log("Looking for results in componentWillReceiveProps on Products.js component")
//   // console.log(nextProps)
//   console.log(nextProps.products.etsy)

//   // console.log(nextProps.products.etsy.items[0].results)
//   // this.setState({
//   //   ...this.state,
//   //   etsyProducts: product
//   // })
// }







render() {

  //this.props.products.price 
  console.log("Looking for props")
  console.log(this.props.products.results)

  let results = this.props.products.results;

  let addedProducts = results ?
  (  
    this.props.products.results.map((product,index)=>{
          return(
             
            <div  key ={index} className="card">
             <img className="card-img-top" src={product.MainImage.url_570xN} alt={product.image} height="300px"></img>
             <div className="card-body">
             <h5 className="card-title">{product.title}</h5>
             <p >
             <span>${product.price}</span>
             </p>
             {/* <Link href="/product/:id" className="btn btn-primary" onClick={this.handlePageChange} type="button">View Detail </Link> */}
             <Link to={`/product/${product.listing_id}`} className="btn btn-primary" type="button">View Detail </Link>
             </div>
    
          </div>
               
          )
      })
  ): undefined || null

  //  (
  //     <p>Nothing.</p>
  //  )
  return (
    <div className="container">
    <h3 className="center"> Products</h3>
    <div className="box">
        {addedProducts}
        {/* <p>This is a test</p> */}
    </div>
</div> 
  )
}
}

Products.propTypes = {
  products: PropTypes.object.isRequired,
  getEtsyItems: PropTypes.func.isRequired
}


let mapStateToProps = (state) => {
  return {
    products: state.etsyReducer.etsy.items
  };
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     getEtsyItems: () => dispatch(getEtsyItems()),
//   };
// };
  //jfhjfoj
export default connect(mapStateToProps, {getEtsyItems})(Products);


