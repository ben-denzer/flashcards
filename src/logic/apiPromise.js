const apiUrl = 'https://bdenzer.xyz/flashcards/';
//const apiUrl = 'http://localhost:8000/flashcards/';

const apiPromise = (options, url) => {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open('POST', apiUrl + url);
        req.setRequestHeader('Content-Type', 'application/json');

        req.onload = () => {
            if (req.status >= 200 && req.status < 400) {
                resolve(JSON.parse(req.responseText));
            } else if (req.status === 401 || req.status === 403) {
                reject('unauthorized');
            } else if (req.status < 500) {
                reject('request error');
            } else {
                reject('server error');
            }
        };

        req.onerror = () => {
            reject('onError called');
        }

        req.send(JSON.stringify(options));
    });
};

export {apiPromise};