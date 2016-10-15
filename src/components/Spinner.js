import React from 'react';
import coin from '../img/coin.jpg';

export const Spinner = () => {
    console.log('spinner called');
    return (
        <div>
            <h1 className="highlight">Good Job!</h1>
            <img src={coin} id="spinner" />
        </div>
    );
};
