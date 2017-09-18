var grid = document.getElementById('#grid');
var myid=0;
var letters=[];
function attachEventHandlers() {
    $("#login").click(function () {
        login($("#username").val());
        $("#username").val("");

    });
    $("#submit").click(function () {
        submitWord();
    });
}



function loadGrid(words){
    var root = $(".cell");
    root.each(function(){
        var cell =this;
    for(var i = 0; i < words.length; i++) {
        for(var j=0;j<words[i].letters.length;j++){
            if((((words[i].letters[j]).r) === cell.parentNode.rowIndex.toString())&& (((words[i].letters[j]).c) === cell.cellIndex.toString())) {
            $(cell).css('backgroundColor', 'red');
            $(cell).addClass("registered");
        }
    }
}
    });
}


function loadStatus(players) {
    var usergrid = "";
    for (var i = 0; i < players.length; ++i) {
        var player = players[i];
        var row = "<tr style='background-color:" + (player.winner ? "gold" : "white") + "'>" +
                "<td>" + player.name + "</td>" +
                "<td>" + player.score + "</td>" +
                "</tr>";
        usergrid += row;
    }
    $("#userlist tbody").html(usergrid);
}

var HOST = "cse264.info:3000";
var SERVER = "http://" + HOST + "/";

function doAjaxCall(method, cmd, params, fcn) {
    $.ajax(
            SERVER + cmd,
            {
                type: method,
                processData: true,
                data: params,
                dataType: "json",
                success: function (result) {
                    fcn(result)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error: " + jqXHR.responseText);
                    alert("Error: " + textStatus);
                    alert("Error: " + errorThrown);
                }
            }
    );
}


function login(username) {
    doAjaxCall("GET", "wordsearch/login", {username: username},
    function (result) {
        myid=result.id;
        $("#lname").html(username);
        if(result.success){
            getPuzzle();
        }
    });
}

var iterate =0;

function getPuzzle(){
    doAjaxCall("GET","wordsearch/puzzle",{id:myid},
    function(result){
        $("#category").html(result.theme);
        for(i=0;i<result.nrows;i++){
            var newRow =$("<tr></tr>");
            for(j=0;j<result.ncols;j++){
                var content = (result.grid)[iterate];
                iterate++;
                var newCell=$("<td></td>");
                newCell.attr("class","cell");
                $(newCell).html(content);
                $(newRow).append(newCell);
            }
            $("#grid").append(newRow);
        }
    });
}

function submitWord(){
    var data = {id:myid,letters:letters};
    doAjaxCall("GET","wordsearch/submit",data,
    function(result){
    var root = $(".cell");
    root.each(function(){
        var cell =this;
        for(var i = 0; i < letters.length; i++) {
            if(letters[i].r === cell.parentNode.rowIndex&& letters[i].c === cell.cellIndex) {
                if($(cell).hasClass("registered")){
                $(cell).css('backgroundColor', 'red');
                }
                else{
                $(cell).css('backgroundColor', 'white');
                $(cell).removeClass("selected");
                }
            }
        }
        });
        letters=[];
    });
    
}

$('#grid').on('click', 'td', function() {
    if ($(this).hasClass("selected")){
        $(this).removeClass("selected");
        if($(this).hasClass("registered")){
            $(this).css('backgroundColor','red');
        }
        else{
            $(this).css('backgroundColor','white');
        }
        for(var i = 0; i < letters.length; i++) {
            if(letters[i].r === this.parentNode.rowIndex && (letters[i].c === this.cellIndex)) {
            letters.splice(i, 1);
            break;
            }
        }
    }
    else{
        $(this).addClass("selected");
        $(this).css('backgroundColor', 'rgb(255,255,0)');
        letters.push({"r": this.parentNode.rowIndex, "c": this.cellIndex});
    }
    
});

$(document).ready(function(){
    attachEventHandlers();
    var socket = io.connect(HOST);
    
    socket.on('gridupdates', function (result) {
        loadGrid(result.words);
    });
    
    // Update the leader board when an updated player list arrives from the server
    socket.on('players', function (players) {
        loadStatus(players);
    });
});
