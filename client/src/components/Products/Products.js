import React,{useEffect,Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import {getEtsyItems} from "../../actions/etsyAction"
import PropTypes from 'prop-types';
import axios from 'axios'



 class Products extends Component {
  componentDidMount = (params)=>{
    this.props.getEtsyItems()
  
}




  render() {
    console.log(this.props.products)
    
    return (
      <div>
        Hello World
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


