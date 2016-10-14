import React, {Component} from 'react';
import ScoreBox from '../components/ScoreBox';
import Card from '../components/Card';

class Flashcards extends Component {
    constructor(props) {
        super(props);
        this.state = {foo: 'bar'};
    }
    render() {
        return (
            <div id="container">
                <ScoreBox name="Ben" score="5" />
                <Card word='too' />
            </div>
        );
    }
}

export default Flashcards;