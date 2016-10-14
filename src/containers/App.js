import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import Flashcards from './Flashcards';
import Login from './Login';
import * as authActions from '../logic/authLogic';
import {shuffledWords} from '../logic/speachConfig';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'false',
            coins: 0,
            words: shuffledWords,
            authError: ''
        };
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.authSuccess = this.authSuccess.bind(this);
        this.correctAnswer = this.correctAnswer.bind(this);
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
        this.setState({user: data.user, coins: data.coins});
    }
    render() {
        console.log(this.state);
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                {this.state.user ?
                    <Flashcards
                        word={this.state.words[0] || 'There is an error, please refresh the page'}
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
