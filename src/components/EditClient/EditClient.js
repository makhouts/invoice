import React, {useState} from 'react'
import classes from './EditClient.module.css';
import { Spinner } from '../UI/Spinner/Spinner';
import { AiOutlineForm } from "react-icons/ai";
import { Button } from '../UI/Button/Button';
import axios from 'axios';

export const EditClient = (props) => {
    const [id] = useState(props.editClient[0].id);
    const [vat, setVat] = useState(props.editClient[0].vat);
    const [companyName, setCompanyName] = useState(props.editClient[0].companyName);
    const [street, setStreet] = useState(props.editClient[0].street);
    const [number, setNumber] = useState(props.editClient[0].number);
    const [city, setCity] = useState(props.editClient[0].city);
    const [zipcode, setZipcode] = useState(props.editClient[0].zipcode);
    const [phone, setPhone] = useState(props.editClient[0].phone);
    const [email, setEmail] = useState(props.editClient[0].email);
    const [invalidVat, setInvalidVat] = useState(false);
    const [spinner, setSpinner] = useState(false);

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
           alert('Gegevens ophalen niet mogelijk voor het moment. Excuses voor het ongemak.');
           setSpinner(false);
        })
        
    }

    const editClientHandler = (event) => {
        event.preventDefault();
        props.sendEditClient({id, vat, companyName, street, number, city, zipcode, phone, email })
    }

    let compSpinner = spinner && <Spinner />;
    const showIcon = vat.length === 12 && 
    <span> <AiOutlineForm className={classes.fillFormIcon} onClick={fillForm} size='1.3em'/></span>;


    return (
        <div>
            <div>
            <form onSubmit={editClientHandler}>
                <h2 className={classes.createClientTitle}>EDIT CLIENT</h2>
                {compSpinner}
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
                    <Button>Update</Button>
                    <Button typeButton='cancel' clicked={props.cancelEditClient}>Cancel</Button>
                </div>
                
            </form>
        </div>
        </div>
    )
}
