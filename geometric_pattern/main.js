var NUM_CIRCLES=5;
var circleDiameter;
var circleRadius;
function setup(){
    createCanvas(480, 600);
    circleDiameter=width/NUM_CIRCLES;
    circleRadius=circleDiameter/2
}
function draw(){
    var y=height;
    var isShifted=false;
    var rVal=255;
    var gVal=0;
    var bVal=0;
    while (y>=0){
        var x=0;
        if (isShifted){
            x=x+circleRadius;
        }
        while (x<=width){
            fill(color(rVal,gVal,bVal));
            stroke(color(random(0,255),random(0,255),random(0,255)));
            ellipse(x,y,circleDiameter,circleDiameter);
            x=x+circleDiameter;
        }
        y=y-circleRadius;
        isShifted = !isShifted;
        rVal=rVal-random(10,24);
        gVal=gVal+random(10,24);
        bVal=bVal+random(10,24);
    }
}

function keyPressed(){
    if (keyCode===83){
        saveCanvas('geometric pattern', 'png')
    }
    return false
}