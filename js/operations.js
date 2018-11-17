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
const subtract = function (num1,num2){ return num1-num2;}

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
    if(operation=="subtract") return subtract(num1,num2);
    if(operation=="multiply") return multiply(num1,num2);
    if(operation=="divide") return divide(num1,num2);

    return ('Error - operation unknown');
}

/**
 * There cannot be brackets at this points
 * @param {string} str 
 */
function multipleOperation(str){ 

    //separate numbers and operators
    let workingArray=isolateOperators(str);

    //in case there are no operators we can return the string
    if(workingArray.length==0) return str;

    //Now the array is ready, numbers and operators have been separated
    //we start to evaluate the * and /
    let operator='';
    for(var i=1;i<workingArray.length-1;i++){
        if(workingArray[i]=='*'||workingArray[i]=='/'){
            (workingArray[i]=='*')? operator='multiply':operator="divide";
            workingArray.splice(i-1,3,operate(operator,workingArray[i-1],workingArray[i+1]));
            i-=1;
        }
    }

    console.log('after multiply and divide, result is ' + workingArray);

    for(var i=0;i<workingArray.length-1;i++){
        if(workingArray[i]=='+'||workingArray[i]=='-'){
            // console.log('sign '+ workingArray[i] +' spotted on index '+ i);
            (workingArray[i]=='+')? operator='add':operator="subtract";
            workingArray.splice(i-1,3,operate(operator,eval(workingArray[i-1]),eval(workingArray[i+1])));
            i-=1;
        }
    }

    // console.log('result is ' + workingArray);
    return workingArray;
}