import classes from './AddClient.module.css'
import React, { useState } from 'react'
import { Button } from '../UI/Button/Button';
import { AiOutlineForm } from "react-icons/ai";
import { Spinner } from '../UI/Spinner/Spinner';
import axios from 'axios';

export const AddClient = (props) => {
    const [vat, setVat] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [invalidVat, setInvalidVat] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const addClientHandler = (event) => {
        event.preventDefault();
        props.addClient({vat, companyName, street, number, city, zipcode, phone, email});
        
    }

    const fillForm = () => {
        setSpinner(true)
        axios.get(`https://controleerbtwnummer.eu/api/validate/${vat}.json`)
        .then(response => {
            if(response.data.valid) {
                setSpinner(false)
                setInvalidVat(false);
                setCompanyName(response.data.name);
                setStreet(response.data.address.street);
                setNumber(response.data.address.number);
                setCity(response.data.address.city);
                setZipcode(response.data.address.zip_code)
            } else {
                setInvalidVat(true);
                setSpinner(false);
            }
        })
        .catch(err => {
           console.log('dit is de error' + err)
           alert('Gegevens ophalen niet mogelijk voor het moment. Excuses voor het ongemak.');
           setSpinner(false);
        })
        
    }
    
        let compSpinner = spinner && <Spinner />;
        const showIcon = vat.length === 12 && 
        <span> <AiOutlineForm className={classes.fillFormIcon} onClick={fillForm} size='1.3em'/></span>;
    

    return (
        <div>
            <form onSubmit={addClientHandler}>
                {compSpinner}
                <h2 className={classes.createClientTitle}>CREATE CLIENT</h2>
                <div className={classes.formContent}>
                    <div className={classes.group}>
                        <input id='vat'
                         maxLength='12'
                         type='text'
                         value={vat} 
                         onChange={e => setVat(e.target.value)}
                         required />
                        <label>VAT</label>
                        {showIcon}
                        {invalidVat ? <p className={classes.invalidVat}>Invalid VAT!</p> : null }
                    </div>
                    <div className={classes.group}>
                        <input 
                        id='companyName' 
                        type='text' 
                        value={companyName} 
                        onChange={e => setCompanyName(e.target.value)}
                        required />
                        <label>Company</label>
                    </div>
                    <div className={classes.group}>
                        <input 
                        id='street' 
                        type="text" 
                        value={street} 
                        onChange={e => setStreet(e.target.value)}
                        required/>
                        <label>Street</label>
                    </div>
                    <div className={classes.group}>
                        <input 
                        id='number' 
                        type="text"
                        value={number} 
                        onChange={e => setNumber(e.target.value)}
                        required/>
                        <label>Number</label>
                    </div>
                    <div className={classes.group}>
                        <input 
                        id='city' 
                        type="text" 
                        value={city} 
                        onChange={e => setCity(e.target.value)}
                        required/>
                        <label>City</label>
                    </div>
                    <div className={classes.group}>
                        <input 
                        id='zipcode' 
                        maxLength='7'
                        type="text" 
                        value={zipcode} 
                        onChange={e => setZipcode(e.target.value)}
                        required/>
                        <label>Zipcode</label>
                    </div>
                    <div className={classes.group}>
                        <input 
                        id='phone' 
                        type="number" 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)}
                        required/>
                        <label>Phone</label>
                    </div>
                    <div className={classes.group}>
                        <input 
                        id='email' 
                        type="email"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        required />
                        <label>Email</label>
                    </div>
                </div>
                <div className={classes.centerBtn}>                
                    <Button>Save</Button>
                    <Button typeButton='cancel' clicked={props.cancelAddingClient}>Cancel</Button>
                </div>
                
            </form>
        </div>
    )
}
