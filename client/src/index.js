import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import BaseLayout from './components/layout/BaseLayout'
import Home from './components/Home'



ReactDOM.render(
  <Provider store={store}>
   <BrowserRouter>
   <BaseLayout>
   <Switch>
   <Route exact path="/" component={Home} />
   <Route  path="/cart" component={App} />
    
    </Switch>
    </BaseLayout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


