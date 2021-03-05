import React, { useState } from 'react'
import classes from './CreateInvoice.module.css';
import logo from '../../assets/logo.png';
import DatePicker from "react-datepicker";
import { motion } from 'framer-motion';
import { VscTrash } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { MdPerson } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '../UI/Button/Button';

export const CreateInvoice = (props) => {
    const [clientOption, setClientOption] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('#');
    const [reference, setReference] = useState();
    const [inputs, setInputs] = useState([
        {
        description: '',
        qty: '',
        unitPrice: '',
        },
    ]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    let selectedClient = (props.clients.filter(client => client.companyName === clientOption));

    const handleChangeInput = (index, event) => {
        const values = [...inputs];
        values[index][event.target.name] = event.target.value;
        setInputs(values);
    }

    const addInputs = () => {
        setInputs([...inputs, { description: '', qty: null, unitPrice: '' }])
    }

    const removeInputHandler = (index) => {
        const values = [...inputs];
        values.splice(index, 1);
        setInputs(values);
    }
 
    return (
    <>
    <div className={`startContent ${classes.splitColumn}`}>
        <div className={classes.leftColumn}>
            <div className={classes.bg}>
                <div className={classes.flexSelectClient}>
                    <p>Select client</p>
                    <select value={clientOption} onChange={(e) => setClientOption(e.target.value)} name="client">
                        <option value=''>Select</option>
                        {props.clients.map(client => 
                        <>
                            <option key={client.id} value={client.companyName}>{client.companyName.toUpperCase()}</option>
                        </>
                        )}
                    </select> 
                </div>
                <div className={classes.invoiceDetails}>
                        <h4>Invoicenumber</h4>
                        <h4>Reference</h4>
                        <h4>Invoice date</h4>
                        <h4>Expiration date</h4>
                </div>
                <div className={classes.invoiceDetails}>
                        <input 
                            className={classes.input} 
                            type='text' 
                            value={invoiceNumber}
                            onChange={(event) => setInvoiceNumber(event.target.value)}
                            maxLength='10' />
                        <input 
                            className={classes.input} 
                            type='text' 
                            value={reference}
                            placeholder='reference'
                            onChange={(event) => setReference(event.target.value) }
                            maxLength='10'/>
                        <DatePicker minDate={new Date()} dateFormat='dd/MM/yyyy' className={classes.input} selected={startDate} onChange={date => setStartDate(date)} />
                        <DatePicker minDate={new Date()} dateFormat='dd/MM/yyyy' className={classes.input} selected={endDate} onChange={date => setEndDate(date)} />
                </div>
            </div>
            <div className={`${classes.bg} ${classes.productFlex}`}>
                <div className={classes.productTitles}>
                    <h4>Description</h4>
                    <h4>QTY</h4>
                    <h4>Unit price</h4>
                    <h4>Total</h4>
                    <h4>Action</h4>
                </div>

        {inputs.map((inputValue, index) => (
            <motion.div   
            animate={{ x: 0, opacity: 1 }}
            initial={ {x: -100, opacity: 0, } } 
            layout
            transition={{ duration: 0.2 }}
            key={index} 
            className={classes.productData}>
                <input className={`${classes.input} ${classes.wideInput}`}
                    type="text" 
                    name='description'
                    value={inputValue.description} 
                    onChange={(event) => handleChangeInput(index, event)}
                    placeholder='Description'
                    required/> 

                <input className={classes.input} 
                    type="number" 
                    name='qty'
                    value={inputValue.qty} 
                    onChange={(event) => handleChangeInput(index, event)}
                    placeholder='QTY'
                    required/> 

                <input className={classes.input} 
                    type="number" 
                    name='unitPrice'
                    value={inputValue.unitPrice} 
                    onChange={(event) => handleChangeInput(index, event)}
                    placeholder='Unit price'
                    required/> 
                    
                <input className={classes.input} 
                    type="text" 
                    value={'€ ' + inputValue.qty * inputValue.unitPrice} 
                    disable='true'/>  
                <motion.div 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                >
                 <VscTrash className={classes.binIcon} onClick={() => removeInputHandler(index)}/>
                </motion.div>

            </motion.div> 
        ))}
                <button onClick={addInputs}>+</button>
            </div>
            <div className={classes.bg}>

            </div>      
        </div>
        <div className={classes.rightColumn}>
            <div className={classes.invoice}>
                <div className={classes.myInfo}>
                    <img src={logo} alt=""/>
                    <table>
                        <thead>
                            <tr>
                                <th>MILLQUATTRO</th>
                            </tr>
                            <tr>
                                <th>Pierenbergstraat 51</th>
                            </tr>
                            <tr>
                                <th>IBAN: BE65 3770 7844 0196</th>
                            </tr>
                            <tr>
                                <th>VAT: BE1234567890</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className={classes.clientInfo}>
                    <h2 className={classes.title}>INVOICE</h2>
                   <table>
                       <thead>
                        {selectedClient.map(client => (
                        <div key={client.id}>
                            <tr>
                                <th>{client.companyName}</th>
                            </tr>
                             <tr>
                                <th>{client.street} {client.number} </th>
                            </tr>
                            <tr>
                                <th>{client.zipcode} {client.city} </th>
                            </tr>
                            <tr>
                                <th>{client.email}</th>
                            </tr>
                            <tr>
                                <th>{client.phone}</th>
                            </tr>
                            <tr>
                                <th>VAT: {client.vat}</th>
                            </tr>
                        </div>
                         ) )}
                    </thead>
                   </table>
                </div>

                <div className={classes.invoiceDetails}>
                    <h4>Invoicenumber</h4>
                    <h4>Reference</h4>
                    <h4>Invoice Date</h4>
                    <h4>Expiration Date</h4>
                </div>
                <div className={classes.invoiceDetails}>
                    <p>{invoiceNumber}</p>
                    <p>{reference}</p>
                    <p>{startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()}</p>
                    <p>{endDate.getDate()}/{endDate.getMonth() + 1}/{endDate.getFullYear()}</p>
                </div>

            </div>
        </div>
    </div>  
    </>         
    )
}
