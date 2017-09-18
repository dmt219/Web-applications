var suggest = document.getElementById("suggestion");
var live = document.getElementById('live');

var lives =7;
var score =0;
var count=0;

var words =['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var batman =['B','A','T','M','A','N'];
    
function loadGrid(words){
    var root = $("#grid");
    root.empty();
    for(var i = 0; i < words.length; i++) {
        var btn = document.createElement("BUTTON");
        btn.innerHTML=words[i];  
        $(btn).addClass("key");
        grid.appendChild(btn);
    }
}    
    
function attachEventHandlers() {
    $("#suggestion").click(function () {
        var element=document.getElementById('hint');
        element.style.visibility='visible';
    });
    
    $(".key").click(function(){   
        if($(this).html()=="T"){
            document.getElementById('T_1').innerHTML ="T";
            document.getElementById('T_2').innerHTML ="T";
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            score++;
            checkScore();
        }
        else if($(this).html()=="O"){
            document.getElementById('O_1').innerHTML ="O";
            document.getElementById('O_2').innerHTML ="O";
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            score++;
            checkScore();
        }
        else if($(this).html()=="S"){
            document.getElementById('S').innerHTML='S';
            score++;
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            checkScore();
        }
        else if($(this).html()=="R"){
            document.getElementById('R').innerHTML='R';
            score++;
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            checkScore();
        }
        else if($(this).html()=="Y"){
            document.getElementById('Y_1').innerHTML='Y';
            document.getElementById('Y_2').innerHTML='Y';
            score++;
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            checkScore();
        }
        else{
            $(this).attr('disabled', true);
            lives--;
            giveLives(lives);
        }
        
        
    });
}


function giveLives(lives){
    live.innerHTML= lives.toString() + ' lives remaining';
    if(lives==6)
        $('#hang').attr("src","img1.png");
    else if(lives==5)
        $('#hang').attr("src","img2.png");
    else if(lives==4)
        $('#hang').attr("src","img3.png");
    else if(lives==3)
        $('#hang').attr("src","img4.png");
    else if(lives==2)
        $('#hang').attr("src","img5.png");
    else if(lives==1)
        $('#hang').attr("src","img6.png")
    else{
        $('#hang').attr("src","img7.png");
        $('#grid').empty();
        $('#word').empty();
        live.innerHTML='GAME OVER';
    }
}

function loadNewWord(word){
    document.getElementById('hint').innerHTML = 'The Caped Crusader';
    var root = $("#word");
    for(var i = 0; i < batman.length; i++) {
        var btn = document.createElement("BUTTON");
        btn.innerHTML='_';  
        if(i==0)
            $(btn).attr("id", "B");
        else if(i==1)
            $(btn).attr("id", "A_1");
        else if(i==2)
            $(btn).attr("id", "T");
        else if(i==3)
            $(btn).attr("id", "M");
        else if(i==4)
            $(btn).attr("id", "A_2");
        else{
            $(btn).attr("id", "N");
        }
        document.getElementById('word').appendChild(btn);
    }
}

function checkNewWord(){
    $(".key").click(function(){   
        if($(this).html()=="B"){
            document.getElementById('B').innerHTML ="B";
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            score++;
            checkScore();
        }
        else if($(this).html()=="A"){
            document.getElementById('A_1').innerHTML ="A";
            document.getElementById('A_2').innerHTML ="A";
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            score++;
            checkScore();
        }
        else if($(this).html()=="T"){
            document.getElementById('T').innerHTML='T';
            score++;
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            checkScore();
        }
        else if($(this).html()=="M"){
            document.getElementById('M').innerHTML='M';
            score++;
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            checkScore();
        }
        else if($(this).html()=="N"){
            document.getElementById('N').innerHTML='N';
            score++;
            $(this).removeClass("key");
            $(this).attr('disabled', true);
            checkScore();
        }
        else{
            $(this).attr('disabled', true);
            lives--;
            giveLives(lives);
        }
        
        
    });
}

function checkScore(){
    if(score==5){
        count++;
        $('#grid').empty();
        live.innerHTML='GOOD JOB!';
        if(count==1){
        lives =7;
        score=0;
        var btn = document.createElement("BUTTON");
        btn.innerHTML="Round 2?"; 
        grid.appendChild(btn);
        $(btn).click(function(){
            live.innerHTML='';
            $('#hang').attr("src","img0.png");
            $('#word').empty();
            loadGrid(words);
            loadNewWord(batman);
            checkNewWord();
        })
    }
        else if( count==2){
        $('#grid').empty();
        $('#hangman').empty();
        live.innerHTML='VICTORY';
        }
     
       
    }
}


$(document).ready(function(){ 
    loadGrid(words);
    attachEventHandlers();
});
