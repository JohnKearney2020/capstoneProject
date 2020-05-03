import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import {getEtsyItems} from "../../actions/etsyAction"
import PropTypes from 'prop-types';
import axios from 'axios'

const Products =({getEtsyItems})=>{

  useEffect(() => {
    getEtsyItems()
  //   let api = 'https://jsonplaceholder.typicode.com/todos/1'
  //   fetch(api)
  //   .then((res)=>{
  //     console.log(res.json())
    
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
   }, []);
  return (
    <div className="product">
     HELLO WORLD
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getEtsyItems: () => dispatch(getEtsyItems()),
  };
};
  getEtsyItems.propTypes = {
  
  getEtsyItems: PropTypes.func.isRequired,
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);


