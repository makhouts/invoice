import React from 'react';
import { Layout } from './components/Layout';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Clients } from './components/Clients/Clients';
import { Invoices } from './components/Invoices/Invoices';
import { Settings } from './components/Settings/Settings';


function App() {
  return (
    <>
    <Router>
      <Layout/>
      <Switch>
        <Route path='/clients' component={Clients}></Route>
        <Route path='/invoices' component={Invoices}></Route>
        <Route path='/settings' component={Settings}></Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
