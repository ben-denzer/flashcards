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
        //this.showWord = this.showWord.bind(this);
    }
    componentWillReceiveProps() {
        if (this.state.coinHasBeenShown) this.setState({coinHasBeenShown: false});
    }
    shouldComponentUpdate() {
        return this.state.update ? true : false;
    }
    componentDidUpdate() {
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
        setTimeout(() => this.setState({showCoin: false, update: true, coinHasBeenShown: true}), 4000);
    }
    render() {
        console.log(this.state.coinHasBeenShown);
        return (
            <div id="container">
                <ScoreBox name={this.props.name} score={this.props.coins} />
                <Card word={this.state.showCoin ? <Spinner /> : this.props.word} />
            </div>
        );
    }
}

export default Flashcards;