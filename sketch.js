
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 1, END = 0, gameState = PLAY
var score = 0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400,400)
monkey = createSprite(50,350,20,60)
monkey.addAnimation("monkey",monkey_running)
monkey.scale = 0.1
ground = createSprite(200,380,800,10)
ground.velocityX = -2
FoodGroup = new Group() 
obstacleGroup = new Group()
}


function draw() {
background("white")
text("score :"+score,300,50)
if (gameState === PLAY){
if(ground.x<0){
ground.x =ground.width/2
}
if(keyDown("space")){
  monkey.velocityY=-12
}  
monkey.velocityY+=0.6
if(monkey.isTouching(FoodGroup)){
  score = score+2
  FoodGroup.destroyEach()
}
spawnBanana()
spawnObstacles()
if(obstacleGroup.isTouching(monkey)){
  gameState = END
}
} else if(gameState === END){
  obstacleGroup.setVelocityXEach(0)
  FoodGroup.setVelocityXEach(0)
  ground.velocityX = 0
  obstacleGroup.setLifetimeEach(-1)
  FoodGroup.setLifetimeEach(-1)
}
monkey.collide(ground)
drawSprites()  
}


function spawnBanana(){
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,320));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
    
  }
}

function spawnObstacles(){
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600,350,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
    
  }
}



