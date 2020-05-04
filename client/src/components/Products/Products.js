import React,{useEffect,Component} from "react";
import {  useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import {getEtsyItems} from "../../actions/etsyAction"
import PropTypes from 'prop-types';
import axios from 'axios'
import './Products.css'









 class Products extends Component {

  constructor(props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
        etsyProducts:[]
    }
    
}
handlePageChange() {
  window.location.hash = "/product/:id";
}


componentDidMount = (params)=>{
    this.props.getEtsyItems()
  
}
componentWillReceiveProps(nextProps, nextContext) {
  console.log(nextProps.products.etsy.items[0].results)
  this.setState({
    ...this.state,
    etsyProducts: nextProps.products.etsy.items[0].results
  })
}


// routeChange=()=> {
//   let path = "/product/:id";
//   let history = useHistory();
//   history.push(path);
// }



render() {

  //this.props.products.price 

  let addedProducts = this.state.etsyProducts.length ?
  (  
      this.state.etsyProducts.map((product,index)=>{
          return(
             
            <div  key ={index} className="card">
             <img className="card-img-top" src={product.MainImage.url_570xN} alt={product.image}height="300px"></img>
             <div className="card-body">
             <h5 className="card-title">{product.title}</h5>
             <p >
             <span>${product.price}</span>
             </p>
             <a href="/product/:id" className="btn btn-primary" onClick={this.handlePageChange} type="button">View Detail </a>
             </div>
    
          </div>
               
          )
      })
  ):

   (
      <p>Nothing.</p>
   )
  return (
    <div className="container">
    <h3 className="center"> Products</h3>
    <div className="box">
        {addedProducts}
    </div>
</div> 
  )
}
}


let mapStateToProps = (state) => {
  return {
    products: state.etsyReducer.etsy
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getEtsyItems: () => dispatch(getEtsyItems()),
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Products);


