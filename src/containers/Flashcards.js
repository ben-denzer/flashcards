import React, {Component} from 'react';
import ScoreBox from '../components/ScoreBox';
import Card from '../components/Card';
import {recognition} from '../logic/speachConfig';

class Flashcards extends Component {
    constructor(props) {
        super(props);
        this.showCoin = this.showCoin.bind(this);
    }
    componentDidUpdate() {
        if (this.props.score % 3 === 0 && this.props.score) {
            this.showCoin();
        }
    }
    componentWillUnmount() {
        recognition.stop();
    }
    showCoin() {
        console.log('showcoin called');
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