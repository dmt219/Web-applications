var operation=0;
var calculated=false;
var firstNum="";
var secondNum="";
var stack=[];
var number="";


function resetDisplay(){
    var display = document.getElementById("display");
    firstNum="";
    secondNum="";
    number="";
    stack=[];
    operation=operations.none;
    calculated=true;
    display.value="";
}


function stackAdd(num){
    var display = document.getElementById("display");
    display.value+=num;
    number=num;
}



function push() {
    var display = document.getElementById("display");
    stack.push(number);
    display.value="";
    
  
}


operations = {
    none:function(x,y) { return y; },
    add: function(x,y) { return y+x; },
    minus: function(x, y) { return y-x; },
    multiply: function(x,y) { return x*y; },
    divide: function(x,y){return y/x;}
}; 

function setOperation(foo){
    var display = document.getElementById("display");
    if (operations.hasOwnProperty(foo))
        operation = operations[foo];
    firstNum = stack.pop();
    secondNum=stack.pop();
    display.value=operation(+firstNum,+secondNum);

    calculated=true;
    operation=operations.none;
    
    
}

function Decimal(){
    var display = document.getElementById("display");
    for(var i=0;i<display.value.length;i++){
        if(display.value.charAt(i)=='.'){
            return;
        }
        
    }
    display.value+='.';
    
        
}



if ('addEventListener' in window)
    window.addEventListener('load', resetDisplay);
else
    window.attachEvent('onload', resetDisplay);


    
    
  


