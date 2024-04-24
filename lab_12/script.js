window.onload = function() {

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null


// окно вывода результата
    outputElement = document.getElementById("result")

// окно вывода ввода пользователя
    inputElement = document.getElementById("mathexpression")

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

// устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            inputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                inputElement.innerHTML = a + ' ' + selectedOperation + ' ' + b
            }
        }
    }

/*// устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });*/

    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '') return
        selectedOperation = 'x'
        inputElement.innerHTML = a + ' ' + selectedOperation
    }
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '') return
        selectedOperation = '+'
        inputElement.innerHTML = a + ' ' + selectedOperation
    }
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '') return
        selectedOperation = '-'
        inputElement.innerHTML = a + ' ' + selectedOperation
    }
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '') return
        selectedOperation = '/'
        inputElement.innerHTML = a + ' ' + selectedOperation
    }
    document.getElementById("btn_op_percent").onclick = function () {
        if (a === '') return
        selectedOperation = '%'
        inputElement.innerHTML = a + ' ' + selectedOperation
    }
    document.getElementById("btn_op_sign").onclick = function () {
        if (a === '') return
        a = (-a).toString()
        inputElement.innerHTML = a
    }
    document.getElementById("btn_op_sqrt").onclick = function () {
        if (a === '') return
        a = (Math.sqrt(a)).toString()
        inputElement.innerHTML = a
    }
    document.getElementById("btn_op_dgr2").onclick = function () {
        if (a === '') return
        a = (a*a).toString()
        inputElement.innerHTML = a
    }
    document.getElementById("btn_op_del").onclick = function () {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            inputElement.innerHTML = a;
        } else {
            b = b.slice(0, -1);
            inputElement.innerHTML = a + ' ' + selectedOperation + ' ' + b;
        }
    }
    document.getElementById("btn_op_fact").onclick = function () {
        if (a === '') return
        const factorial = n => n ? n * factorial(n - 1) : 1;
        a = factorial(+a).toString(); // Вызываем функцию factorial() для числа a
        inputElement.innerHTML = a;
    }
    document.getElementById("btn_op_3zero").onclick = function () {
        if (a === '') return
        a = (a * 1000).toString()
        inputElement.innerHTML = a
    }

// кнопка очищения
    document.getElementById("btn_op_clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
        inputElement.innerHTML = ''
    }

// кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a) % (+b)
                break;
            case '+/-':
                expressionResult = (+a)
                break;
        }
        // З Знака после запятой без незначащих нулей
        expressionResult = parseFloat(expressionResult.toFixed(3))

        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
        inputElement.innerHTML = a
    }

    document.getElementById('themeResultButton').addEventListener(
        'click',
        function() {
            document.getElementById('result').classList.toggle('dark-theme');
        });

    document.getElementById('themeButton').addEventListener(
        'click',
        function() {
            document.body.classList.toggle('dark-theme');
        });
};

