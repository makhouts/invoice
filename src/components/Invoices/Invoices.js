import React from 'react';
import { Button } from '../UI/Button/Button';
import classes from './Invoices.module.css';
import { AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
export const Invoices = (props) => {
    return (
    
        <div className='startContent'>
            <div className={classes.createInvoice}>
                <Link to='/createInvoice'><Button className={classes.createInvoice}><AiFillFileAdd size="24px" /><span>Invoice</span></Button></Link>
            </div>
        </div>
    
    )
}
