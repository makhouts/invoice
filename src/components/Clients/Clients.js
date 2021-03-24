import React, {useState, useEffect} from 'react'
import { AddClient } from '../AddClient/AddClient';
import { Modal } from '../UI/Modal/Modal';
import { Client } from './Client/Client';
import { Button } from '../UI/Button/Button';
import { BigSpinner } from '../UI/Spinner/BigSpinner';
import { Notification } from '../UI/Notification/Notification';
import classes from './Clients.module.css';
import axios from 'axios';
import { AiOutlineUserAdd } from 'react-icons/ai';
import dummyClients from '../../DummyClients';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';



export const Clients = (props) => {
    const [showNotification, setShowNotification] = useState(false);
    const [textNotification, setTextNotification] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const addClient = useParams();
    const [showModal, setShowModal] = useState(addClient.showForm == 'showForm' ? true : false);
    
    useEffect(() => {
        setFilteredClients(
            props.clients.filter(client => {
                return client.companyName.toLowerCase().includes( searchTerm.toLowerCase() )
            })
        )
    }, [searchTerm, props.clients]);


    const addClientHandler = (client) => {
        axios.post('https://invoice-app-b1329-default-rtdb.firebaseio.com/myclients.json', client)
        .then(res =>
            props.setClients(prevClients => [
                ...prevClients, 
                {id: res.data.name, ...client }
            ])
        )
        .then(() => setShowNotification(true), setTextNotification('Client successfully added!'))
        .then(() => setShowModal(false))
        .catch(err => alert(err));

        setShowNotification(false);
    };

    const removeClientHandler = (clientId, event) => {
        props.setSpinner(true)
        axios.delete(`https://invoice-app-b1329-default-rtdb.firebaseio.com/myclients/${clientId}.json`)
        .then(() => {
            props.setClients(prevClients => 
                prevClients.filter(client => client.id !== clientId)
            )
            props.setSpinner(false)
        })
        .then(() => setShowNotification(true), setTextNotification('Client removed!'));
        setShowNotification(false);
        event.stopPropagation();
    }

    const editClientHandler = (editedClient) => {
        axios.put(`https://invoice-app-b1329-default-rtdb.firebaseio.com/myclients/${editedClient.id}.json`, editedClient) 
        .then(() => {
            window.location.reload();
        })
        .then(() => setShowNotification(true), setTextNotification('Client successfully edited!'))
        .then(() => setShowModal(false))
        .catch((err) => {
            alert(err)
        })
        setShowNotification(false);
    }

    const openAddClient = () => {
        setShowModal(true)
    }

    const modalClosed = () => {
        setShowModal(false);
    }
   

    let notification = null;
    if (showNotification) {
        notification = <Notification>{textNotification}</Notification>
    }

    const loadDummyClients = () => {
        return props.setClients(dummyClients)
    }


    return (
        <div className='startContent'>
            {notification}
            <motion.div   initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                type: "spring",
                stiffness: 360,
                damping: 15}} 
                className={classes.addClient}>
                    <Button clicked={openAddClient}><AiOutlineUserAdd />Add Client</Button>
                    <input 
                    type='text' 
                    placeholder='Search client' 
                    onChange={(event) => setSearchTerm(event.target.value)} 
                />
            </motion.div>
            <div className={classes.lineBottom}></div>
            <span>{filteredClients.length} clients found</span>
            <div className={classes.bgClients}>
                <Client 
                    filterClients = {filteredClients}
                    removeClient={removeClientHandler} 
                    sendEditClient={editClientHandler}
                    client={props.clients} 
                />
            </div>
            <h2 className={classes.centerNoClient}>{props.clients.length === 0 ? 'No clients' : null}</h2>

            <Button clicked={loadDummyClients}>Load</Button>
                    
            {props.spinner && <BigSpinner />}
            <Modal modalClosed={modalClosed} show={showModal}>
                <AddClient addClient={addClientHandler} cancelAddingClient={modalClosed} />
            </Modal>
        </div>
    )
}
