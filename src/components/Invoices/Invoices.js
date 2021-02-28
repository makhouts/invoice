import React from 'react';
import { Button } from '../UI/Button/Button';
import classes from './Invoices.module.css';
import { AiFillFileAdd } from 'react-icons/ai';
export const Invoices = (props) => {
    return (
    
        <div className='startContent'>
            <div className={classes.createInvoice}>
                <Button className={classes.createInvoice}><AiFillFileAdd size="24px" /><span>Invoice</span></Button>
            </div>
        </div>
    
    )
}
