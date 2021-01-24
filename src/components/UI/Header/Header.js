import React from 'react'
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { FiAlignLeft } from "react-icons/fi";
 
export const Header = (props) => {
    return(
<>
        <div className={classes.navicon} onClick={props.clicked}>
                <FiAlignLeft className={classes.burger} />
        </div> 
        
        <header className={props.showMenu ? classes.sideNav : classes.hideNav} >
            <ul>
                <NavLink to='/'><img src="../../../assets/logo.png" alt=""/><li>Home</li></NavLink>
                <NavLink to='/clients'><li>Clients</li></NavLink>
                <NavLink to='/invoices'><li>Invoices</li></NavLink>
                <NavLink to='/settings'><li>Settings</li></NavLink>
                
            </ul>
        </header>
</>
    )
};