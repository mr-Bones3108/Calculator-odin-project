const buttons = document.querySelectorAll(".myBtn")
const display = document.getElementById("display")


buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        const btnValue = button.value;
        if(btnValue === '='){
            const calc = new  Calculator;
            display.value = calc.calculate(display.value)
            return 
        }
        if(btnValue === 'del'){
            if (btnValue === 'del') {
                deleteFromStr();
                return; // Make sure to return after calling the function
            }
        }
        if(btnValue === 'ac'){
            display.value = ''; 
            return
        }
        display.value +=btnValue
    })

})

function deleteFromStr() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1); // Remove the last character
        console.log(display.value);
    }
}

function Calculator(){

    this.calculate=function(str){
        let split = str.split(/(\d+\.\d+|\+|\*|%|\^|\[|\])/).filter(Boolean);
        a=+split[0]
        op=split[1]
        b=+split[2]
        console.log(split)


        if(!this.method[op] || isNaN(a) || isNaN(b)){
            return NaN
        }
        return this.method[op](a,b);
    }

    this.method={
        "+":(a,b)=>roundToDecimalPlaces(a+b,2),
        "-":(a,b)=>roundToDecimalPlaces(a-b,2),
        "*":(a,b)=>roundToDecimalPlaces(a*b,2),
        "/":(a,b)=>roundToDecimalPlaces(a/b,2),
        "%":(a,b)=>roundToDecimalPlaces((a * b) / 100 ,2)
    }
}

function roundToDecimalPlaces(number, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.ceil(number * multiplier) / multiplier;
  }



