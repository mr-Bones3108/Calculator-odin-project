const buttons = document.querySelectorAll(".myBtn")
const display = document.getElementById("display")

let decimalAdded = false;

buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        const btnValue = button.value;
        
        if(btnValue === '='){
            const calc = new  Calculator;
            display.value = calc.calculate(display.value)
            return 
        }
        if(btnValue === 'del'){
            if (isNaN(display.value)) {
                display.value = '';
            } else {
                deleteFromStr();
            }
            return; // Make sure to return after handling the condition
        }
        if(btnValue === 'ac'){
            display.value = ''; 
            decimalAdded = false;
            return
        }
        if(btnValue === '.'){
            if (!decimalAdded) {
                display.value += btnValue;
                decimalAdded = true;
            }
        }
        else if (/[+\-*/%]/.test(btnValue)) {
            decimalAdded = false;
            display.value += btnValue;
        }
        else{
            display.value +=btnValue
        }
        
    })

})

function deleteFromStr() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1); // Remove the last character
        // console.log(display.value);
    }
}

function Calculator() {
    this.calculate = function (str) {
        // Split the input string using regular expressions
        let split = str.split(/(\+|\-|\*|\/|\%)/).filter(Boolean);

        // Initialize the result to the first number in the split array
        let result = parseFloat(split[0]);

        for (let i = 1; i < split.length; i += 2) {
            // Get the operator and the next number
            let operator = split[i];
            let nextNumber = parseFloat(split[i + 1]);

            if (isNaN(nextNumber)) {
                return ''; // Handle invalid input
            }

            // Perform the operation based on the operator
            switch (operator) {
                case '+':
                    result += nextNumber;
                    break;
                case '-':
                    result -= nextNumber;
                    break;
                case '*':
                    result *= nextNumber;
                    break;
                case '/':
                    if (nextNumber === 0) {
                        alert('Error: Division by zero is not allowed')
                        return NaN; // Handle division by zero
                    }
                    result /= nextNumber;
                    break;
                case '%':
                    result %= nextNumber;
                    break;
                default:
                    return NaN; // Handle invalid operator
            }
        }

        return roundToDecimalPlaces(result, 2);
    };
}

function roundToDecimalPlaces(number, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.ceil(number * multiplier) / multiplier;
  }



