import React from 'react';
import Hero from '../../assets/Hero.png';
import './Home.css';

export default function Home() {
    return(
        <div>
            <img alt='Hero' className="hero" src={Hero}/>
            <div className="navbar">
                <label className="title">SHOPTIK</label>
            </div>
        </div>
    )
}