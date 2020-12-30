import React from 'react';
import { Layout } from './components/Layout';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' component={Layout}></Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
