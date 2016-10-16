import React, {Component} from 'react';
import ScoreBox from '../components/ScoreBox';
import Card from '../components/Card';
import {recognition} from '../logic/speachConfig';
import {Spinner} from '../components/Spinner';

class Flashcards extends Component {
    constructor(props) {
        super(props);
        this.state = {showCoin: false, update: true, coinHasBeenShown: false};
        this.showCoin = this.showCoin.bind(this);
        this.skipWord = this.skipWord.bind(this);
    }
    componentWillReceiveProps() {
        console.log('willRecieve', 'props', this.props, 'state', this.state);
        if (this.state.coinHasBeenShown) this.setState({coinHasBeenShown: false});
    }
    shouldComponentUpdate() {
        console.log('shouldUpdate', 'props', this.props, 'state', this.state);

        return this.state.update ? true : false;
    }
    componentDidUpdate() {
        console.log('componentDid', 'props', this.props, 'state', this.state)
        if (this.props.score % 3 === 0 && this.props.score && !this.state.coinHasBeenShown) {
            this.showCoin();
            this.setState({update: false});
        }
    }
    componentWillUnmount() {
        recognition.stop();
    }
    showCoin() {
        this.setState({showCoin: true});
        this.props.addCoin();
        setTimeout(() => this.setState({showCoin: false, update: true, coinHasBeenShown: true}), 4000);
    }
    skipWord() {
        this.props.skipWord();
    }
    render() {
        console.log('render', 'props', this.props, 'state', this.state);
        return (
            <div id="container">
                <ScoreBox name={this.props.name} score={this.props.coins} />
                <Card skipWord={this.skipWord} word={this.state.showCoin ? <Spinner /> : this.props.word} />
            </div>
        );
    }
}

export default Flashcards;