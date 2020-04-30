import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import BaseLayout from './componenets/layout/BaseLayout'



ReactDOM.render(
  // <Provider store={store}>
  <BrowserRouter>
      <BaseLayout>
       
        <Switch>
        
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
         
        </Switch>
      </BaseLayout>
    </BrowserRouter>
    // </Provider>
    ,
  document.getElementById('root')
);


