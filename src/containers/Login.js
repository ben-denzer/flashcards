import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            loginPw: '',
            loginSave: false,
            forgotPwEmail: '',
            signupName: '',
            signupPw: '',
            signupPw2: '',
            signupEmail: '',
            signupSave: false,
            resetPwUsername: '',
            resetPw: '',
            resetPw2: '',
            forgotPassword: false,
            location: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.signupClicked = this.signupClicked.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.sendResetEmail = this.sendResetEmail.bind(this);
        this.resetPw = this.resetPw.bind(this);
    }
    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }
    handleCheck(e) {
        this.setState({[e.target.id]: e.target.checked});
    }
    signupClicked(e) {
        e.preventDefault();
        const {signupName, signupPw, signupPw2, signupEmail, signupSave} = this.state;
        this.props.signup({
            username: signupName,
            password: signupPw,
            p2: signupPw2,
            email: signupEmail,
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
    forgotPassword() {
        this.setState({forgotPassword: true});
    }
    sendResetEmail(e) {
        e.preventDefault();
        this.props.sendResetEmail({email: this.state.forgotPwEmail});
    }
    resetPw(e) {
        e.preventDefault();
        const path = window.location.pathname;
        console.log('to', path.slice(path.lastIndexOf('/') + 1));
        const {resetPwUsername, resetPw, resetPw2} = this.state;
        if (resetPw !== resetPw2) return this.props.showError({error: 'Passwords Do Not Match'});
        this.props.resetPw(
            {
                username: resetPwUsername,
                password: resetPw
            },
            path.slice(path.lastIndexOf('/') + 1)
        );
    }
    render() {
        const {
            loginName,
            loginPw,
            loginSave,
            signupName,
            signupPw,
            signupPw2,
            signupEmail,
            signupSave,
            resetPwUsername,
            resetPw,
            resetPw2,
            forgotPassword
        } = this.state;

        return (
            <div id="loginBox">
                { this.props.pwReset ?
                    <form className="formBox" id="resetForm">
                        <h2>Reset Password</h2>
                        <div
                            className="errorBox"
                            id="resetPwError"
                        >
                            {this.props.error.error}
                        </div>
                        <label>Username<input
                            id="resetPwUsername"
                            onChange={this.handleChange}
                            value={resetPwUsername}
                        /></label>
                        <label>New Password<input
                            id="resetPw"
                            type="password"
                            onChange={this.handleChange}
                            value={resetPw}
                        /></label>
                        <label>Re-Type Password<input
                            id="resetPw2"
                            type="password"
                            onChange={this.handleChange}
                            value={resetPw2}
                        /></label>
                        <button onClick={this.resetPw}>Reset</button>
                    </form> :

                    <div>
                        <form className="formBox" id="loginForm">
                            <h2>Log In</h2>
                            <div
                                className="errorBox"
                                id="loginError"
                            >
                                {this.props.error.error}
                            </div>
                            <label>
                                <span>Username</span>
                                <input
                                    id="loginName"
                                    onChange={this.handleChange}
                                    value={loginName}
                                />
                            </label>
                            <label>
                                <span>Password</span>
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
                            <a id="forgot_pw" onClick={this.forgotPassword}>Forgot Username or Password</a>
                            {forgotPassword &&
                                <div>
                                    <label>
                                        Email
                                        <input type="email" id="forgotPwEmail" onChange={this.handleChange} />
                                    </label>
                                    <button onClick={this.sendResetEmail}>Reset Password</button>
                                </div>
                            }
                        </form>
                        <form className="formBox" id="signupForm">
                            <h2> Sign Up</h2>
                            <div className="errorBox" id="signupError">
                                {this.props.error.error}
                            </div>
                            <label>
                                <span>Username</span>
                                <input
                                    id="signupName"
                                    value={signupName}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                <span>Password</span>
                                <input
                                    id="signupPw"
                                    type="password"
                                    value={signupPw}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                <span>Re-Type Password</span>
                                <input
                                    id="signupPw2"
                                    type="password"
                                    value={signupPw2}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                <span>Email (optional) ONLY used to re-set your password</span>
                                <input
                                    id="signupEmail"
                                    type="email"
                                    value={signupEmail}
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
                }
            </div>
        );
    }
}

export default Login;