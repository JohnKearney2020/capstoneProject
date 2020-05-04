import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
<<<<<<< HEAD
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import BaseLayout from './components/layout/BaseLayout'
import Home from './components/Home'
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  
  <BrowserRouter>
      <BaseLayout>
       
        <Switch>
        
          <Route exact path="/" component={Home} />
          <Route  path="/app" component={App} />
          {/* <Route exact path="/cart" component={Cart} /> */}
         
        </Switch>
      </BaseLayout>
    </BrowserRouter>,
=======
import { Provider } from 'react-redux'
import store from './store'



ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>
    ,
>>>>>>> TemplateSite
  document.getElementById('root')
);


