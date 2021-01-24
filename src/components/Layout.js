import React, { useState } from 'react'
import { Header } from './UI/Header/Header';
import { Backdrop } from './UI/Backdrop/Backdrop';

export const Layout = (props) => {
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showMenu, setShowMenu] = useState(true);

    const BackdropClicked = () => {
            setShowBackdrop(false);
            setShowMenu(false);
    } 

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setShowBackdrop(!showBackdrop);
    }

    return (
        <>
            <Header showMenu={showMenu} showBackdrop={showBackdrop} clicked={toggleMenu} />
            <Backdrop show={showBackdrop} clicked={BackdropClicked} />
        </>
    );
};

