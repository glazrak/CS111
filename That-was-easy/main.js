function sayThatWasEasy() {
  var thatWasEasy = new Audio("that_was_easy.mp3");
  thatWasEasy.play();
}
function oops() {
  var uhoh = new Audio("uhoh.mp3");
  uhoh.play();
}

$("#easy").on("click", sayThatWasEasy);

$(document).keypress(delegateKeypress);
var delay=1000;
function delegateKeypress(event){
    if (event.charCode===32){
        $("#easy").trigger("click")
    }
    else{
        oops();
        setTimeout(function(){
            window.close();
        }, delay);
    }
}