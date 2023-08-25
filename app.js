let numberStack = [];
let operatorStack = [];
let updatedResult = 0;
let isNewEntry = true;


let operationMap = {
    "+" : function(a, b){return a + b},
    "-" : function(a, b){return a - b},
    "*" : function(a, b){return a * b},
    "/" : function(a, b){return a / b}
}

function onButtonClick(){
    let expressionDiv = document.getElementById("expression");
    let resultDiv = document.getElementById("result");
    let clickedValue = event.target.textContent;

    if(clickedValue == "Clear"){
        //On clear button...
        numberStack = [];
        operatorStack = [];
        updatedResult = 0;
        expressionDiv.textContent = 0;
        resultDiv.textContent = 0;
        isNewEntry = true;
        return;
    } else if(clickedValue == "Backspace"){
        //On Backspace button....
        let lastIndexValue = expressionDiv.textContent[expressionDiv.textContent.length -1];
        if(["+" , "-" , "*" , "/"].includes(lastIndexValue)) {
            operatorStack.pop();
            expressionDiv.textContent = expressionDiv.textContent.slice(0, -1)
            return;
        } else{
            let toBePopped = false;
            if(operatorStack.length > 0){ //If any operators used in the expression....
                let lastUsedOperatorIndex = expressionDiv.textContent.lastIndexOf(operatorStack[operatorStack.length-1]);
                let newNumberString = (expressionDiv.textContent.slice(lastUsedOperatorIndex+1)).slice(0, -1);
                if(!newNumberString) toBePopped = true;
                /* newNumberString ? */ numberStack[numberStack.length-1] = newNumberString;/*  : numberStack.pop(); */
                expressionDiv.textContent = expressionDiv.textContent.slice(0, -1) || 0;

            }else{ //No operators in the expression....
                let newNumberString = expressionDiv.textContent.slice(0, -1);
                expressionDiv.textContent = newNumberString || 0;
                if(!newNumberString) toBePopped = true;
                /* newNumberString ? ( */numberStack[0] = newNumberString/* ) : numberStack.pop() */;
            }
            let result = getResult();
            if(toBePopped) numberStack.pop();
            resultDiv.textContent = result;
            return;
        }
    } else if(["+" , "-" , "*" , "/"].includes(clickedValue)){
        //On operation click...
        if(numberStack.length === 0 || ["+" , "-" , "*" , "/"].includes(expressionDiv.textContent[expressionDiv.textContent.length-1])) {
            return;
        }
        onOperationClick(clickedValue);
        expressionDiv.textContent += clickedValue;
        return;
    } else{
        //On Number click...
        if(numberStack.length == 0 && clickedValue == 0) {
                
            return
        };

        onNumberClick(clickedValue);
        let result = getResult();
        if(expressionDiv.textContent == "0") {
            expressionDiv.textContent = clickedValue;
        }else{
            expressionDiv.textContent += clickedValue;
        }
        resultDiv.textContent = result;
    }
}

function onNumberClick(value) {
    if(isNewEntry) {
        numberStack.push(value);
        isNewEntry = false;
    } else{
        numberStack[numberStack.length - 1] = String(numberStack[numberStack.length - 1]) + value;
    }
}
function onOperationClick(operator) {
    isNewEntry = true;
    operatorStack.push(operator);
}
function getResult(){
    let result;
    if(numberStack.length == 1 || operatorStack.length == 0){
        // let expressionDiv = document.getElementById("expression");
        // return expressionDiv.textContent;
        return 0;
    }
    for(let i=1; i<numberStack.length; i++) {
        if(i==1) {
            result = operationMap[operatorStack[i -1]]( Number(numberStack[i-1]), Number(numberStack[i]));
        } else {
            result = operationMap[operatorStack[i -1]]( Number(result), Number(numberStack[i]));
        }
    }
    return result;
}