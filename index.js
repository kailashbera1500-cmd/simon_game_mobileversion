
var buttonColour = ["red", "blue", "green", "yellow"];
var seq=[];
var started=false;
var userClickedPattern=[];
var level=0;

function nextSequence(){

    var randomNumber=Math.floor(Math.random()*4);
    var randomColour=buttonColour[randomNumber];

    seq.push(randomColour);

    $("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomColour);

    level+=1;
    $("#level-title").html("Level "+level);
}

$(".btn").on("click",handler)
function handler(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===seq[currentLevel]){
        console.log("succes");
        if(userClickedPattern.length===seq.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern=[];
        }
    }
    else{
    userClickedPattern=[];
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
    $("#level-title").html("Game Over, Press Any where to Restart");
    
    setTimeout(function(){
        startOver();
    },1000);
    }

}

function startOver(){
    level=0;
    seq=[];
    started=false;

}



$(document).on("click",function(){
    if(!started){
        nextSequence();
        started=true;
    }
});

