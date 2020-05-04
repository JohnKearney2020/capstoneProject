

import './index.css'
// import logo from './logo.svg'
<<<<<<< HEAD
=======
import React from 'react'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import BaseLayout from './components/layout/BaseLayout'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
// import React, {useState} from 'react'
// import { useSelector } from "react-redux";
// import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
// import BaseLayout from './components/layout/BaseLayout'
>>>>>>> TemplateSite

import Home from './components/Home/Home'
import ProductView from './components/ProductsView/ProductView'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'



function App () {
    
<<<<<<< HEAD
    return (
        <div className="app">
            {/* <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <h1 className="app-header-name">Jesse's Shop</h1>
            </header> */}
            <main className="app-shop">
                <div className="app-products">
                    {items.map(item => (
=======
   
>>>>>>> TemplateSite

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
    
}
export default App;