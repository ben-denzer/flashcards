import {apiPromise} from './apiPromise';

const loginWithPassword = (credentials) => {
    return new Promise((resolve, reject) => {
        const {username, password, saveData} = credentials;
        const options = {username, password};
        apiPromise(options, 'auth/login').then(
            (data) => {
                if (saveData) localStorage.setItem('token', data.token);
                resolve({coins: data.coins, user: username});
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
        const {username, password, p2, saveData} = credentials;
        if (password !== p2) reject({error: 'Passwords Do Not Match'});

        const options = {username, password};
        apiPromise(options, 'auth/signup').then(
            (data) => {
                if (saveData) localStorage.setItem('token', data.token);
                resolve({coins: 0, user: username});
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
        const token = localStorage.getItem('token');
        if (token) {
            apiPromise({token}, 'auth/loginWithToken').then(
                (data) => resolve({coins: data.coins, user: data.username}),
                (err) => reject(err)
            )
        } else {
            resolve({coins: 0, user: null});
        }
    });
}

export {checkForToken, signup, loginWithPassword};