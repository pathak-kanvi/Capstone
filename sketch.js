var PLAY = 1;
var END = 0;
var gameState = PLAY;

var  girl, girl_running, girl_collided, girl_jump
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;

var score;
var gameOver1Img,resetImg
//var jumpSound , checkPointSound, dieSound

function preload(){
    girl_running = loadAnimation("girl1.PNG","girl2.PNG","girl3.PNG", "girl4.PNG", "girl5.PNG", "girl6.PNG");
    girl_jump = loadAnimation("girljump.PNG");
    girl_collided = loadAnimation("girl7.PNG"); 
    
groundImage = loadImage("candyground.png");

obstacle1 = loadImage("obstacle1.PNG")
obstacle2 = loadImage("obstacle2.PNG");
obstacle3 = loadImage("obstacle3.png"); 
obstacle5 = loadImage ("obstacle5.png")
obstacle4 = loadImage ("obstacle4.png")
resetImg = loadImage("reset.PNG")
gameOver1Img = loadImage("gameOver.png")

}


function setup()
{
   createCanvas(600,200) 
  

   girl = createSprite(50,180,20,50);
   
   girl.addAnimation("running", girl_running);
   girl.addAnimation("collided", girl_collided);
  

  girl.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOver1Img);
  
  reset = createSprite(300,140);
  reset.addImage(resetImg);
  
  gameOver.scale = 0.5;
  reset.scale = 0.5;
  gameOver.visible = false
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  girl.setCollider("rectangle",0,0,girl.width,girl.height);
  girl.debug = false
  
  score = 0;
  
}

function draw ()
{
background("skyblue")
drawSprites()

text("Score: "+ score, 500,50);

  
  if(gameState === PLAY){
    //move the 
    gameOver.visible = false;
    reset.visible = false;
    //change the girl animation
      girl.changeAnimation("running", girl_running);
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& girl.y >= 100) {
        girl.velocityY = -12;
        girl.changeAnimation("jump", girl_jump)
        
    }
    
    //add gravity
    girl.velocityY = girl.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(girl)){
        //girl.velocityY = -12;
        
        gameState = END;
        //dieSound.play()
      
    }
  }
    if (gameState === END) {
      gameOver1.visible = true;
      reset.visible = true;
     //change the girl animation
      girl.changeAnimation("collided", girl_collided);
       
      if(mousePressedOver(reset)){
        reset();
       }
     
      ground.velocityX = 0;
      girl.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     //cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop girl from falling down
  girl.collide(invisibleGround);
 

  drawSprites();
{}


function reset(){
  gameState =PLAY
  gameOver.visible = false
  reset.visible = false

  //obstaclesGroup.destroyEach()
  //cloudsGroup.destroyEach()
  //score =0;
  girl.changeAnimation("running",girl_running)

}


function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
         case 4: obstacle.addImage(obstacle4);
                 break;
         case 5: obstacle.addImage(obstacle5);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }
   
  
     
   







 