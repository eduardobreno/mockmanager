import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServicesList from '../components/Services/List';
import ServicesAdd from '../components/Services/Add';
import Home from '../components/Home';

const Main = () => (
  <Switch>
      <Route exact path="/admin" component={Home}/>
      <Route exact path="/admin/services" component={ServicesList}/>
      <Route exact path="/admin/services/add" component={ServicesAdd}/>
  </Switch>
);

export default Main;
