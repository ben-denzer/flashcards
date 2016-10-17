import React, { Component } from 'react';
import '../css/App.scss';
import Flashcards from './Flashcards';
import Login from './Login';
import Header from '../components/Header';
import * as authActions from '../logic/authLogic';
import * as gameActions from '../logic/gameActions';
import {shuffledWords, recognition} from '../logic/speachConfig';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            coins: 0,
            words: shuffledWords,
            wordIndex: 0,
            authError: '',
            score: 0,
            token: null
        };

        const localFunctions = [
            'signup',
            'login',
            'authSuccess',
            'correctAnswer',
            'listen',
            'addCoin',
            'skipWord',
            'logout'
        ];

        localFunctions.forEach(a => this[a] = this[a].bind(this));
    }
    componentDidMount() {
        authActions.checkForToken().then(
            (data) => {
                this.authSuccess(data);
            },
            () => console.log('check token error')
        );
    }
    signup(credentials) {
        authActions.signup(credentials).then(
            (data) => this.authSuccess(data),
            (err) => this.setState({authError: err})
        );
    }
    login(credentials) {
        authActions.loginWithPassword(credentials).then(
            (data) => this.authSuccess(data),
            (err) => this.setState({authError: err})
        );
    }
    authSuccess(data) {
        if (data.token) this.setState({token: data.token});

        if (data.user) {
            recognition.start();
            this.listen(this.state.words[0]);
            this.setState({user: data.user, coins: data.coins});
        }
    }
    listen(phrase) {
        let passedTest = false;
        recognition.onresult =(event) => {
            for (let i = 0; i < 10; i++) {
                if (event.results[0][i]) {
                    let wordsFromBrowser = event.results[0][i].transcript.toLowerCase().split(' ');
                    let correctWords = phrase.toLowerCase().split(' ');
                    if (correctWords.every(a => wordsFromBrowser.indexOf(a) !== -1)) {
                        passedTest = true;
                    }
                }
            }
            if (passedTest) this.correctAnswer();
        };
        recognition.onend = () => !passedTest && this.state.user ? recognition.start() : null;
    };
    correctAnswer() {
        document.getElementById('ding').play();
        this.setState({
            wordIndex: ++this.state.wordIndex,
            score: ++this.state.score
        });
        this.listen(this.state.words[this.state.wordIndex]);
    }
    addCoin() {
        const {coins, token} = this.state;
        const newCoinVal = coins + 1;
        this.setState({coins: newCoinVal, score: 0});
        gameActions.addCoinToDB({token, newCoinVal});
    }
    skipWord() {
        const {token, user, words, wordIndex} = this.state;
        const currentWord = words[wordIndex];
        gameActions.logSkippedWord({token, user, currentWord});
        this.listen(words[wordIndex + 1]);
        this.setState({wordIndex: wordIndex + 1});
    }
    logout() {
        this.setState({user: null, coins: null, token: null});
        recognition.stop();
        window.localStorage.clear();
    }
    render() {
        const {words, wordIndex, user, coins, score} = this.state;
        return (
            <div id="container" className="App">
                <Header logout={this.logout} user={user} />
                {this.state.user ?
                    <Flashcards
                        word={words[wordIndex] || 'There is an error, please refresh the page'}
                        name={user}
                        coins={coins}
                        correctAnswer={this.correctAnswer}
                        score={score}
                        addCoin={this.addCoin}
                        skipWord={this.skipWord}
                        listen={this.listen}
                    /> :
                    <Login signup={this.signup} login={this.login} error={this.state.authError} />
                }
            </div>
        );
    }
}

export default App;
