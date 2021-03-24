import React, { useState, useRef, useEffect } from 'react'
import classes from './CreateInvoice.module.css';
import DatePicker from "react-datepicker";
import { motion } from 'framer-motion';
import { VscTrash } from "react-icons/vsc";
import { Link, useParams } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { Invoice } from '../Invoice/Invoice';
import { MdLibraryAdd } from "react-icons/md";

export const CreateInvoice = (props) => {
    const [clientOption, setClientOption] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('#');
    const [reference, setReference] = useState();
    const [inputs, setInputs] = useState([
        {
        description: '',
        qty: '',
        unitPrice: '',
        total: '',
        },
    ]);
    const inputRef = useRef();
    const [totalPriceSum, setTotalPriceSum] = useState(0);
    const [discount, setDiscount] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const idParam = useParams();

    

    let selectedClient = (props.clients.filter(client => client.companyName === clientOption));
    let clientViaParams = props.clients.filter(client => client.id == idParam.id);
    console.log(clientViaParams)

    const handleChangeInput = (index, event) => {
        const values = [...inputs];
        values[index][event.target.name] = event.target.value;
        values[index].total = (values[index].qty * values[index].unitPrice) || 0;

        setInputs(values);

        setTotalPriceSum(inputs.reduce((accumulator, input) => {
            return accumulator + input.total;
        }, 0))

    }
    
    const addInputs = () => {
        setInputs([...inputs, { description: '', qty: '', unitPrice: '', total: '' }])
    }

    const removeInputHandler = (index) => {
        const values = [...inputs];
        values.splice(index, 1);
        setInputs(values);
    }
 
    return (
    <>
    <div className={`${classes.splitColumn}`}>
        <div className={classes.leftColumn}>
            <div className={classes.bg}>
                <div className={classes.flexSelectClient}>
                    <p>Select client</p>
                    <select value={clientOption} onChange={(e) => setClientOption(e.target.value)} name="client">
                        <option value=''>Select</option>
                        {props.clients.map(client => 
                            <option key={client.id} value={client.companyName}>{client.companyName.toUpperCase()}</option>
                        )}
                    </select> 
                    <Link to='/clients/showForm'><button className={classes.addClientBtn}><FaUserPlus /></button></Link>
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
                            ref={inputRef}
                            value={invoiceNumber}
                            onChange={(event) => setInvoiceNumber(event.target.value)}
                            maxLength='10' />
                        <input 
                            className={classes.input} 
                            type='text' 
                            ref={inputRef}
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
            animate={{ x: 0, opacity: 1, y: 0 }}
            initial={ {x: -100, opacity: 0, y: 50 } } 
            exit={{ x: 50, opacity: 0 }}
            layout
            transition={{ duration: 0.2 }}
            key={index} 
            className={classes.productData}>
                <input className={`${classes.input} ${classes.wideInput}`}
                    type="text" 
                    name='description'
                    ref={inputRef}
                    value={inputValue.description} 
                    onChange={(event) => handleChangeInput(index, event)}
                    placeholder='Description'
                    required/> 

                <input className={classes.input} 
                    type="number" 
                    name='qty'
                    ref={inputRef}
                    value={inputValue.qty} 
                    onChange={(event) => handleChangeInput(index, event)}
                    placeholder='QTY'
                    required/> 

                <input className={classes.input} 
                    type="number" 
                    name='unitPrice'
                    ref={inputRef}
                    value={inputValue.unitPrice} 
                    onChange={(event) => handleChangeInput(index, event)}
                    placeholder='Unit price'
                    required/> 
                    
                <input className={classes.input} 
                    type="text" 
                    value={(Math.round(inputValue.total * 100) / 100).toFixed(2)} 
                    disabled={true}/>  
                <motion.div 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    >
                    <VscTrash className={classes.binIcon} onClick={() => removeInputHandler(index)}/>
                </motion.div>

            </motion.div> 
        ))}
            <motion.div
                initial={{x: -60, opactiy: 0}}
                animate={{x: 0, opacity: 1}}>
                    <MdLibraryAdd className={classes.addItem} onClick={addInputs} />
            </motion.div>

            </div>
            <div className={classes.bg}>
            <div className={classes.invoiceTotalCalc}>
                    <h4>Discount:</h4>
                    <input type="text" value={discount} onChange={event => setDiscount(event.target.value)}/>
                </div> 
            </div>      
        </div>
        <div className={classes.rightColumn}>
            <Invoice
             selectedClient={selectedClient}
             invoiceNumber={invoiceNumber}
             reference={reference}
             startDate={startDate}
             endDate={endDate}
             inputs={inputs}
             refi={inputRef}
             totalPriceSum={totalPriceSum}
             discount={discount}
              />
        </div>
    </div>  
    </>         
    )
}
