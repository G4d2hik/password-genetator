// Получение всех элементов со страницы
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

// !! Функции-генераторы символов

// Строчные буквы
function createRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Заглавные буквы
function createRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Случайные числа
function createRandomNumber() {
    return (Math.floor(Math.random() * 10));
}

// Случайные символы
function createRandomSymbol() {
    const symbols = "`~!@#$%^&*()_-+={}[]|:;'<>,.?/";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
    lower: createRandomLower,
    upper: createRandomUpper,
    number: createRandomNumber,
    symbol: createRandomSymbol
};

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) { return; }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Пароль успешно скопирован');
});

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
//  Функция генерации пароля
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    // Если все инпуты не выбраны, то возвращает пустую строку
    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

