const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 15;
    //recognition.grammars = wordList;

const wordList = [
    'the',
    'Some of them',
    'and',
    'It is a bee',
    'to',
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

export const shuffledWords = shuffle(wordList);
export {recognition};