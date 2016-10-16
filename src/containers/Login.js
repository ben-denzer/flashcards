import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            loginPw: '',
            loginSave: false,
            signupName: '',
            signupPw: '',
            signupPw2: '',
            signupSave: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.signupClicked = this.signupClicked.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }
    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }
    handleCheck(e) {
        this.setState({[e.target.id]: e.target.checked});
    }
    signupClicked(e) {
        e.preventDefault();
        const {signupName, signupPw, signupPw2, signupSave} = this.state;
        this.props.signup({
            username: signupName,
            password: signupPw,
            p2: signupPw2,
            saveData: signupSave
        });
    }
    loginClicked(e) {
        e.preventDefault();
        const {loginName, loginPw, loginSave} = this.state;
        this.props.login({
            username: loginName,
            password: loginPw,
            saveData: loginSave
        });
    }
    render() {
        const {loginName, loginPw, loginSave, signupName, signupPw, signupPw2, signupSave} = this.state;
        return (
            <div id="loginBox">
                <form className="formBox" id="loginForm">
                    <h2>Log In</h2>
                    <div
                        className="errorBox"
                        id="loginError"
                    >
                        {this.props.error.error}
                    </div>
                    <label>
                        Username
                        <input
                            id="loginName"
                            onChange={this.handleChange}
                            value={loginName}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            id="loginPw"
                            onChange={this.handleChange}
                            value={loginPw}
                        />
                    </label>
                    <label className="saveInfo">
                        Keep Me Signed In
                        <input
                            type="checkbox"
                            id="loginSave"
                            onChange={this.handleCheck}
                            value={loginSave}
                        />
                    </label>
                    <button
                        className="formButton"
                        id="loginButton"
                        onClick={this.loginClicked}
                    >
                        Log In
                    </button>
                </form>
                <form className="formBox" id="signupForm">
                    <h2> Sign Up</h2>
                    <div className="errorBox" id="signupError"></div>
                    <label>
                        Username
                        <input
                            id="signupName"
                            value={signupName}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            id="signupPw"
                            type="password"
                            value={signupPw}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Re-Type Password
                        <input
                            id="signupPw2"
                            type="password"
                            value={signupPw2}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label className="saveInfo">
                        Keep Me Signed In
                        <input
                            id="signupSave"
                            type="checkbox"
                            value={signupSave}
                            onChange={this.handleCheck}
                        />
                    </label>
                    <button
                        className="formButton"
                        id="signupButton"
                        onClick={this.signupClicked}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;