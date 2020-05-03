

import './index.css'
import React, {useState} from 'react'
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import BaseLayout from './components/layout/BaseLayout'

import Home from './components/Home/Home'
import ProductView from './components/ProductsView/ProductView'




function App () {
   

    return(
        <BrowserRouter>
            <BaseLayout>
                <Switch>
                    <Route exact path='/' component={Home}  />
                    <Route path='/product/:id' component={ProductView} />
                </Switch>
            </BaseLayout>
        </BrowserRouter>
    )
    
}
export default App;