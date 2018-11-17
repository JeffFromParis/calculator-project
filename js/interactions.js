/*
This sheet contains all the mathematical operators that
will be inluded to the calculator
*/

//Selecting the html element where the result will be displayed
const display = document.getElementById("screen");
display.readOnly = true; //the user cannot edit that field

//Errors related variables:
let memory=''; //in case an error is triggered, the formula is kept in memory
let flagOnError=0; //used to avoid the user to edit the error message

/**
 * Add an element to the formula and display it
 * @param {character} input limited to operators, brackets or operators
 */
function newInput(input){
    
    if(flagOnError) return; //input is disabled when an error is triggered

    //in case this is first element added it i necessary to replace the initial 0
    if(display.value=='0'){
        if(input=='0'||input=='00') return;
        display.value=input;
    }else{
        display.value=display.value+input;
    }
}

/**
 * removes the last input
 */
function removeSingleInput(){
    if(flagOnError) return; //removing is disabled when an error is triggered
    if(display.value.length!=1){
        display.value = display.value.slice(0, -1);
    }else{
        display.value = '0';
    }
}

/**
 * removes everything
 */
function removeAllInput(){
    if(flagOnError) flagOnError=0;
    display.value = '0';
}

function evaluateFormula(){
    
    //error acknowledgment
    if(flagOnError==1){
        flagOnError=0;
        display.value=memory;
        return;
    }

    let displayArray=display.value.split('');
    if(!controlsOk(displayArray)) return;

    compute(display.value);
}

/*******************************************************
 * Activating the keypad
 ******************************************************/
window.addEventListener('keydown',keypadActivated);
function keypadActivated(e){
    key=e.key;
    const inputs =['0','1','2','3','4','5','6','7','8','9','(',')','+','-','*','/','.'];    //checking if the key is one of the expected inputs
    if(inputs.indexOf(key)!=-1) newInput(key);
    if(key=='C' || key=='c' || key=='Backspace') removeSingleInput();
    if(key=='Enter') evaluateFormula();
}



function compute(str){

    //getting an array where the brackets have been isolated
    //meaning that if we detect an opening bracket followed by a closing one (no double opening)
    //then we can compute the expression
    bracketsIsolatedArray=isolateBrackets(str);

    if(bracketsIsolatedArray.length==1){
        display.value=multipleOperation(str);
        return;
    }

    let lastOpeningBracketIndex=0;
    for(var i=0;i<bracketsIsolatedArray.length;i++){
        if(bracketsIsolatedArray[i]=='(') lastOpeningBracketIndex=i;
        if(bracketsIsolatedArray[i]==')'){
            bracketsIsolatedArray.splice(lastOpeningBracketIndex,3,multipleOperation(bracketsIsolatedArray[i-1]));
            i=0;
        }
    }

    //console.log('End of the brackets loop, result is :'+bracketsIsolatedArray);
    display.value=multipleOperation(bracketsIsolatedArray.join(''));
}



function isolateOperators(formula){
    let result=[];
    let numberStartingIndex=0;
    for (var i=1;i<formula.length;i++){
        if(operators.indexOf(formula[i])!=-1){
            result.push(formula.slice(numberStartingIndex,i));
            result.push(formula[i]);
            numberStartingIndex=i+1;
        }
        if(i==formula.length-1) result.push(formula.slice(numberStartingIndex));
    }
    return result;
}

function isolateBrackets(formula){
    let result=[];
    let numberStartingIndex=0;
    let inbetween='';
    for (var i=0;i<formula.length;i++){
        if(brackets.indexOf(formula[i])!=-1){
            if(i!=0 || formula[i-1]=='(' || formula[i-1]==')') {
                inBetween=formula.slice(numberStartingIndex,i);
                if(inBetween!=''){
                    result.push(formula.slice(numberStartingIndex,i));
                }
            }
            result.push(formula[i]);
            numberStartingIndex=i+1;
        }

        if(i==formula.length-1 && formula[i]!=')') result.push(formula.slice(numberStartingIndex));
    }
    // console.log('result after isolating the brackets : '+result);
    return result;
}