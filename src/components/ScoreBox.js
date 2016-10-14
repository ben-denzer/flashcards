import React from 'react';
import quarter from '../img/quarter.png';

const ScoreBox = (props) => {
    const {name, score} = props;
    return (
        <div id="scoreBox">
            <div id="nameBox">{name}</div>
            <img src={quarter} alt="" /> <span className="highlight" id="score">{score}</span>
        </div>
    );
};

export default ScoreBox;