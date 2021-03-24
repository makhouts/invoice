import React, {useState} from 'react'
import logo from '../../assets/logo.png';
import classes from '../CreateInvoice/CreateInvoice.module.css';
import { motion } from 'framer-motion';

export const Invoice = (props) => {

    console.log()

return (
    <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate= {{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={classes.invoice}>
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
                        {props.selectedClient.map(client => (
                        <div key={client.id}>
                            <p className={classes.subTitle}>Billed to</p>
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
                    <p>{props.invoiceNumber}</p>
                    <p>{props.reference}</p>
                    <p>{props.startDate.getDate()}/{props.startDate.getMonth() + 1}/{props.startDate.getFullYear()}</p>
                    <p>{props.endDate.getDate()}/{props.endDate.getMonth() + 1}/{props.endDate.getFullYear()}</p>
                </div>
                <div className={classes.line}></div>
                <div className={classes.productTitlesDetails}>
                   <h4>Description</h4>   
                   <h4>Qty</h4>
                   <h4>Unit Price</h4>   
                   <h4>Total</h4>         
                </div> 
                <div>
                     {props.inputs.map((input, index) => (
                        <div key={index} className={classes.productDetails}>
                            <p>{input.description}</p>
                            <p>{input.qty}</p>
                            <p>€ {(Math.round(input.unitPrice * 100) / 100).toFixed(2)}</p>
                            <p>€ {(Math.round(input.total * 100) / 100).toFixed(2)}</p>
                         </div>
                     ))} 
                </div> 
                <div className={classes.invoiceOverview}>
                    <div className={classes.overviewTitles}>
                        <p>Subtotal</p>
                        <p>VAT 21%</p>
                        <p>Discount</p>
                        <p>Total</p>
                    </div>

                    <div>
                       
                    <p>€ {(props.totalPriceSum / 1.21).toFixed(2)}</p>
                

                        <p>€ {(props.totalPriceSum - props.totalPriceSum / 1.21).toFixed(2)}</p>
                        <p>€ {props.discount}</p>
                        <p>€ {(props.totalPriceSum - props.discount).toFixed(2)}</p>  
                    </div>
                </div> 
                <div className={classes.invoiceFooter}>
                    <p>U wordt vriendelijk verzocht de factuur voor de vervaldatum te voldoen <br /> van het factuurnummer.</p>        
                </div>         
    </motion.div>
)};
