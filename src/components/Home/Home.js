import React from 'react'
import { AreaChart, Area, linearGradient, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


export const Home = (props) => {

    let paidInvoices = props.invoices.filter(invoice => invoice.status === 'Betaald')
  
  const data = [
    {name: 'Clients', amount : props.clients.length, pv: 10, amt: 10},
    {name: 'Invoices', amount : props.invoices.length, pv: 10, amt: 10},
    {name: 'Paid Invoices', amount : paidInvoices.length, pv: 10, amt: 10},
    {name: 'Unpaid Invoices', amount : props.invoices.length - paidInvoices.length, pv: 10, amt: 10}
 ];
  
  const renderBarChart = (
<AreaChart width={1030} height={450} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>
  );
    return (
        <div className='startContent centerContent'>
            <h1>OVERVIEW</h1>
            <div>
             {renderBarChart}
            </div>
        </div>
    )
}
