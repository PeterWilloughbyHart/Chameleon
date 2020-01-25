import React from 'react';
import chameleon_icon from '../images/chameleon.jpg';
import styles from '../component-styles/Header.scss';

export default function Header() {

    return(
        <div id="web-Header">
            <img alt="logo" id="logo" width="50px" height="50px" src={chameleon_icon}></img>
            <ul>
                <li>Chameleon</li>
            </ul>
        </div>
    )
    
}