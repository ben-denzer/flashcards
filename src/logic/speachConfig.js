const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 15;

const wordList = [
    'the',
    'Some of them',
    'and',
    'It is a bee',
    'to me',
    'in',
    'is',
    'you',
    'that',
    'It is for me',
    'he',
    'was',
    'for',
    'On there',
    'are',
    'You can see',
    'with',
    'his',
    'they',
    'I can use it',
    'at',
    'Be on time',
    'this',
    'have',
    'from',
    'You or me',
    'one',
    'I had fun',
    'by',
    'little',
    'but',
    'not',
    'what',
    'all',
    'We were here',
    'we',
    'when',
    'your',
    'can',
    'said',
    'there',
    'use',
    'Have an apple',
    'me',
    'which',
    'she',
    'do',
    'how',
    'their',
    'if',
    'will',
    'up',
    'here',
    'about',
    'out',
    'many',
    'then',
    'them',
    'these',
    'so',
    'some',
    'her',
    'would',
    'make',
    'like',
    'him',
    'into',
    'time',
    'She has it',
    'look',
    'two',
    'help',
    'good',
    'go',
    'see',
    'number',
    'no',
    'does',
    'could',
    'where',
    'my',
    'than',
    'first',
    'want',
    'been',
    'Me too',
    'who',
    'I am first',
    'Hold its hand',
    'now',
    'find',
    'long',
    'down',
    'day',
    'did',
    'get',
    'come',
    'made',
    'may',
    'play'
];

//fisher yates shuffle
const shuffle = (wordList) => {
    let k = wordList.length;
    if (k === 0) {
        return false;
    }
    else {
        while (--k) {
            let m = Math.floor(Math.random() * ( k + 1 ));
            let tempi = wordList[k];
            let tempj = wordList[m];
            wordList[k] = tempj;
            wordList[m] = tempi;
        }
    }
    return wordList;
};

// let correctAnswer = (pass) => {
//     wordIndex < wordList.length - 1 ? ++wordIndex : wordIndex = 0;
//     if (!pass) {
//         score++;
//     }
//     if (score % 10 === 0 && score !== 0) {
//         ++quarters;
//         getId('word').innerHTML = '<div class="highlight">GOOD JOB!</div><div><img src="img/quarter.gif-c200" height="100" width="100" alt=""></div>';
//         for (let i = 0; i < 3; i++) {
//             getId('ding').play();
//         }

//         getId('score').innerText = quarters;
//         apiPromise({token, coins: quarters}, 'actions/addCoin');
//         setTimeout(() => {
//             recognition.start();
//             showWord(wordList[wordIndex])
//         }, 5000);
//     } else {
//         showWord(wordList[wordIndex]);
//     }
// };

// let showWord = (word) => {
//     getId('word').innerText = word;
//     listen(word);
// };

export const shuffledWords = shuffle(wordList);
export {recognition};