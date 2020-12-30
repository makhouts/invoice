import React, { useState } from 'react'
import { Header } from './UI/Header/Header';
import { Backdrop } from './UI/Backdrop/Backdrop';

export const Layout = (props) => {
    const [showBackdrop, setShowBackdrop] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    const BackdropClicked = () => {
        return setShowBackdrop(false);
    } 

    const openMenu = () => {
        setShowMenu(true);
        setShowBackdrop(true);
    }

    return (
        <>
            <Header showMenu={showMenu} clicked={openMenu} />
            <p style={{margin: '200px'}}>sofkofk</p>
            <Backdrop show={showBackdrop} clicked={BackdropClicked} />
        </>
    );
};

