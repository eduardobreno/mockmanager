import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServicesList from '../components/Services/List';
import ServicesAdd from '../components/Services/Add';
import Home from '../components/Home';
import ServicesEdit from '../components/Services/Edit';
import ServicesView from '../components/Services/View';

const Main = () => (
  <Switch>
    <Route exact path="/admin" component={Home} />
    <Route exact path="/admin/services" component={ServicesList} />
    <Route exact path="/admin/services/add" component={ServicesAdd} />
    <Route exact path="/admin/services/edit/:id" component={ServicesEdit} />
    <Route exact path="/admin/services/view/:id" component={ServicesView} />
  </Switch>
);

export default Main;
