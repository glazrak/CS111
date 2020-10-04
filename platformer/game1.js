var GRAVITY = 0.3;
var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;
var player;
var player2;
var p1_in=true;
var p2_in=true;
var JUMP=-5;
var obstacleSprites;
var isGameOver;
var player1Lbl;
var player2Lbl;
var enemyImg;
var score;
var score2=0;
var difficulty=.98;
var bonusImg;
var level=1;
var bonuses;
var started=false;
var p1Lbl;
var fire_p1;
var fire_p2;
var fire;
var trump_shots;
var turdImg;
var shooters;
var powerups;
var Background;
var Background2;
var Background3;
var backgroundImg;
var background2Img;
var background3Img;


function preload(){
    backgroundImg=loadGif("background.gif");
    background2Img=loadGif("background2.gif");
    background3Img=loadGif("background3.gif");
    bonusImg=loadImage("//i.imgur.com/lSz4tzz.png");
    player1Lbl=loadImage("//i.imgur.com/ABi3WVa.gif");
    player2Lbl=loadImage("//i.imgur.com/vx9WPrt.jpg");
    enemyImg=loadImage("//i.imgur.com/DXk9fPO.png");
    fire=loadImage("//i.imgur.com/rwx0YvP.png");
    turdImg=loadImage("//i.imgur.com/mnwfIL9.gif");
    
}
function setup(){
    Background=createSprite(width/2,height/2,window.innerWidth-100,window.innerHeight-100)
    Background.addImage(backgroundImg);
    Background2=createSprite(width-200,height/2,window.innerWidth-100,window.innerHeight-100)
    Background2.addImage(background2Img);
    Background3=createSprite(200,height/2,window.innerWidth-100,window.innerHeight-100)
    Background3.addImage(background3Img);
    isGameOver=false;
    p1_in=true;
    p2_in=true;
    started=false;
    score=0;
    fire_p1=false;
    fire_p2=false;
    createCanvas(window.innerWidth-100,window.innerHeight-100);
    background(0);
    groundSprites= new Group();
    player=createSprite(width/2,height-75,50,50);
    p1Lbl=createSprite(player.width,player.height-42.5,50,50);
    p1Lbl.addImage(player1Lbl);
    player2=createSprite(width/2-50,height-75,50,50);
    p2Lbl=createSprite(player2.width,player2.height-39,50,50);
    p2Lbl.addImage(player2Lbl);
    numGroundSprites=width/GROUND_SPRITE_WIDTH +1;
    for (var n = 0; n < numGroundSprites;n++){
        var groundSprite = createSprite(n*50,height-25,GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
    obstacleSprites= new Group(); 
    bonuses= new Group();
    powerups= new Group();
    shooters= new Group();
    trump_shots= new Group();
    player.visibility=true;
    player2.visibility=true;
}
$("#start").on("click",new_game);
$(document).ready(playSong);
var numPlayers=parseInt(prompt("How many players?"));
if(numPlayers===2){
    alert("Faceoff!!!");
}
if(numPlayers===1){
    alert("Go for a high score!!!");
}
function draw(){
    if (numPlayers===1){
        player2.remove();
        if (isGameOver){
            background(0);
            fill(255);
            textAlign(CENTER);
            text("You're score was: " + score, camera.position.x, camera.position.y - 20);
            text("Game Over! Click anywhere or press space to restart",camera.position.x,camera.position.y+20);
        }
        if(started&&!isGameOver){
            Background.position.x=camera.position.x;
            Background.position.y=camera.position.y;
            Background2.position.x=camera.position.x+width/2-200;
            Background2.position.y=camera.position.y;
            Background3.position.x=camera.position.x-width/2+200;
            Background3.position.y=camera.position.y;
            background(0);
            if(random()>difficulty){
                var obstacle=createSprite(camera.position.x+width/2-15,random(0,height-65),30,30);
                obstacle.addImage(enemyImg);
                obstacleSprites.add(obstacle);
                if (random()>.75){
                    var randomnum=floor(random(0,obstacleSprites.length-1));
                    if(obstacleSprites[randomnum].position.x<camera.position.x+width/2){
                        var bullet_x=obstacleSprites[randomnum].position.x;
                        var bullet_y=obstacleSprites[randomnum].position.y;
                    }else{
                        randomnum=floor(random(0,obstacleSprites.length-1));
                        var bullet_x=obstacleSprites[randomnum].position.x;
                        var bullet_y=obstacleSprites[randomnum].position.y;
                }
                var bullet=createSprite(bullet_x,bullet_y,20,20);
                bullet.addImage(turdImg);
                bullet.velocity.x=-5;
                trump_shots.add(bullet);
                }
            }
            if(random()>.99){
                var jewel=createSprite(camera.position.x+width,random(0,height-65),10,10);
                jewel.addImage(bonusImg);
                bonuses.add(jewel);
            }
            if(random()>.995){
                var fireball=createSprite(camera.position.x+width,random(0,height-65),30,32);
                fireball.addImage(fire);
                powerups.add(fireball);
            }
            var firstJewel = bonuses[0];
            if (bonuses.length>0&&firstJewel.position.x<=camera.position.x-(width/2+firstJewel.width/2)){
                removeSprite(firstJewel);
            }
            var firstObstacle = obstacleSprites[0];
            if (obstacleSprites.length>0&&firstObstacle.position.x<=camera.position.x-(width/2+firstObstacle.width/2)){
                removeSprite(firstObstacle);
            }
            var firstPower = powerups[0];
            if (powerups.length>0&&firstPower.position.x<=camera.position.x-(width/2+firstPower.width/2)){
                removeSprite(firstPower);
            }
            player.velocity.y = player.velocity.y + GRAVITY;
            if (groundSprites.overlap(player)) {
              player.velocity.y = 0;
              player.position.y = (height-50) - (player.height/2);
            }
            if (keyDown(LEFT_ARROW)){
                player.position.x = player.position.x - 3;
            }
            
            if (keyDown(RIGHT_ARROW)){
                player.position.x = player.position.x + 3+(level*.2);
            }
            if (keyDown(UP_ARROW)&&player.position.y>=player.height){
                player.velocity.y=JUMP;
            }
            camera.position.x+=2+(level*.2)
            var firstGroundSprite = groundSprites[0];
            if (firstGroundSprite.position.x<=camera.position.x-(width/2 + firstGroundSprite.width/2)){
                groundSprites.remove(firstGroundSprite);
                firstGroundSprite.position.x= firstGroundSprite.position.x+numGroundSprites*firstGroundSprite.width;
                groundSprites.add(firstGroundSprite);
            }
            obstacleSprites.overlap(player, game_over);
            bonuses.overlap(player,bonus);
            powerups.overlap(player,p1_power);
            trump_shots.overlap(player,game_over);
            obstacleSprites.overlap(shooters,destroy_both);
            shooters.overlap(obstacleSprites,destroy_both);
            trump_shots.overlap(shooters,destroy_both);
            if (keyDown(LEFT_ARROW)){
                score+=0;
            }else{
                score+=1;
            }
            textAlign(CENTER);
            text("p1: "+score,camera.position.x,10);
            if (score>1000*level){
                level+=1;
                difficulty-=.01;
            }
            if (player.position.x+width/2 + player.width/2<=camera.position.x){
                game_over();
            }
            p1Lbl.position.x=player.position.x;
            p1Lbl.position.y=player.position.y-42.5;
            drawSprites();
        }
    }else if(numPlayers===2){
        if (isGameOver){
            background(0);
            fill(255);
            textAlign(CENTER);
            text("Player 1's score was: " + score, camera.position.x, camera.position.y - 40);
            text("Player 2's score was: " + score2, camera.position.x, camera.position.y - 20);
            if(score>score2){
                text("Player 1 wins!!!", camera.position.x, camera.position.y);
            }else if (score2>score){
                text("Player 2 wins!!!", camera.position.x, camera.position.y);
            }else{
                text("You somehow managed to tie. Bravo.", camera.position.x, camera.position.y);
            }
            text("Game Over! Click anywhere or press space to restart",camera.position.x,camera.position.y+20);
        }
        if(started&&(p1_in||p2_in)){
            Background.position.x=camera.position.x;
            Background.position.y=camera.position.y;
            Background2.position.x=camera.position.x+width/2-200;
            Background2.position.y=camera.position.y;
            Background3.position.x=camera.position.x-width/2+200;
            Background3.position.y=camera.position.y;
            background(0);
            if(random()>difficulty){
                var obstacle=createSprite(camera.position.x+width/2-15,random(0,height-65),30,30);
                obstacle.addImage(enemyImg);
                obstacleSprites.add(obstacle);
                if (random()>.75){
                    var randomnum=floor(random(0,obstacleSprites.length-1));
                if(obstacleSprites[randomnum].position.x<camera.position.x+width/2){
                    var bullet_x=obstacleSprites[randomnum].position.x;
                    var bullet_y=obstacleSprites[randomnum].position.y;
                }else{
                        randomnum=floor(random(0,obstacleSprites.length-1));
                        var bullet_x=obstacleSprites[randomnum].position.x;
                        var bullet_y=obstacleSprites[randomnum].position.y;
                }
                var bullet=createSprite(bullet_x,bullet_y,20,20);
                bullet.addImage(turdImg);
                bullet.velocity.x=-5;
                trump_shots.add(bullet);
                }
            }
            if(random()>.99){
                var jewel=createSprite(camera.position.x+width,random(0,height-65),10,10);
                jewel.addImage(bonusImg);
                bonuses.add(jewel);
            }
            if(random()>.995){
                var fireball=createSprite(camera.position.x+width,random(0,height-65),30,32);
                fireball.addImage(fire);
                powerups.add(fireball);
            }
            var firstJewel = bonuses[0];
            if (bonuses.length>0&&firstJewel.position.x<=camera.position.x-(width/2+firstJewel.width/2)){
                removeSprite(firstJewel);
            }
            var firstObstacle = obstacleSprites[0];
            if (obstacleSprites.length>0&&firstObstacle.position.x<=camera.position.x-(width/2+firstObstacle.width/2)){
                removeSprite(firstObstacle);
            }
            var firstPower = powerups[0];
            if (powerups.length>0&&firstPower.position.x<=camera.position.x-(width/2+firstPower.width/2)){
                removeSprite(firstPower);
            }
            player.velocity.y = player.velocity.y + GRAVITY;
            if (groundSprites.overlap(player)&&p1_in) {
              player.velocity.y = 0;
              player.position.y = (height-50) - (player.height/2);
            }
            if (keyDown(LEFT_ARROW)&&p1_in){
                player.position.x = player.position.x - 3;
            }
            if (keyDown(RIGHT_ARROW)&&p1_in){
                player.position.x = player.position.x + 3+(level*.2);
            }
            if (keyDown(UP_ARROW)&&player.position.y>=player.height&&p1_in){
                player.velocity.y=JUMP;
            }
            player2.velocity.y = player2.velocity.y + GRAVITY;
            if (groundSprites.overlap(player2)&&p2_in) {
                player2.velocity.y = 0;
                player2.position.y = (height-50) - (player2.height/2);
            }
            if (keyDown(65)&&p2_in){
                player2.position.x = player2.position.x - 3;
            }
            if (keyDown(68)&&p2_in){
                player2.position.x = player2.position.x + 3+(level*.2);
            }
            if (keyDown(87)&&player2.position.y>=player2.height&&p2_in){
                player2.velocity.y=JUMP;
            }
            camera.position.x+=2+(level*.2)
            var firstGroundSprite = groundSprites[0];
            if (firstGroundSprite.position.x<=camera.position.x-(width/2 + firstGroundSprite.width/2)){
                groundSprites.remove(firstGroundSprite);
                firstGroundSprite.position.x= firstGroundSprite.position.x+numGroundSprites*firstGroundSprite.width;
                groundSprites.add(firstGroundSprite);
            }
            obstacleSprites.overlap(player, p1_game_over);
            bonuses.overlap(player,bonus);
            powerups.overlap(player,p1_power);
            trump_shots.overlap(player,p1_game_over);
            trump_shots.overlap(player,destroy_both);
            obstacleSprites.overlap(player2, p2_game_over);
            bonuses.overlap(player2,bonus2);
            powerups.overlap(player2,p2_power);
            trump_shots.overlap(player2,p2_game_over);
            trump_shots.overlap(player2,destroy_both);
            obstacleSprites.overlap(shooters,destroy_both);
            shooters.overlap(obstacleSprites,destroy_both);
            trump_shots.overlap(shooters,destroy_both);
            if (keyDown(LEFT_ARROW)&&p1_in===true){
                score+=0;
            }else if(p1_in){
                score+=1;
            }if (keyDown(65)&&p2_in===true){
                score2+=0;
            }else if(p2_in){
                score2+=1;
            }
            textAlign(CENTER);
            text("p1: "+score,camera.position.x-30,10);
            text("p2: "+score2,camera.position.x+30,10);
            if (score>1000*level){
                level+=1;
                difficulty-=.01;
            }
            if (player.position.x+width/2 + player.width/2<=camera.position.x){
                p1_in=false;
            }
            if (player2.position.x+width/2 + player2.width/2<=camera.position.x){
                p2_in=false;
            }
            p1Lbl.position.x=player.position.x;
            p1Lbl.position.y=player.position.y-42.5;
            p2Lbl.position.x=player2.position.x;
            p2Lbl.position.y=player2.position.y-39;
            drawSprites();
        }
        if(!p1_in&&!p2_in){
            isGameOver=true;
        }
    }
}
function keyPressed(){
    if (keyCode===32){
        mouseClicked();
    }
    if(keyCode===DOWN_ARROW&&fire_p1){
        var ball=createSprite(camera.position.x+width,random(0,height-65),30,32);
        ball.addImage(fire);
        ball.position.x=player.position.x;
        ball.position.y=player.position.y;
        ball.velocity.x=10;
        shooters.add(ball);
        fire_p1=false;
    }
    if(keyCode===83&&fire_p2){
        var ball2=createSprite(camera.position.x+width,random(0,height-65),30,32);
        ball2.addImage(fire);
        ball2.position.x=player2.position.x;
        ball2.position.y=player2.position.y;
        ball2.velocity.x=10;
        shooters.add(ball2);
        fire_p2=false;
    }
}

function mouseClicked(){
    if (isGameOver){
        groundSprites.removeSprites();
        for (var n = 0; n < numGroundSprites; n++){
            var groundSprite = createSprite(((camera.position.x-width/2)+n*50),height-25,GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
            groundSprites.add(groundSprite);
        }
        player.position.x = camera.position.x;
        player.position.y = height-75;
        player2.position.x = camera.position.x-50;
        player2.position.y = height-75;
        obstacleSprites.removeSprites();
        bonuses.removeSprites();
        powerups.removeSprites();
        trump_shots.removeSprites();
        score=0;
        score2=0;
        difficulty=.98;
        level=1;
        isGameOver=false;
        started=true;
        p1_in=true;
        p2_in=true;
    }
}
function bonus(point){
    score+=200;
    point.remove();
}
function bonus2(point){
    score2+=200;
    point.remove();
}
function new_game(){
    started=true;
    isGameOver=false;
    p1_in=true;
    p2_in=true;
}
function p1_game_over(){
    p1_in=false;
    uhOh();
}
function p2_game_over(){
    p2_in=false;
    uhOh();
}
function p1_power(point){
    fire_p1=true;
    point.remove();
}
function p2_power(point){
    fire_p2=true;
    point.remove();
}
function destroy_both(point){
    point.remove();
}
function game_over(){
    isGameOver=true;
    uhOh();
}
function playSong(){
    var song= new Audio("Geometry_song.mp3");
    song.play();
    song.addEventListener('ended',song.play);
}
function uhOh(){
    var uhOh= new Audio("uhoh.1.mp3");
    uhOh.play();
}