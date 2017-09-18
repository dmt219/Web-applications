//Duc Tran
//dmt219
//Hw5- Magnetic Poetry-js
$(function(){
var add = document.getElementById('add');
var addtext = document.getElementById('addtext');
var words = document.getElementById('words');
var bin = document.getElementById('bin');
var savedWords=[];
var str;
var str2;
var targ;


var Word = function(text,left,top){
    this.text=text;
    this.left=left;
    this.top=top;    
};

$( document ).ready(function() {
    if(localStorage.wordlist!=null){
        $("#words").children().each(function(){
            words.removeChild(this);
        });
    var str2 = localStorage.wordlist;
    var obj = JSON.parse(str2);
    for(var j=0;j<obj.length;j++){
    var btn = document.createElement('button');
    btn.type = 'button';
    var text = obj[j].text;
    btn.style.position='absolute';
    btn.style.left=obj[j].left+'px';
    btn.style.top= obj[j].top+'px';
    btn.appendChild(document.createTextNode(text));
    words.appendChild(btn);
    }
    }
});

   
add.addEventListener('click',function(){
    if(addtext.value){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.style.position='absolute';
        var text = addtext.value;
        addtext.value='';
        btn.appendChild(document.createTextNode(text));
        words.appendChild(btn);
        
    }
},false);

document.addEventListener('mousedown',function(){
   var foo = (event.target);
   if($(foo).is("button")){
       if(foo.parentNode==words){
       targ = (event.target);
       targ.type='button';
       offsetX = event.clientX-$(targ).position().left;
       offsetY = event.clientY-$(targ).position().top;  
   }
   }
},false);
document.addEventListener('mousemove',function(){
   if(targ!=null){
   if($(targ).is("button")){
           targ.style.position='absolute';
           targ.style.left = (event.clientX -offsetX) + 'px';
           targ.style.top= (event.clientY -offsetY) + 'px';
   }
   }
},false);
document.addEventListener('mouseup',function(){
    if(targ!=null){
    if ($(bin).position().top < $(targ).position().top && ($(bin).position().left+15) < $(targ).position().left &&($(bin).position().top +20) > $(targ).position().top&&($(bin).position().left+35) > $(targ).position().left) {
         words.removeChild(targ);
    } 
    offsetX=0;
    offsetY=0;
    targ=null;
}
    },false);
    
$(window).on("unload", function () { saveWords(); });
function saveWords(){
    var root = $("#words")
    root.children().each(function(){
          var wd = new Word(this.firstChild.nodeValue,$(this).position().left,$(this).position().top); 
          savedWords.push(wd);
       
    });
    str = JSON.stringify(savedWords);
    localStorage.wordlist = str;
}

});
