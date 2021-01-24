import React, { useState } from 'react'
import { Modal } from '../../UI/Modal/Modal';
import { MdDelete } from "react-icons/md";
import classes from './Client.module.css';
import { EditClient } from '../../EditClient/EditClient';
import { AnimatePresence, motion } from 'framer-motion';

export const Client = (props) => {
    const [selectedClientId, setSelectedClientId] = useState();
    const [showModal, setShowModal] = useState(false);


    const clickAlterClient = (id) => {
        setSelectedClientId(id);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const alterThisClient = props.client.filter(client => client.id === selectedClientId);

    return (
    <>
    <AnimatePresence>
        <div className={classes.cards}>
                {props.filterClients.map((client) => (
                        <motion.div
                         whileHover={{ scale: 1.02 }} 
                         animate={{ y:0, opacity: 1 }} 
                         initial={{ y:30, opacity: 0 }} 
                         onClick={() => clickAlterClient(client.id)} 
                         className={classes.card} key={client.id}>
                            <h2>{client.companyName.toUpperCase()}</h2>
                            <span>{client.street} {client.number}</span>
                            <span>{client.zipcode} {client.city}</span>
                            <span>+{client.phone}</span>
                            <span>{client.email}</span>
                            <div className={classes.cardIcons}>
                                <MdDelete className={classes.deleteIcon} onClick={props.removeClient.bind(this, client.id)} size='1.8em' />
                            </div>
                        </motion.div>          
                ))} 
            
            <Modal modalClosed={closeModal} show={showModal}>
                <EditClient sendEditClient={props.sendEditClient} cancelEditClient={closeModal} editClient={alterThisClient}  />
            </Modal>
            
        </div>
    </AnimatePresence>
    </>)      
};
