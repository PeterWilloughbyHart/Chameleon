import React from 'react';
import chameleon_icon from '../images/chameleon.jpg';
import styles from '../component-styles/Header.scss';
import {Link} from 'react-router-dom';

export default function Header() {

    return(
        <div id="web-Header">
            <img alt="logo" id="logo" width="50px" height="50px" src={chameleon_icon}/>
            <h3>Chameleon</h3>
            <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="/Gallery"><li>Gallery</li></Link>
            </ul>
        </div>
    )
    
}