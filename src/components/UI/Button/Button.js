import React from 'react'
import classes from './Button.module.css';
import {motion} from 'framer-motion';

export const Button = (props) => {
    return <motion.button whileTap={{ scale: 0.8 }}
    disabled={props.disabled}
     className={[classes.button, classes[props.typeButton]].join(' ')} 
     onClick={props.clicked}>
    {props.children}</motion.button>
    
}
