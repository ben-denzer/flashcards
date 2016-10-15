import React, {Component} from 'react';
import ScoreBox from '../components/ScoreBox';
import Card from '../components/Card';
import {recognition} from '../logic/speachConfig';

class Flashcards extends Component {
    constructor(props) {
        super(props);
        this.state = {sound: 'PLAYING'};
    }
    componentWillUnmount() {
        recognition.stop();
    }
    render() {
        return (
            <div id="container">
                <ScoreBox name={this.props.name} score={this.props.coins} />
                <Card word={this.props.word} />
                <audio ref={(ref) => this.myDing = ref} id="myDing" src="../../ding.mp3" />
            </div>
        );
    }
}

export default Flashcards;