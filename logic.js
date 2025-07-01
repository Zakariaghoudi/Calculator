const historyDisplay = document.getElementById('history-display');
const resultDisplay = document.getElementById('result-display');
const keypad = document.querySelector('.keypad');

let currentInput = '';
let previousInput = '';
let operator = null;

keypad.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const keyData = key.dataset.key;
    const operatorData = key.dataset.operator;
    const actionData = key.dataset.action;

    if (keyData) {
        if (keyData === '.' && currentInput.includes('.')) return;
        currentInput += keyData;
    }

    if (operatorData) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = operatorData;
        previousInput = currentInput;
        currentInput = '';
    }

    if (actionData) {
        if (actionData === 'calculate') {
            calculate();
        }
        if (actionData === 'delete') {
            currentInput = currentInput.slice(0, -1);
        }
        if (actionData === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = null;
        }
    }

    updateDisplay();
});

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (operator === '+') result = prev + current;
    else if (operator === '-') result = prev - current;
    else if (operator === '*') result = prev * current;
    else if (operator === '/') result = prev / current;
    else return;
    
    currentInput = result.toString();
    operator = null;
    previousInput = '';
}

function updateDisplay() {
    resultDisplay.innerText = currentInput || '0';
    historyDisplay.innerText = `${previousInput} ${operator || ''}`;
}
