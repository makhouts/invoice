import React, {useState, useEffect} from 'react';
import { Layout } from './components/Layout';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import { Clients } from './components/Clients/Clients';
import { Invoices } from './components/Invoices/Invoices';
import { CreateInvoice } from './components/CreateInvoice/CreateInvoice';
import { Home } from './components/Home/Home';

function App() {
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
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

useEffect(() => {
  axios.get('https://invoice-app-b1329-default-rtdb.firebaseio.com/invoices.json')
  .then(res => {
      const fetchedData = []
      for (let key in res.data) {
          fetchedData.push({
              ...res.data[key], id: key
          })
      }
      setInvoices(fetchedData);
  })
}, [])


  return (
    <>
    <Router>
      <Layout/>
        <Switch>
          <Route path='/' exact render={() => <Home clients={clients} invoices={invoices} />}></Route>
          <Route path='/clients/:showForm?' render={() => <Clients clients={clients} setClients={setClients} spinner={spinner} setSpinner={setSpinner} />}></Route>
          <Route path='/invoices' render={() => <Invoices clients={clients} invoices={invoices} />}></Route>
          <Route path='/createInvoice/:id?' render={() => <CreateInvoice clients={clients} />}></Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
