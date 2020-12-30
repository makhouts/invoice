import React, { useState } from 'react'
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { FiAlignLeft } from "react-icons/fi";
 
export const Header = (props) => {

    return(
<>
        <div className={classes.navicon} onClick={props.clicked}>
                <FiAlignLeft className={classes.burger} />
        </div> 
        
        <header className={props.showMenu ? classes.sideNav : classes.hideNav} >
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/'><li>Invoice</li></Link>
                <Link to='/'><li>Invoices</li></Link>
                <Link to='/'><li>Trash</li></Link>
            </ul>
        </header>
</>
    )
};