import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import Flashcards from './Flashcards';
import Login from './Login';
import * as authActions from '../logic/authLogic';
import {shuffledWords, recognition} from '../logic/speachConfig';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coins: 0,
            words: shuffledWords,
            wordIndex: 0,
            authError: '',
            score: 0
        };
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.authSuccess = this.authSuccess.bind(this);
        this.correctAnswer = this.correctAnswer.bind(this);
        this.listen = this.listen.bind(this);
    }
    componentDidMount() {
        authActions.checkForToken().then(
            (data) => this.authSuccess(data),
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
                    console.log(wordsFromBrowser, correctWords);
                    if (correctWords.every(a => wordsFromBrowser.indexOf(a) !== -1)) {
                        this.setState({wordIndex: ++this.state.wordIndex, score: ++this.state.score});
                        this.correctAnswer();
                        passedTest = true;
                    }
                }
            }
        };
        recognition.onend = () => !passedTest ? recognition.start() : null;
    };
    correctAnswer() {
        console.log('hit correctAnswer');
        this.listen(this.state.words[this.state.wordIndex]);
    }
    render() {
        console.log(this.state, 'state');
        console.log(Boolean(this.state.user), 'asdlfkj');
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                {this.state.user ?
                    <Flashcards
                        word={this.state.words[this.state.wordIndex] || 'There is an error, please refresh the page'}
                        username={this.state.username}
                        coins={this.state.coins}
                        correctAnswer={this.correctAnswer}
                    /> :
                    <Login signup={this.signup} login={this.login} error={this.state.authError} />
                }
            </div>
        );
    }
}

export default App;
