import {apiPromise} from './apiPromise';

const loginWithPassword = (credentials) => {
    return new Promise((resolve, reject) => {
        const {username, password, saveData} = credentials;
        const options = {username, password};
        apiPromise(options, 'auth/login').then(
            (data) => {
                if (saveData) window.localStorage.setItem('token', data.token);
                resolve({coins: data.coins, user: username, token: data.token});
            }, (err) => {
                if (err === 'unauthorized') {
                    reject({error: 'Invalid username or password'});
                } else {
                    reject({error: 'Network Error, Please Try Again'});
                }
            }
        )
    });
};

const signup = (credentials) => {
    return new Promise((resolve, reject) => {
        const {username, password, p2, email, saveData} = credentials;
        if (username.length < 2) return reject({error: 'Username Must Be at Least 2 Characters Long'});
        if (password.length < 4) return reject({error: 'Password Must Be at Least 4 Characters Long'});
        if (password !== p2) return reject({error: 'Passwords Do Not Match'});

        const options = {username, password, email};
        apiPromise(options, 'auth/signup').then(
            (data) => {
                if (saveData) window.localStorage.setItem('token', data.token);
                resolve({coins: 0, user: username, token: data.token});
            }, (err) => {
                if (err === 'unauthorized') {
                    reject({error: 'Username Is Already In Use'});
                } else {
                    reject({error: 'Network Error, Please Try Again'});
                }
            }
        )
    });
};

const checkForToken = () => {
    return new Promise((resolve, reject) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            return apiPromise({token}, 'auth/loginWithToken').then(
                (data) => {
                    resolve({coins: data.coins, user: data.username, token: data.token})
                },
                (err) => reject(err)
            )
        } else {
            resolve({coins: 0, user: null});
        }
    });
};

const sendResetEmail = (options) => {
    return new Promise((resolve, reject) => {
        apiPromise(options, 'auth/resetPassword').then(
            () => resolve(),
            () => reject({error: 'Network Error, Please Try Again'})
        );
    });
};

const resetPw = (options, tokenUrl) => {
    console.log('promise', tokenUrl);
    return new Promise((resolve, reject) => {
        apiPromise(options, `auth/reset/${tokenUrl}`).then(
            (data) => resolve({coins: data.coins, user: data.username, token: data.token}),
            (err) => reject(err)
        );
    });
};

export {checkForToken, signup, loginWithPassword, sendResetEmail, resetPw};