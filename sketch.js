var trex, ground, trexrun, invisibleground, cloudimage, obstacleimage, obstacleimage2, obstacleimage3, obstacleimage4, obstacleimage5, obstacleimage6, gameover, goimg, restart, restartimg, ObstaclesGroup, CloudsGroup,trexc;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload() {
  trexrun = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  ground = loadImage("ground2.png")
  trexc=loadAnimation("trex_collided.png")
  cloudimage = loadImage("cloud.png")
  obstacleimage = loadImage("obstacle1.png")
  obstacleimage2 = loadImage("obstacle2.png")
  obstacleimage3 = loadImage("obstacle3.png")
  obstacleimage4 = loadImage("obstacle4.png")
  obstacleimage5 = loadImage("obstacle5.png")
  obstacleimage6 = loadImage("obstacle6.png")
  goimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);
  invisibleground = createSprite(300, 175, 600, 10)
  trex = createSprite(30, 150, 20, 20);
  trex.addAnimation("running trex", trexrun);
  trex.addAnimation("trex_collided",trexc);
  trex.scale = 0.5
  ground1 = createSprite(400, 170, 600, 10)
  ground1.addImage("groundimage", ground)
  ground1.velocityX = -4
  invisibleground.visible = false
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  score = 0
  //place gameOver and restart icon on the screen
   gameOver = createSprite(300, 100);
   restart = createSprite(300, 140);
  gameOver.addImage("gameOver",goimg);
  gameOver.scale = 0.5;
  restart.addImage("restart",restartimg);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

}

function draw() {
  background(255);
  trex.collide(invisibleground)
  text("Score: "+score , 450, 50)
  if (gameState == PLAY) {
    if (trex.y>146 && keyDown("space")) {
      trex.velocityY = -12
    }
    console.log(trex.y)
    score = score + Math.round(getFrameRate() / 60);

    if (ground1.x < 0) {
      ground1.x = ground1.width / 2;
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    spawnObstacles()
    if (ObstaclesGroup.isTouching(trex)) {

      gameState = END;

    }


  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground1.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);

    //change the trex animation
    trex.changeAnimation("trex_collided",trexc);

    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);


  }

  if (mousePressedOver(restart)) {
    reset();
  }

  drawSprites()
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = random(80, 120);
    cloud.addImage("cloud", cloudimage)
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud)
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 150, 10, 40);
    obstacle.velocityX = -6;
    ObstaclesGroup.add(obstacle)
    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage("obstacle1", obstacleimage);
        break;
      case 2:
        obstacle.addImage("obstacle2", obstacleimage2);
        break;
      case 3:
        obstacle.addImage("obstacle3", obstacleimage3);
        break;
      case 4:
        obstacle.addImage("obstacle4", obstacleimage4);
        break;
      case 5:
        obstacle.addImage("obstacle5", obstacleimage5);
        break;
      case 6:
        obstacle.addImage("obstacle6", obstacleimage6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running trex", trexrun);
  
  score = 0;
  
}