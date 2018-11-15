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
    
    console.log('computing the result');
    
    //error acknowledgment
    if(flagOnError==1){
        console.log('Displaying the problematic formula');
        flagOnError=0;
        display.value=memory;
        return;
    }

    let displayArray=display.value.split('');
    if(!controlsOk(displayArray)) return;
   
    compute(displayArray);
}

/*******************************************************
 * Activating the keypad
 ******************************************************/
window.addEventListener('keydown',keypadActivated);
function keypadActivated(e){
    key=e.key;
    const inputs =['0','1','2','3','4','5','6','7','8','9','(',')','+','-','*','/'];    //checking if the key is one of the expected inputs
    if(inputs.indexOf(key)!=-1) newInput(key);
    if(key=='C' || key=='c') removeInput();
    if(key=='Enter') evaluate();
}

/*******************************************************
 * controls
 ******************************************************/
function controlsOk(arr){
    
    //checking if there is no problem with the brackets(same number of "(" and ")")
    if(!areBracketsOk(arr)){
        memory=display.value;
        flagOnError=1;
        display.value="CHECK THE ()";
        return 0;
    }

    if(!areOperatorsOk(arr)){
        memory=display.value;
        flagOnError=1;
        display.value="CHECK THE OPERATORS";
        return 0;
    }

    return 1;
}
/*******************************************************
 * Checking if everything is ok with the brackets:
 * -correct number
 * everything that is open must be closed
 ******************************************************/
function areBracketsOk(arr){
    let nOpen=0;
    let nClose=0;
    const numbers = ['1','2','3','4','5','6','7','8','9','0'];

    for (var i=0;i<arr.length;i++){
        if (arr[i]=='(') nOpen+=1;

        if (arr[i]==')') nClose+=1;

        if (nClose>nOpen){
            console.log('Opening bracket is missing');
            return 0;
        }
        if(i>0 && arr[i-1]=='(' && arr[i]==')'){
            console.log('Empty brackets detected');
            return 0;
        }

        if(i>0 &&(arr[i-1])==')' && (numbers.indexOf(arr[i]))!=-1){
            console.log('impossible to have a number after a closing bracket');
            return 0;
        }

        if(i>0 &&(arr[i])=='(' && (numbers.indexOf(arr[i-1]))!=-1){
            console.log('impossible to have a number before an opening bracket');
            return 0;
        }
    }
    return (nOpen==nClose)?1:0;
}

/*******************************************************
 * Checking if everything is ok with the operators:
 * -formula cannot start or end with operators * or /
 * -TODO
 ******************************************************/
function areOperatorsOk(arr){
    const operators = ['+','-','*','/'];
    const restrictedOperators = ['*','/'];

    //first element cannot be a restricted Operator
    if(restrictedOperators.indexOf(arr[0])!=-1) {
        console.log('First character cannot be ' + arr[0]);
        return 0;
    }
    //last element cannot be an operator
    if(operators.indexOf(arr[arr.length-1])!=-1){
        console.log('First character cannot be ' + arr[0]);
        return 0;
    }

    for (var i=1;i<arr.length;i++){
        //impossible to have two signs next to each other
        if((operators.indexOf(arr[i]))!=-1 && (operators.indexOf(arr[i-1]))!=-1){
            console.log('Two operators cannot be next to each other');
            return 0;
        }
        //impossible to have a closing bracket just after an operator
        if((arr[i])==')' && (operators.indexOf(arr[i-1]))!=-1){
            console.log('impossible to have a closing bracket just after an operator');
            return 0;
        }
    }
    return 1;
}

function compute(arr){
    display.value='444444';
    //getting the number of successive brackets

    //le probleme arrive quand on a plusieurs paentheses successives...

    //ensuite il faut gérer les opérations multiples (a+b*c)
    multipleOperation();
}

function multipleOperation(str){
    //separate numbers and operators
    parseFloat()SecurityPolicyViolationEvent.join('')

    
}