/*******************************************************
 * controls
 ******************************************************/
const operators = ['+','-','*','/'];
const restrictedOperators = ['*','/'];
const numbers = ['1','2','3','4','5','6','7','8','9','0'];
const allButBrackets=numbers+operators;
const brackets=['(',')'];


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

        if(!arePointsOk(arr)){
        memory=display.value;
        flagOnError=1;
        display.value="CHECK THE POINTS";
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

/*******************************************************
 * Checking if the '.' are surrounded by numbers
 ******************************************************/
function arePointsOk(arr){

    // console.log('[arePointsOk] - array to control is '+arr)
    //first element cannot be a restricted Operator
    if(arr[0]=='.') {
        console.log('First character cannot be ' + arr[0]);
        return 0;
    }

    //first element cannot be a restricted Operator
    if(arr[arr.length-1]=='.') {
        console.log('Last character cannot be ' + arr[arr.length-1]);
        return 0;
    }

    for (var i=1;i<arr.length-1;i++){
        //impossible to have two signs next to each other
        if(arr[i]==='.' && (numbers.indexOf(arr[i-1])==-1 || numbers.indexOf(arr[i+1])==-1)){
            console.log('Points must be surrounded by numbers');
            return 0;
        }
    }
    return 1;
}