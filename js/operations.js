/*
This sheet contains all the mathematical operators that
will be inluded to the calculator
*/

/*
ADDITION
*/
const add = function (num1,num2){ return num1+num2;}

/*
SUBTRACTION
*/
const sutract = function (num1,num2){ return num1-num2;}

/*
MULTIPLICATION
*/
const multiply = function (num1,num2){ return num1*num2;}

/*
DIVISION
*/
const divide = function (num1,num2){ return num1/num2;}

/*
OPERATE
*/
const operate = function(operation,num1,num2){
    
    if(operation=="add") return add(num1,num2);
    if(operation=="sutract") return sutract(num1,num2);
    if(operation=="multiply") return multiply(num1,num2);
    if(operation=="divide") return divide(num1,num2);

    return ('Error - operation unknown');
}