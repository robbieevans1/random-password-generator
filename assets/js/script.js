// DOM elements
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtnEl = document.getElementById("generate");

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Add event listener to generate button
generateBtnEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;


    passwordEl.innerText = generatePassword(
        hasLower,
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length
    );
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    // console.log('typesCount: ', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    
    (item => Object.values(item)[0]);

    // console.log('typesArr: ', typesArr);

    if(typesCount === 0) {
        alert("You must select a password length and at least one other criteria to generate a password.")
        return '';
    }

    if(length < 8 || length > 128) {
        alert("You must select a password length between 8 and 128 characters.")
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            // console.log('funcName: ', funcName)
            
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()[]{}=/?';
    return symbols[Math.floor(Math.random() * symbols.length)];
}



