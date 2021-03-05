import React, {useState, useEffect} from 'react';
import { Layout } from './components/Layout';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import { Clients } from './components/Clients/Clients';
import { Invoices } from './components/Invoices/Invoices';
import { Settings } from './components/Settings/Settings';
import { CreateInvoice } from './components/CreateInvoice/CreateInvoice';


function App() {
  const [clients, setClients] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    axios.get('https://invoice-app-b1329-default-rtdb.firebaseio.com/myclients.json')
    .then(responseData => {
        const fetchedData = []
        for (let key in responseData.data) {
            fetchedData.push({
                ...responseData.data[key], id: key
            })
        }
        setClients(fetchedData)
        setSpinner(false);
    })
    .catch(() => {
        alert('Something went wrong!')
        setSpinner(false);
    })
}, []);
  


  return (
    <>
    <Router>
      <Layout/>
        <Switch>
          <Route path='/clients' render={() => <Clients clients={clients} setClients={setClients} spinner={spinner} setSpinner={setSpinner} />}></Route>
          <Route path='/invoices' render={() => <Invoices clients={clients} />}></Route>
          <Route path='/createInvoice' render={() => <CreateInvoice clients={clients} />}></Route>
          <Route path='/settings' component={Settings}></Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
