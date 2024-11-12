/*-------------------------------- Variables --------------------------------*/
let currentInput = ''; // Stores the current input as the user types
let previousInput = ''; // Stores the previous input for operations
let operator = ''; // Stores the current operator (+, -, *, /)

/*------------------------ Cached Element References ------------------------*/
const displayElement = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

// Check if all critical elements are found before adding event listeners
if (!displayElement) {
    console.error('Display element not found. Check if the HTML has an element with id="display".');
} else if (numberButtons.length === 0) {
    console.error('Number buttons not found. Check if the HTML has buttons with class="number".');
} else if (operatorButtons.length === 0) {
    console.error('Operator buttons not found. Check if the HTML has buttons with class="operator".');
} else if (!equalsButton) {
    console.error('Equals button not found. Check if the HTML has a button with id="equals".');
} else if (!clearButton) {
    console.error('Clear button not found. Check if the HTML has a button with id="clear".');
} else {
    /*----------------------------- Event Listeners -----------------------------*/
    numberButtons.forEach(button => {
        button.addEventListener('click', handleNumberClick);
    });
    operatorButtons.forEach(button => {
        button.addEventListener('click', handleOperatorClick);
    });
    equalsButton.addEventListener('click', calculateResult);
    clearButton.addEventListener('click', clearCalculator);
}

/*-------------------------------- Functions --------------------------------*/
function handleNumberClick(event) {
    console.log('Number clicked:', event.target.textContent); // Debug log
    currentInput += event.target.textContent; // Append the clicked number to the current input
    updateDisplay();
}

function handleOperatorClick(event) {
    console.log('Operator clicked:', event.target.textContent); // Debug log
    if (currentInput === '') return; // Prevent setting an operator without a number
    if (previousInput !== '') calculateResult(); // If there is a previous input, calculate first
    operator = event.target.textContent; // Set the chosen operator
    previousInput = currentInput;
    currentInput = ''; // Reset current input for the next number
}

function calculateResult() {
    console.log('Calculating result...'); // Debug log
    if (previousInput === '' || currentInput === '') return; // Return if there isn't enough input to calculate
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Error'; // Handle division by zero
            break;
        default:
            console.error('Unknown operator:', operator); // Debug log for an unknown operator
            return;
    }
    currentInput = result.toString();
    previousInput = '';
    operator = '';
    updateDisplay();
    afterFunction();
}

function clearCalculator() {
    console.log('Clearing calculator...'); // Debug log
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}
function afterFunction() {
    console.log('Clearing calculator...'); // Debug log
    currentInput = '';
    previousInput = '';
    operator = '';
}

function updateDisplay() {
    if (!displayElement) {
        console.error('Display element is missing. Check your HTML structure.');
        return;
    }
    console.log('Updating display:', currentInput); // Debug log
    displayElement.textContent = currentInput || '0'; // Show '0' if the current input is empty
}

