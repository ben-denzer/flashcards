import React from 'react';
import arrow from '../img/arrow.png';

const Card = (props) => {
    let {word, skipWord} = props;
    return (
        <div id="card">
            <div id="word">{word}</div>
            <div id="arrowBox"><img onClick={skipWord} src={arrow} alt="next" /></div>
        </div>
    );
};

export default Card;