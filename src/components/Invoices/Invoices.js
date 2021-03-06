import React, { useEffect, useState } from 'react';
import { Button } from '../UI/Button/Button';
import classes from './Invoices.module.css';
import { AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { motion } from 'framer-motion';
import { Modal } from '../UI/Modal/Modal';
import { Invoice } from '../Invoice/Invoice';
import { BigSpinner } from '../UI/Spinner/BigSpinner';
import Pdf from 'react-to-pdf';


const ref = React.createRef();

export const Invoices = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [selectedClient, setSelectedClient] = useState([]);


    const container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2
        }
      }
    };

    const item = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1
      }
    };


    useEffect(() => {
        setSpinner(true);
        axios.get('https://invoice-app-b1329-default-rtdb.firebaseio.com/invoices.json')
        .then(res => {
            const fetchedData = []
            for (let key in res.data) {
                fetchedData.push({
                    ...res.data[key], id: key
                })
            }
            setInvoices(fetchedData);
            setSpinner(false)
        })
    }, [])

    const paid = (id) => {
        const paid =  'Paid'
        const config = { headers: {'Content-Type': 'application/json'} };
        axios.put(`https://invoice-app-b1329-default-rtdb.firebaseio.com/invoices/${id}/status.json`, JSON.stringify(paid), config)
        .then(() =>
           window.location.reload()
        )
    }

    const remove = (id) => {
      axios.delete(`https://invoice-app-b1329-default-rtdb.firebaseio.com/invoices/${id}.json`)
      .then(() => window.location.reload())
    }

    return (
    
        <div className='startContent'>
            <div className={classes.createInvoice}>
                <Link to='/createInvoice'><Button className={classes.createInvoice}><AiFillFileAdd size="24px" /><span>Invoice</span></Button></Link>
            </div>

<div className={classes.invoicesOverview}>
<section>
  <div className={classes.tblHeader}>
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Invoice Number</th>
          <th>Date</th>
          <th>Client</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
    </table>
  </div>
  <motion.div
    variants={container}
    initial="hidden"
    animate="visible" className={classes.tblContent}>
    <table className={classes.table}>
      <tbody>
        {invoices.map(inv => (    
                  <motion.tr onClick={() => {
                    setShowModal(true)
                    setSelectedClient([inv])
                  }} className={classes.tblhaha} variants={item} key={inv.id}>
                      <td>{inv.invoiceNumber}</td>
                      <td>{inv.startDate}</td>
                      <td>{inv.client[0].companyName}</td>
                      <td>€ {inv.total}</td>
                      {inv.status === 'Unpaid' ? <td className={classes.invoiceOpen}>{inv.status}</td> : <td className={classes.invoicePaid}>{inv.status}</td>}
                      <td>{inv.status === 'Unpaid' ? <HiCheck onClick={() => paid(inv.id)} className={classes.dots} /> : <HiOutlineX onClick={() => remove(inv.id)} className={classes.x} />}</td>
                  </motion.tr> 
        ))}        
      </tbody>
    </table>
    {spinner && <BigSpinner />}
  </motion.div>
</section>
<div>
  <Modal modalClosed={() => setShowModal(false)} show={showModal}>
  <div className={classes.dwnlBtn}>  
  <Pdf targetRef={ref} filename={`invoice`}>
    {({ toPdf }) =><Button clicked={() => toPdf()}>Download</Button>}
  </Pdf>
  </div>
    {showModal &&
    <div ref={ref}>
      <Invoice 
          selectedClient={selectedClient[0].client}
          startDate={selectedClient[0].startDate}
          endDate={selectedClient[0].endDate}
          invoiceNumber={selectedClient[0].invoiceNumber}
          reference={selectedClient[0].reference}
          vat={selectedClient[0].vat}
          totalPriceSum={selectedClient[0].total}
          discount={selectedClient[0].discount}
          inputs={selectedClient[0].items}
        />
      </div>
    }
      
  </Modal>
</div>

</div>
</div>
    
    )
}
