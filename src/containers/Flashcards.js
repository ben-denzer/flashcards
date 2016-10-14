import React, {Component} from 'react';
import ScoreBox from '../components/ScoreBox';
import Card from '../components/Card';
import {recognition} from '../logic/speachConfig';

class Flashcards extends Component {
    constructor(props) {
        super(props);
        this.state = {foo: 'bar'};
    }
    componentWillUnmount() {
        recognition.stop();
    }
    render() {
        return (
            <div id="container">
                <ScoreBox name={this.props.username} score={this.props.coins} />
                <Card word={this.props.word} />
            </div>
        );
    }
}

export default Flashcards;