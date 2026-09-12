let display = document.getElementById('result');
let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

// إضافة رقم إلى الشاشة
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

// إضافة عملية حسابية
function appendOperator(op) {
    if (currentInput === '' && previousInput === '') {
        return;
    }

    if (operator !== null && currentInput !== '') {
        calculate();
    }

    previousInput = currentInput;
    operator = op;
    currentInput = '';
    shouldResetDisplay = true;
}

// حساب النتيجة
function calculate() {
    if (operator === null || currentInput === '' || previousInput === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('لا يمكن القسمة على صفر!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// مسح الشاشة
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// حذف آخر رقم
function deleteLast() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

// تحديث عرض الشاشة
function updateDisplay() {
    display.value = currentInput || '0';
}

// دعم لوحة المفاتيح
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === '.' || key === ',') {
        event.preventDefault();
        appendOperator('.');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key.toLowerCase() === 'c') {
        event.preventDefault();
        clearDisplay();
    }
});

// تحديث الشاشة عند بدء التطبيق
updateDisplay();