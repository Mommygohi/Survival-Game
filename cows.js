window.setInterval(function(){
  moveCow0();
  moveCow1();
  moveCow2();
}, 2500);

var cow0_health = 1500;
var cow1_health = 1500;
var cow2_health = 1500;

function increaseAttack(type){
  if(type == "damage"){
    attack_damage++;
  } else {
    attack_range++;
  }
}

var attack_damage = 1;
var attack_range = 1;

function attack(){
  var player_location = document.querySelector(".player").id;
  player_location = player_location.split("-");
  var row = player_location[1];
  var col = player_location[2];
  var cows = [document.querySelector(".cow0").id, document.querySelector(".cow1").id, document.querySelector(".cow2").id];
  for(j = 0; j < cows.length; j++){
    var test = cows[j].split("-");
    var row2 = test[1];
    var col2 = test[2];
    if(row == row2 && col - 1 == col2){ //left
      if(j == 0){
        cow0_health -= attack_damage;
      } else if(j == 1){
        cow1_health -= attack_damage;
      } else if(j == 2){
        cow2_health -= attack_damage;
      }
    } else if(row == row2 && col - col2 == -1){ //right
      if(j == 0){
        cow0_health -= attack_damage;
      } else if(j == 1){
        cow1_health -= attack_damage;
      } else if(j == 2){
        cow2_health -= attack_damage;
      }
    } else if(row - 1 == row2 && col == col2){ //up
      if(j == 0){
        cow0_health -= attack_damage;
      } else if(j == 1){
        cow1_health -= attack_damage;
      } else if(j == 2){
        cow2_health -= attack_damage;
      }
    } else if(row - row2 == -1 && col == col2){ //down
      if(j == 0){
        cow0_health -= attack_damage;
      } else if(j == 1){
        cow1_health -= attack_damage;
      } else if(j == 2){
        cow2_health -= attack_damage;
      }
    }
  }
}

function moveCow0(){
  var cow_location = document.querySelector(".cow0").id;
  var old_location = cow_location;
  cow_location = cow_location.split("-");
  var row = cow_location[1];
  var col = cow_location[2];
  while(true){
    var rand = Math.floor(Math.random() * 4);
    if(rand == 1){
      var direction = "left";
    } else if(rand == 2){
      var direction = "right";
    } else if(rand == 3){
      var direction = "up";
    } else {
      var direction = "down";
    }
    var obstacle = testForCowObstacles(direction, col, row);
    if(obstacle != "obstacle"){
      break;
    }
  }
  if(direction == "left"){
    col--;
  } else if(direction == "right"){
    col++;
  } else if(direction == "up"){
    row--;
  } else if(direction == "down"){
    row++;
  }
  var new_location = "r-" + row + "-" + col;
  document.getElementById(old_location).classList.remove("cow0");
  document.getElementById(old_location).innerText = "";
  document.getElementById(new_location).classList.add("cow0");
  document.getElementById(new_location).innerText = cow0_health;
}

function moveCow1(){
  var cow_location = document.querySelector(".cow1").id;
  var old_location = cow_location;
  cow_location = cow_location.split("-");
  var row = cow_location[1];
  var col = cow_location[2];
  while(true){
    var rand = Math.floor(Math.random() * 4);
    if(rand == 1){
      var direction = "left";
    } else if(rand == 2){
      var direction = "right";
    } else if(rand == 3){
      var direction = "up";
    } else {
      var direction = "down";
    }
    var obstacle = testForCowObstacles(direction, col, row);
    if(obstacle != "obstacle"){
      break;
    }
  }
  if(direction == "left"){
    col--;
  } else if(direction == "right"){
    col++;
  } else if(direction == "up"){
    row--;
  } else if(direction == "down"){
    row++;
  }
  var new_location = "r-" + row + "-" + col;
  document.getElementById(old_location).classList.remove("cow1");
  document.getElementById(old_location).innerText = "";
  document.getElementById(new_location).classList.add("cow1");
  document.getElementById(new_location).innerText = cow1_health;
}

function moveCow2(){
  var cow_location = document.querySelector(".cow2").id;
  var old_location = cow_location;
  cow_location = cow_location.split("-");
  var row = cow_location[1];
  var col = cow_location[2];
  while(true){
    var rand = Math.floor(Math.random() * 4);
    if(rand == 1){
      var direction = "left";
    } else if(rand == 2){
      var direction = "right";
    } else if(rand == 3){
      var direction = "up";
    } else {
      var direction = "down";
    }
    var obstacle = testForCowObstacles(direction, col, row);
    if(obstacle != "obstacle"){
      break;
    }
  }
  if(direction == "left"){
    col--;
  } else if(direction == "right"){
    col++;
  } else if(direction == "up"){
    row--;
  } else if(direction == "down"){
    row++;
  }
  var new_location = "r-" + row + "-" + col;
  document.getElementById(old_location).classList.remove("cow2");
  document.getElementById(old_location).innerText = "";
  document.getElementById(new_location).classList.add("cow2");
  document.getElementById(new_location).innerText = cow2_health;
}

function testForCowObstacles(direction, col, row){
  if(direction == "left" && col == 1){
    return "obstacle";
  } else if(direction == "right" && col == 100){
    return "obstacle";
  } else if(direction == "up" && row == 1){
    return "obstacle";
  } else if(direction == "down" && row == 100){
    return "obstacle";
  }

  var rocks = [];
  var trees = [];
  var bushes = [];
  var cows = [document.querySelector(".cow0").id, document.querySelector(".cow1").id, document.querySelector(".cow2").id];
  var player = [document.querySelector(".player").id];
  for(i = 0; i < document.getElementsByClassName("rock").length; i++){
    rocks.push(document.getElementsByClassName("rock")[i].id);
  }
  for(j = 0; j < document.getElementsByClassName("tree").length; j++){
    trees.push(document.getElementsByClassName("tree")[j].id);
  }
  for(k = 0; k < document.getElementsByClassName("bush").length; k++){
    bushes.push(document.getElementsByClassName("bush")[k].id);
  }
  var obstacles = rocks.concat(trees, bushes, cows, player);
  for(m = 0; m < obstacles.length; m++){
    var test = obstacles[m].split("-");
    var row2 = test[1];
    var col2 = test[2];
    if(direction == "left" && row == row2 && col - 1 == col2){
      return "obstacle";
    } else if(direction == "right" && row == row2 && col - col2 == -1){
      return "obstacle";
    } else if(direction == "up" && row - 1 == row2 && col == col2){
      return "obstacle";
    } else if(direction == "down" && row - row2 == -1 && col == col2){
      return "obstacle";
    }
  }
}
