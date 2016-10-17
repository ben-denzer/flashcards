import {apiPromise} from './apiPromise';

const addCoinToDB = (options) => {
    apiPromise({token: options.token, coins: options.newCoinVal}, 'actions/addCoin');
};

const logSkippedWord = (options) => {
    apiPromise(
        {
            token: options.token,
            username: options.user,
            currentWord: options.currentWord
        },
        'actions/logSkippedWord'
    );
}

export {addCoinToDB, logSkippedWord};