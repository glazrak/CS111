var config = {
            apiKey: "AIzaSyDr3ZHg7NDzH00l-fm9RROfP0rRi-Jd9CE",
            authDomain: "collab-sketch-a79b0.firebaseapp.com",
            databaseURL: "https://collab-sketch-a79b0.firebaseio.com",
            storageBucket: "",
          };
          firebase.initializeApp(config);

var pointsData=firebase.database().ref();
var points=[];
var r_g_b;
document.ontouchmove = function(e){ e.preventDefault(); };
function setup(){
    var canvas=createCanvas(window.innerWidth-50,window.innerHeight-250);
    background(255);
    r_g_b=(0,0,0);
    fill(r_g_b);
    pointsData.on("child_added",function(point){
        points.push(point.val());
    });
    canvas.mousePressed(drawPoint);
    canvas.mouseMoved(function(){
        if (mouseIsPressed){
            drawPoint();
        }
        return false
    })
    canvas.touchMoved(function(){
        if (touchIsDown){
            drawPoint();
        }
        return false
    })
}
function draw(){
    background(255);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        fill(point.rgb);
        stroke(point.rgb);
        ellipse(point.x, point.y, 5, 5);
    }
}

function drawPoint() {
  pointsData.push({x: mouseX, y: mouseY, rgb: r_g_b});
}
function saveDrawing(){
    saveCanvas();
}
$("#saveDrawing").on("click", saveDrawing);

function clearDrawing(){
    pointsData.remove();
    points = [];
}
$("#clearDrawing").on("click", clearDrawing);

pointsData.on('child_removed', function () {
    points = [];
})
if(self.webView){
    self.webView.scrollView.bounces = NO;
}