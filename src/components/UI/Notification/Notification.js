import classes from './Notification.module.css'
import React, {useState} from 'react'
import { AiFillCheckCircle } from "react-icons/ai";
import {AnimatePresence, motion} from 'framer-motion'


export const Notification = (props) => {
    const [showNotification, setShowNotification] = useState(true);

    setTimeout(() => {
        setShowNotification(false);
    }, 3000);

    return showNotification ? 
     (<>
        <AnimatePresence>
            <motion.div 
            animate={{width: 400 }}
            initial={{ width: 0 }}
            exit={{width: 0 }}
            onClick={() => setShowNotification(false)}
            className={classes.notificationBox}>
                <p><AiFillCheckCircle className={classes.checkIcon} />{props.children}</p>
            </motion.div>
        </AnimatePresence>
    </>
    ) : null;
}
