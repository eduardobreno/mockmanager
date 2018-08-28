import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServicesList from './Services/List';
import ServicesAdd from './Services/Add';
import Home from './Home';

const Main = () => (
  <Switch>
      <Route exact path="/admin" component={Home}/>
      <Route exact path="/admin/services" component={ServicesList}/>
      <Route exact path="/admin/services/add" component={ServicesAdd}/>
  </Switch>
);

export default Main;
