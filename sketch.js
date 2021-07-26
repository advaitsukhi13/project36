var dog,sadDog,happyDog;
var feed , addFood;
var foodObj , foodobject ;
var fedTime , lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  foodobject = createSprite(600 , 100 , 50 , 50);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  


}

function draw() {
  background(46,139,87);
  fill(255 , 255 , 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 + " PM" , 350 , 30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM" , 350 , 30);
  }else{
    text("Last Feed : "+lastFed + " AM" , 350 , 30);
  }
  display();
  drawSprites();
}




function feedDog(){
  dog.addImage(happyDog);
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  if(mousePressed === feed){
    foodobject.pos.x = dog.pos.x;

  }

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


