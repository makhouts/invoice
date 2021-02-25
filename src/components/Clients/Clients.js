import React, {useState, useEffect} from 'react'
import { AddClient } from '../AddClient/AddClient';
import { Modal } from '../UI/Modal/Modal';
import { Client } from './Client/Client';
import { Button } from '../UI/Button/Button';
import { BigSpinner } from '../UI/Spinner/BigSpinner';
import { Notification } from '../UI/Notification/Notification';
import classes from './Clients.module.css';
import axios from 'axios';
import dummyClients from '../../DummyClients';
import { AnimatePresence, motion } from 'framer-motion';


export const Clients = () => {
    const [clients, setClients] = useState([]);
    const [spinner, setSpinner] = useState(false); 
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [textNotification, setTextNotification] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    


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
        setFilteredClients(
            clients.filter(client => {
                return client.companyName.toLowerCase().includes( searchTerm.toLowerCase() )
            })
        )
    }, [searchTerm, clients])

    const addClientHandler = (client) => {
        axios.post('https://invoice-app-b1329-default-rtdb.firebaseio.com/myclients.json', client)
        .then(res =>
            setClients(prevClients => [
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
        setSpinner(true)
        axios.delete(`https://invoice-app-b1329-default-rtdb.firebaseio.com/myclients/${clientId}.json`)
        .then(() => {
            setClients(prevClients => 
                prevClients.filter(client => client.id !== clientId)
            )
            setSpinner(false)
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
        return setClients(dummyClients)
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
                    <Button clicked={openAddClient}>Add Client</Button>
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
                    client={clients} 
                />
            </div>
            <h2 className={classes.centerNoClient}>{clients.length === 0 ? 'No clients' : null}</h2>

            <Button clicked={loadDummyClients}>Load</Button>
                    
            {spinner && <BigSpinner />} 
            <Modal modalClosed={modalClosed} show={showModal}>
                <AddClient addClient={addClientHandler} cancelAddingClient={modalClosed} />
            </Modal>
        </div>
    )
}
