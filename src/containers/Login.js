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
            resetPw: '',
            resetPw2: '',
            forgotPassword: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.signupClicked = this.signupClicked.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        this.resetPwClicked = this.resetPwClicked.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.sendResetEmail = this.sendResetEmail.bind(this);
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
    resetPwClicked(e) {
        e.preventDefault();
        const {resetPw, resetPw2} = this.state;
        if (resetPw === resetPw2) {
            //this.props.resetPassword({})
        } else {
            return;
        }
    }
    forgotPassword() {
        this.setState({forgotPassword: true});
    }
    sendResetEmail(e) {
        e.preventDefault();
        this.props.sendResetEmail({email: this.state.forgotPwEmail});
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
            resetPw,
            resetPw2,
            forgotPassword
        } = this.state;

        return (
            <div id="loginBox">
                { this.props.pwReset ?
                    <form className="formBox" id="resetForm">
                        <h2>Reset Password</h2>
                        <h3>{this.props.resetUser}</h3>
                        <input id="resetPw" type="password" onChange={this.handleChange} value={resetPw} />
                        <input id="resetPw2" type="password" onChange={this.handleChange} value={resetPw2} />
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