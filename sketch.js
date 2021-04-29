var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var invisibleGround;
var score;
var PLAY = 1;
var gameState = PLAY;
var END = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png");
  monkey_collided = loadAnimation("sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  //creating canvas
  createCanvas(600,600);
  
  //create sprite for monkey
  monkey = createSprite(50,450,20,20);
  //adding animation
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  //adjusting height 
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(300,470,600,10);
  invisibleGround.velocityX = -3;
  invisibleGround.visible = false;
  
 // monkey.setCollider("rectangle",30,30,monkey.width,monkey.height);
 //monkey.debug = true;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
}

function draw() {
  //clearing the background
  background("lightGreen");
  //displaying score
   textSize(20);
  fill("blue");
  text("score:"+score,500,250);
  textSize(20);
  fill("blue");
 
   monkey.collide(invisibleGround);
  if(gameState===PLAY){
      //create group for bananas
  bananaG();
  //create group for obstacles
  obstaclesG();
    if(keyDown("space")&&monkey.y>=380){
      monkey.velocityY = -12;   
    }
    monkey.velocityY = monkey.velocityY + 0.8;
   
    
    if(invisibleGround.x<0){
      invisibleGround.x=invisibleGround.width/2;
    }
    
    
    if(foodGroup.isTouching(monkey)){
    score = score+1;
    foodGroup[0].destroy();
     
    }
    if(obstacleGroup.isTouching(monkey)){
    gameState = END; 
    monkey.velocityY = 0;  
  }
} else if (gameState===END){
   text("gameOver",300,350);
  //  monkey.changeAnimation("collided",monkey_collided);
    invisibleGround.velocityX = 0;
   foodGroup.setVelocityEach(0);
   obstacleGroup.setVelocityEach(0);
   foodGroup.destroyEach();
  obstacleGroup.destroyEach();
   monkey.visible = false;
  
  }
 
  
 
  
  
  drawSprites();
}

function bananaG(){
  if(frameCount%100 ===0){
    var banana = createSprite(500,350,20,20);
  //   banana.velocityX = -(6 + score/5);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = -1
    foodGroup.add(banana);
  }
}

function obstaclesG(){
  if(frameCount%100===0){
    var obstacle = createSprite(500,450,20,20);
 //    obstacle.velocityX = -(6 + score/5);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = -1;
    obstacleGroup.add(obstacle);
    
    
  }
}




