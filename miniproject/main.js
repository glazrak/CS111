var GRAVITY=0.3;
var groundSprites;
var airSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;
var player;
var JUMP=-10;
var hasJump=false;
var items;
var trophyNum;
var trophyCol;
var shooters;
var bullets;
var level;
var difficulty;
var lives;
var shooterImg;
var itemImg;
var bulletImg;
var life;
var trophytotal;

function preload(){
    itemImg=loadImage("http://i.imgur.com/ZrExC4G.png");
    shooterImg=loadImage("http://i.imgur.com/r13SNg8.gif");
    bulletImg=loadImage("http://i.imgur.com/GriWcw5.png");
}

function setup(){
    level=1;
    lives=3;
    trophytotal=0;
    trophyNum=10;
    trophyCol=0;
    difficulty=.99;
    createCanvas(innerWidth-50,innerHeight-50);
    numGroundSprites=width/50;
    groundSprites= new Group();
    airSprites= new  Group();
    items= new Group();
    shooters= new Group();
    bullets= new Group();
    for (var n = 0; n < numGroundSprites;n++){
        var groundSprite=createSprite(n*50 + 25,height-25,GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
    for (var n = 0; n < numGroundSprites;n++){
        var airSprite=createSprite(n*50 + 25,random(25,height-75),GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
        airSprites.add(airSprite);
    }
    for(var i=0; i<trophyNum;i++){
        var item=createSprite(random(10,width-10),random(10,height-60),20,20);
        item.addImage(itemImg);
        items.add(item);
    }
    for(i=0; i<10;i++){
        var random_num=floor(random(0,numGroundSprites/10)*i);
        var bad_guy_width=airSprites[random_num].position.x;
        var bad_guy_height=airSprites[random_num].position.y;
        var bad_guy=createSprite(bad_guy_width,bad_guy_height,10,30);
        bad_guy.addImage(shooterImg);
        shooters.add(bad_guy);
    }
    player= createSprite(width/2,height-75,50,50);
}

function draw(){
    if (lives>0){
        background(0);
        player.velocity.y+=GRAVITY;
        items.overlap(player,collected);
        airSprites.overlap(player,_reset);
        bullets.overlap(player,shot);
        if(groundSprites.overlap(player)){
            player.velocity.y=0;
            player.position.y=height-75;
            hasJump=false;
        }
        if(random()>difficulty){
            var random_number=floor(random(0,shooters.length));
            var bullet_width=shooters[random_number].position.x;
            var bullet_height=shooters[random_number].position.y;
            var bullet=createSprite(bullet_width,bullet_height,10,10)
            if(random()>.5){
                bullet.velocity.y=-5;
            }else{
                bullet.velocity.y=5;
            }
            
            bullets.add(bullet);
        }
        if(keyDown(RIGHT_ARROW)&&player.position.x<innerWidth-41.5){
            player.position.x=player.position.x + 3;
        }
        if(keyDown(LEFT_ARROW)&&player.position.x>25){
            player.position.x=player.position.x - 3;
        }
        if(keyDown(UP_ARROW)&& !hasJump){
            player.velocity.y=JUMP;
            hasJump=true;
        }
        if(camera.position.x===innerWidth-camera.width/2){
            camera.position.x=camera.position.x;
        }else if(camera.position.x===camera.width/2){
            camera.position.x=camera.position.x;
        }else{
            camera.position.x=player.position.x
        }
        if(camera.position.y>player.position.y-camera.height/2){
            camera.position.y=camera.position.y;
        }else if(camera.position.y===camera.height/2){
            camera.position.y=camera.position.y;
        }else{
            camera.position.y=player.position.y
        }
        if (trophyCol===trophyNum){
                level+=1;
                difficulty-=.02;
                trophyNum+=5;
                trophyCol=0;
                shooters.removeSprites();
                bullets.removeSprites();
                items.removeSprites();
                airSprites.removeSprites();
                groundSprites.removeSprites();
                for(var i=0; i<trophyNum;i++){
                    var item=createSprite(random(10,width-10),random(10,height-60),20,20);
                    item.addImage(itemImg);
                    items.add(item);
                }
                for (var n = 0; n < numGroundSprites;n++){
                    var groundSprite=createSprite(n*50 + 25,height-25,GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
                    groundSprites.add(groundSprite);
                }
                for (var n = 0; n < numGroundSprites;n++){
                    var airSprite=createSprite(n*50 + 25,random(25,height-75),GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
                    airSprites.add(airSprite);
                }
                for(i=0; i<10;i++){
                    var random_num=floor(random(0,numGroundSprites/10)*i);
                    var bad_guy_width=airSprites[random_num].position.x;
                    var bad_guy_height=airSprites[random_num].position.y;
                    var bad_guy=createSprite(bad_guy_width,bad_guy_height,10,30);
                    bad_guy.addImage(shooterImg);
                    shooters.add(bad_guy);
                }
            }
        
        drawSprites()
    }else{
        background(0);
        fill(255);
        textAlign(CENTER);
        text("You're score was "+trophytotal+" trophies!!!",camera.position.x,camera.position.y-15)
        text("Game Over! Click anywhere or press space to restart",camera.position.x,camera.position.y);
    }
}
function _reset(point){
    if((player.position.y)<=(point.position.y-(point.height/2 - 1))){
        if (player.velocity.y>=0){
            player.velocity.y=0;
            player.position.y=point.position.y-50;
            hasJump=false;
        }
    }
}
function collected(point){
    trophyCol+=1;
    trophytotal+=1;
    var title=document.getElementById("trophies");
    title.innerHTML="trophies: "+trophyCol+"/"+trophyNum;
    point.remove();
}
function shot(point){
    lives-=1;
    life = document.getElementById("lives");
    life.innerHTML="lives: "+lives;
    point.remove();
}
function mouseClicked(){
    if (!(lives>0)){
        lives=3;
        level=1;
        difficulty=.99;
        trophyCol=0;
        trophytotal=0;
        player.position.x=width/2;
        player.position.y=height-75;
        trophyNum=10;
        shooters.removeSprites();
        bullets.removeSprites();
        items.removeSprites();
        airSprites.removeSprites();
        groundSprites.removeSprites();
        for (var n = 0; n < numGroundSprites;n++){
            var groundSprite=createSprite(n*50 + 25,height-25,GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
            groundSprites.add(groundSprite);
        }
        for (var n = 0; n < numGroundSprites;n++){
            var airSprite=createSprite(n*50 + 25,random(25,height-75),GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
            airSprites.add(airSprite);
        }
        for(var i=0; i<trophyNum;i++){
            var item=createSprite(random(10,width-10),random(10,height-60),20,20);
            item.addImage(itemImg);
            items.add(item);
        }
        for(i=0; i<10;i++){
            var random_num=floor(random(0,numGroundSprites/10)*i);
            var bad_guy_width=airSprites[random_num].position.x;
            var bad_guy_height=airSprites[random_num].position.y;
            var bad_guy=createSprite(bad_guy_width,bad_guy_height,10,30);
            bad_guy.addImage(shooterImg);
            shooters.add(bad_guy);
        }
        life = document.getElementById("lives");
        life.innerHTML="lives: "+lives;
    }
}
function keyPressed(){
    if (keyCode===32){
        mouseClicked();
    }
}