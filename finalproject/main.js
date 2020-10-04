var player;
var playerImg;
var numGroundSprites;
var groundSprites;
var google;
var googleImg;
var twitter;
var twitterImg;
var yahoo;
var yahooImg;
var games;
var gamesImg;
var facebook;
var facebookImg;
var recent_trends;
var recent_trends_img;
var github;
var githubImg;
var backgrounds;
var backgroundImg;
var trophies;
var trophyImg;
var totalTrophies;
var totalTimes;
var trophyAmount;
var TooMuchTime;
var custom;
var customImg;
var customInput="www.google.com";

function preload(){
    customImg=loadImage("http://i.imgur.com/drK59Nx.gif");
    trophyImg=loadImage("http://i.imgur.com/ZrExC4G.png");
    backgroundImg=loadImage("http://i.imgur.com/Ai57mGP.png");
    playerImg=loadImage("http://i.imgur.com/J2uBjan.png");
    googleImg=loadImage("http://i.imgur.com/vOCBPSJ.png");
    twitterImg=loadImage("http://i.imgur.com/U3XL4Wa.png");
    yahooImg=loadImage("http://i.imgur.com/2qdDpNi.png");
    gamesImg=loadImage("http://i.imgur.com/0pUs355.png");
    facebookImg=loadImage("http://i.imgur.com/PyXrVo6.jpg");
    recent_trends_img=loadImage("http://i.imgur.com/y2ui2FM.png");
    githubImg=loadImage("http://i.imgur.com/4SZsB6X.png");
}
function setup(){
    createCanvas(window.innerWidth-50,window.innerHeight-50);
    customInput=prompt("What link do you want to have for your custom shortcut");
    if (customInput===null){
        customInput="www.google.com";
    }
    TooMuchTime=false;
    trophyAmount=0;
    totalTrophies=0;
    totalTimes=1;
    var x_list=[width/4,width/4,3*width/4,3*width/4,width/2,width/8,7*width/8,width/2];
    var y_list=[height/4,3*height/4,height/4,3*height/4,height/8,height/2,height/2,height/2];
    backgrounds= new Group();
    trophies= new Group();
    numGroundSprites=width/50;
    groundSprites= new Group();
    for (var n = 0; n < numGroundSprites;n++){
        var groundSprite=createSprite(n*50 + 25,height-25,50,50);
        groundSprites.add(groundSprite);
    }
    for (var i=0; i<8;i++){
        var background=createSprite(x_list[i],y_list[i],100,100);
        background.addImage(backgroundImg);
        backgrounds.add(background);
    }
    google=createSprite(width/4,height/4,100,50);
    google.addImage(googleImg);
    yahoo=createSprite(width/4,3*height/4,100,50);
    yahoo.addImage(yahooImg);
    twitter=createSprite(3*width/4,height/4,100,50);
    twitter.addImage(twitterImg);
    games=createSprite(3*width/4,3*height/4,100,50);
    games.addImage(gamesImg);
    facebook=createSprite(width/2,height/8,100,50);
    facebook.addImage(facebookImg);
    recent_trends=createSprite(width/8,height/2,100,50);
    recent_trends.addImage(recent_trends_img);
    github=createSprite(7*width/8,height/2,100,50);
    github.addImage(githubImg);
    custom=createSprite(width/2,height/2,50,50);
    custom.addImage(customImg);
    for (var z=0;z<17;z++){
        var newTrophy=createSprite(floor(random(10,window.innerWidth-60)),floor(random(30,window.innerHeight-105)),10,30);
        for (var i=0; i<7;i++){
            if((newTrophy.position.x>x_list[i]-100&&newTrophy.position.x<x_list[i]+100)&&(newTrophy.position.y>y_list[i]-50&&newTrophy.position.y<y_list[i]+50)){
                newTrophy.remove();
                trophyAmount-=1;
            }
            
        }
        trophyAmount+=1
        newTrophy.addImage(trophyImg);
        trophies.add(newTrophy);
    }
    player=createSprite(width/2,height-75,50,50);
    player.addImage(playerImg);
}
function draw(){
    background(10);
    if(groundSprites.overlap(player)){
        player.position.y = (height-50) - (player.height/2);
    }
    if(keyDown(RIGHT_ARROW)&&player.position.x<width-10){
            player.position.x=player.position.x + 5;
    }
    if(keyDown(LEFT_ARROW)&&player.position.x>25){
        player.position.x=player.position.x - 5;
    }
    if(keyDown(UP_ARROW)&&player.position.y>25){
        player.position.y-=5;
    }
    if(keyDown(DOWN_ARROW)&&player.position.y<height-75){
        player.position.y+=5;
    }
    if(camera.position.x<window.innerWidth-(camera.width+50)){
        camera.position.x=player.position.x;
    }else if(camera.position.x>camera.width){
        camera.position.x=player.position.x;
    }else{
        camera.position.x=camera.position.x;
    }
    if(google.overlap(player)){
        window.open("https://www.google.com");
        player.position.x=width/2;
        player.position.y=height-75;
    }
    if(twitter.overlap(player)){
        window.open("https://www.twitter.com");
        player.position.x=width/2;
        player.position.y=height-75;
    }
    if(yahoo.overlap(player)){
        window.open("https://www.yahoo.com");
        player.position.x=width/2;
        player.position.y=height-75;
    }
    if (games.overlap(player)){
        window.open("https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=free%20online%20games");
        player.position.x=width/2;
        player.position.y=height-75;
    }
    if (facebook.overlap(player)){
        window.open("https://www.facebook.com");
        player.position.x=width/2;
        player.position.y=height-75;
    }
    if (recent_trends.overlap(player)){
        window.open("https://www.google.com/#q=politics");
        player.position.x=width/2;
        player.position.y=height-75;
    }
    if (github.overlap(player)){
        window.open("https://www.github.com");
        player.position.x=width/2;
        player.position.y=height-75;
    }
    if (custom.overlap(player)){
        window.open("https://"+customInput);
        player.position.x=width/2;
        player.position.y=height-75;
    }
    trophies.overlap(player,delete_trophies);
    drawSprites();
}
function delete_trophies(point){
    point.remove();
    totalTrophies+=1;
    var x_list=[width/4,width/4,3*width/4,3*width/4,width/2,width/8,7*width/8];
    var y_list=[height/4,3*height/4,height/4,3*height/4,height/8,height/2,height/2];
    if (totalTrophies===trophyAmount&&!TooMuchTime){
        totalTimes+=1;
        if(totalTimes===6){
            alert("Achievement unlocked: Too Much Time !!!");
            TooMuchTime=true;
        }
        if(!TooMuchTime){
            for (var z=0;z<trophyAmount-((totalTimes-1)*trophyAmount/totalTimes);z++){
                var newTrophy=createSprite(floor(random(10,window.innerWidth-60)),floor(random(30,window.innerHeight-105)),10,30);
                for (var i=0; i<7;i++){
                    if((newTrophy.position.x>x_list[i]-100&&newTrophy.position.x<x_list[i]+100)&&(newTrophy.position.y>y_list[i]-50&&newTrophy.position.y<y_list[i]+50)){
                        newTrophy.remove();
                        trophyAmount-=1;
                    }
                    
                }
                trophyAmount+=1
                newTrophy.addImage(trophyImg);
                trophies.add(newTrophy);
            }
        }
    }
}