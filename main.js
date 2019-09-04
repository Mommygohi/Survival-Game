document.onkeydown = function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }

  switch(e.keyCode) {
    case 37:
      move("left");
      break;
    case 38:
      move("up");
      break;
    case 39:
      move("right");
      break;
    case 40:
      move("down");
      break;
    case 65:
      playerScroll("left");
      break;
    case 87:
      playerScroll("up");
      break;
    case 68:
      playerScroll("right");
      break;
    case 83:
      playerScroll("down");
      break;
    case 32:
      collectResource();
      break;
    case 70:
      attack();
      break;
  }
};

function move(direction){
  var player_location = document.querySelector(".player").id;
  player_location = player_location.split("-");
  var row = player_location[1];
  var col = player_location[2];
  var obstacle = testForObstacles(direction, col, row);
  if(obstacle != "obstacle"){
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
    player_location = document.querySelector(".player").id;
    document.getElementById(player_location).classList.remove("player");
    document.getElementById(new_location).classList.add("player");
    playerScroll(direction);
  }
}

function testForObstacles(direction, col, row){
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
  var wooden_walls = [];
  var wooden_traps = [];
  var cows = [document.querySelector(".cow0").id, document.querySelector(".cow1").id, document.querySelector(".cow2").id];
  for(i = 0; i < document.getElementsByClassName("rock").length; i++){
    rocks.push(document.getElementsByClassName("rock")[i].id);
  }
  for(j = 0; j < document.getElementsByClassName("tree").length; j++){
    trees.push(document.getElementsByClassName("tree")[j].id);
  }
  for(k = 0; k < document.getElementsByClassName("bush").length; k++){
    bushes.push(document.getElementsByClassName("bush")[k].id);
  }
  for(l = 0; l < document.getElementsByClassName("wooden_wall").length; l++){
    wooden_walls.push(document.getElementsByClassName("wooden_wall")[l].id);
  }
  for(n = 0; n < document.getElementsByClassName("wooden_traps").length; n++){
    wooden_traps.push(document.getElementsByClassName("wooden_traps")[n].id);
  }
  var obstacles = rocks.concat(trees, bushes, cows, wooden_walls, wooden_traps);
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

function playerScroll(direction){
  if(direction == "up"){
    window.scrollBy(0, -104);
  } else if(direction == "down"){
    window.scrollBy(0, 104);
  } else if(direction == "left"){
    window.scrollBy(-104, 0);
  } else if(direction == "right"){
    window.scrollBy(104, 0);
  }
}

var crafting_menu_open = false;

function crafting_menu_access(){
  if(crafting_menu_open == false){
    crafting_menu_open = true;
    document.getElementById("crafting_menu").style.visibility = "visible";
    document.getElementById("crafting_menu_access").innerText = "-";
  } else {
    crafting_menu_open = false;
    document.getElementById("crafting_menu").style.visibility = "hidden";
    document.getElementById("crafting_menu_access").innerText = "+";
  }
}

var building_menu_open = false;

function building_menu_access(){
  if(building_menu_open == false){
    building_menu_open = true;
    document.getElementById("building_menu").style.visibility = "visible";
    document.getElementById("building_menu_access").innerText = "-";
  } else {
    building_menu_open = false;
    document.getElementById("building_menu").style.visibility = "hidden";
    document.getElementById("building_menu_access").innerText = "+";
  }
}

function info(txt){
  var t = "<div>Cost:</div><ul>";
  for(i = 0; i < txt.length; i++){
    t += "<li>" + txt[i] + "</li>";
  }
  t += "</ul>";

  var computedFontSize = window.getComputedStyle(document.getElementById("info_box")).fontSize;
  computedFontSize = (i + 3) * computedFontSize.substring(computedFontSize.length - 2,computedFontSize)
  document.getElementById("info_box").innerHTML = t;
  document.getElementById("info_box").style.height = computedFontSize + "px";
}

var slot1 = "";
var slot2 = "";
var slot3 = "";
var slot4 = "";
var inventory_rocks = 0;
var inventory_wood = 0;
var inventory_berries = 0;
var stone_per_harvest = 1;
var wood_per_harvest = 1;

function collectResource(){
  var player_location = document.querySelector(".player").id;
  player_location = player_location.split("-");
  var row = player_location[1];
  var col = player_location[2];

  var rocks = [];
  var trees = [];
  var bushes = [];
  for(i = 0; i < document.getElementsByClassName("rock").length; i++){
    rocks.push(document.getElementsByClassName("rock")[i].id);
  }
  for(j = 0; j < document.getElementsByClassName("tree").length; j++){
    trees.push(document.getElementsByClassName("tree")[j].id);
  }
  for(k = 0; k < document.getElementsByClassName("bush").length; k++){
    bushes.push(document.getElementsByClassName("bush")[k].id);
  }
  for(l = 0; l < rocks.length; l++){
    var test = rocks[l].split("-");
    var row2 = test[1];
    var col2 = test[2];
    if(row == row2 && col - 1 == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "rock" || slot2 == "rock" || slot3 == "rock" || slot4 == "rock") && document.getElementById("item1").style.visibility == "hidden"){
      inventory_rocks += stone_per_harvest;
      if(slot1 == "" || slot1 == "rock"){
        slot1 = "rock";
        document.getElementById("slot1").style.backgroundColor = "gray";
        document.getElementById("slot1").innerText = inventory_rocks;
      } else if(slot2 == "" || slot2 == "rock"){
        slot2 = "rock";
        document.getElementById("slot2").style.backgroundColor = "gray";
        document.getElementById("slot2").innerText = inventory_rocks;
      } else if(slot3 == "" || slot3 == "rock"){
        slot3 = "rock";
        document.getElementById("slot3").style.backgroundColor = "gray";
        document.getElementById("slot3").innerText = inventory_rocks;
      } else {
        slot4 = "rock";
        document.getElementById("slot4").style.backgroundColor = "gray";
        document.getElementById("slot4").innerText = inventory_rocks;
      }
    } else if(row == row2 && col - col2 == -1 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "rock" || slot2 == "rock" || slot3 == "rock" || slot4 == "rock") && document.getElementById("item1").style.visibility == "hidden"){
      inventory_rocks += stone_per_harvest;
      if(slot1 == "" || slot1 == "rock"){
        slot1 = "rock";
        document.getElementById("slot1").style.backgroundColor = "gray";
        document.getElementById("slot1").innerText = inventory_rocks;
      } else if(slot2 == "" || slot2 == "rock"){
        slot2 = "rock";
        document.getElementById("slot2").style.backgroundColor = "gray";
        document.getElementById("slot2").innerText = inventory_rocks;
      } else if(slot3 == "" || slot3 == "rock"){
        slot3 = "rock";
        document.getElementById("slot3").style.backgroundColor = "gray";
        document.getElementById("slot3").innerText = inventory_rocks;
      } else {
        slot4 = "rock";
        document.getElementById("slot4").style.backgroundColor = "gray";
        document.getElementById("slot4").innerText = inventory_rocks;
      }
    } else if(row - 1 == row2 && col == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "rock" || slot2 == "rock" || slot3 == "rock" || slot4 == "rock") && document.getElementById("item1").style.visibility == "hidden"){
      inventory_rocks += stone_per_harvest;
      if(slot1 == "" || slot1 == "rock"){
        slot1 = "rock";
        document.getElementById("slot1").style.backgroundColor = "gray";
        document.getElementById("slot1").innerText = inventory_rocks;
      } else if(slot2 == "" || slot2 == "rock"){
        slot2 = "rock";
        document.getElementById("slot2").style.backgroundColor = "gray";
        document.getElementById("slot2").innerText = inventory_rocks;
      } else if(slot3 == "" || slot3 == "rock"){
        slot3 = "rock";
        document.getElementById("slot3").style.backgroundColor = "gray";
        document.getElementById("slot3").innerText = inventory_rocks;
      } else {
        slot4 = "rock";
        document.getElementById("slot4").style.backgroundColor = "gray";
        document.getElementById("slot4").innerText = inventory_rocks;
      }
    } else if(row - row2 == -1 && col == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "rock" || slot2 == "rock" || slot3 == "rock" || slot4 == "rock") && document.getElementById("item1").style.visibility == "hidden"){
      inventory_rocks += stone_per_harvest;
      if(slot1 == "" || slot1 == "rock"){
        slot1 = "rock";
        document.getElementById("slot1").style.backgroundColor = "gray";
        document.getElementById("slot1").innerText = inventory_rocks;
      } else if(slot2 == "" || slot2 == "rock"){
        slot2 = "rock";
        document.getElementById("slot2").style.backgroundColor = "gray";
        document.getElementById("slot2").innerText = inventory_rocks;
      } else if(slot3 == "" || slot3 == "rock"){
        slot3 = "rock";
        document.getElementById("slot3").style.backgroundColor = "gray";
        document.getElementById("slot3").innerText = inventory_rocks;
      } else {
        slot4 = "rock";
        document.getElementById("slot4").style.backgroundColor = "gray";
        document.getElementById("slot4").innerText = inventory_rocks;
      }
    }
  }
  for(m = 0; m < trees.length; m++){
    var test = trees[m].split("-");
    var row2 = test[1];
    var col2 = test[2];
    if(row == row2 && col - 1 == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "wood" || slot2 == "wood" || slot3 == "wood" || slot4 == "wood")){
      inventory_wood += wood_per_harvest;
      if(slot1 == "" || slot1 == "wood"){
        slot1 = "wood";
        document.getElementById("slot1").style.backgroundColor = "#987654";
        document.getElementById("slot1").innerText = inventory_wood;
      } else if(slot2 == "" || slot2 == "wood"){
        slot2 = "wood";
        document.getElementById("slot2").style.backgroundColor = "#987654";
        document.getElementById("slot2").innerText = inventory_wood;
      } else if(slot3 == "" || slot3 == "wood"){
        slot3 = "wood";
        document.getElementById("slot3").style.backgroundColor = "#987654";
        document.getElementById("slot3").innerText = inventory_wood;
      } else {
        slot4 = "wood";
        document.getElementById("slot4").style.backgroundColor = "#987654";
        document.getElementById("slot4").innerText = inventory_wood;
      }
    } else if(row == row2 && col - col2 == -1 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "wood" || slot2 == "wood" || slot3 == "wood" || slot4 == "wood")){
      inventory_wood += wood_per_harvest;
      if(slot1 == "" || slot1 == "wood"){
        slot1 = "wood";
        document.getElementById("slot1").style.backgroundColor = "#987654";
        document.getElementById("slot1").innerText = inventory_wood;
      } else if(slot2 == "" || slot2 == "wood"){
        slot2 = "wood";
        document.getElementById("slot2").style.backgroundColor = "#987654";
        document.getElementById("slot2").innerText = inventory_wood;
      } else if(slot3 == "" || slot3 == "wood"){
        slot3 = "wood";
        document.getElementById("slot3").style.backgroundColor = "#987654";
        document.getElementById("slot3").innerText = inventory_wood;
      } else {
        slot4 = "wood";
        document.getElementById("slot4").style.backgroundColor = "#987654";
        document.getElementById("slot4").innerText = inventory_wood;
      }
    } else if(row - 1 == row2 && col == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "wood" || slot2 == "wood" || slot3 == "wood" || slot4 == "wood")){
      inventory_wood += wood_per_harvest;
      if(slot1 == "" || slot1 == "wood"){
        slot1 = "wood";
        document.getElementById("slot1").style.backgroundColor = "#987654";
        document.getElementById("slot1").innerText = inventory_wood;
      } else if(slot2 == "" || slot2 == "wood"){
        slot2 = "wood";
        document.getElementById("slot2").style.backgroundColor = "#987654";
        document.getElementById("slot2").innerText = inventory_wood;
      } else if(slot3 == "" || slot3 == "wood"){
        slot3 = "wood";
        document.getElementById("slot3").style.backgroundColor = "#987654";
        document.getElementById("slot3").innerText = inventory_wood;
      } else {
        slot4 = "wood";
        document.getElementById("slot4").style.backgroundColor = "#987654";
        document.getElementById("slot4").innerText = inventory_wood;
      }
    } else if(row - row2 == -1 && col == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "wood" || slot2 == "wood" || slot3 == "wood" || slot4 == "wood")){
      inventory_wood += wood_per_harvest;
      if(slot1 == "" || slot1 == "wood"){
        slot1 = "wood";
        document.getElementById("slot1").style.backgroundColor = "#987654";
        document.getElementById("slot1").innerText = inventory_wood;
      } else if(slot2 == "" || slot2 == "wood"){
        slot2 = "wood";
        document.getElementById("slot2").style.backgroundColor = "#987654";
        document.getElementById("slot2").innerText = inventory_wood;
      } else if(slot3 == "" || slot3 == "wood"){
        slot3 = "wood";
        document.getElementById("slot3").style.backgroundColor = "#987654";
        document.getElementById("slot3").innerText = inventory_wood;
      } else {
        slot4 = "wood";
        document.getElementById("slot4").style.backgroundColor = "#987654";
        document.getElementById("slot4").innerText = inventory_wood;
      }
    }
  }
  for(n = 0; n < bushes.length; n++){
    var test = bushes[n].split("-");
    var row2 = test[1];
    var col2 = test[2];
    if(row == row2 && col - 1 == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "berry" || slot2 == "berry" || slot3 == "berry" || slot4 == "berry")){
      inventory_berries++;
      if(slot1 == "" || slot1 == "berry"){
        slot1 = "berry";
        document.getElementById("slot1").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot1").innerText = inventory_berries;
      } else if(slot2 == "" || slot2 == "berry"){
        slot2 = "berry";
        document.getElementById("slot2").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot2").innerText = inventory_berries;
      } else if(slot3 == "" || slot3 == "berry"){
        slot3 = "berry";
        document.getElementById("slot3").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot3").innerText = inventory_berries;
      } else {
        slot4 = "berry";
        document.getElementById("slot4").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot4").innerText = inventory_berries;
      }
    } else if(row == row2 && col - col2 == -1 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "berry" || slot2 == "berry" || slot3 == "berry" || slot4 == "berry")){
      inventory_berries++;
      if(slot1 == "" || slot1 == "berry"){
        slot1 = "berry";
        document.getElementById("slot1").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot1").innerText = inventory_berries;
      } else if(slot2 == "" || slot2 == "berry"){
        slot2 = "berry";
        document.getElementById("slot2").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot2").innerText = inventory_berries;
      } else if(slot3 == "" || slot3 == "berry"){
        slot3 = "berry";
        document.getElementById("slot3").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot3").innerText = inventory_berries;
      } else {
        slot4 = "berry";
        document.getElementById("slot4").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot4").innerText = inventory_berries;
      }
    } else if(row - 1 == row2 && col == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "berry" || slot2 == "berry" || slot3 == "berry" || slot4 == "berry")){
      inventory_berries++;
      if(slot1 == "" || slot1 == "berry"){
        slot1 = "berry";
        document.getElementById("slot1").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot1").innerText = inventory_berries;
      } else if(slot2 == "" || slot2 == "berry"){
        slot2 = "berry";
        document.getElementById("slot2").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot2").innerText = inventory_berries;
      } else if(slot3 == "" || slot3 == "berry"){
        slot3 = "berry";
        document.getElementById("slot3").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot3").innerText = inventory_berries;
      } else {
        slot4 = "berry";
        document.getElementById("slot4").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot4").innerText = inventory_berries;
      }
    } else if(row - row2 == -1 && col == col2 && (slot1 == "" || slot2 == "" || (slot3 == "" && document.getElementById("slot3").style.display == "inline-block") || (slot4 == "" && document.getElementById("slot4").style.display == "inline-block") || slot1 == "berry" || slot2 == "berry" || slot3 == "berry" || slot4 == "berry")){
      inventory_berries++;
      if(slot1 == "" || slot1 == "berry"){
        slot1 = "berry";
        document.getElementById("slot1").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot1").innerText = inventory_berries;
      } else if(slot2 == "" || slot2 == "berry"){
        slot2 = "berry";
        document.getElementById("slot2").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot2").innerText = inventory_berries;
      } else if(slot3 == "" || slot3 == "berry"){
        slot3 = "berry";
        document.getElementById("slot3").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot3").innerText = inventory_berries;
      } else {
        slot4 = "berry";
        document.getElementById("slot4").style.backgroundColor = "rgb(67, 69, 206)";
        document.getElementById("slot4").innerText = inventory_berries;
      }
    }
  }
}

function purchase(equip){
  if(equip == "wooden_pickaxe" && inventory_wood >= 650){
    stone_per_harvest++;
    inventory_wood -= 650;
    document.getElementById("item1").style.visibility = "hidden";
  } else if(equip == "wooden_axe" && inventory_wood >= 650){
    wood_per_harvest++;
    inventory_wood -= 650;
    document.getElementById("item2").style.visibility = "hidden";
  } else if(equip == "wooden_sword" && inventory_wood >= 500){
    increaseAttack("damage");
    inventory_wood -= 500;
    document.getElementById("item3").style.visibility = "hidden";
  } else if(equip == "wooden_spear" && inventory_wood >= 350){
    increaseAttack("range");
    inventory_wood -= 350;
    document.getElementById("item4").style.visibility = "hidden";
  } else if(equip == "wooden_hammer" && inventory_wood >= 300){
    //for building wooden stuff
    inventory_wood -= 300;
    document.getElementById("item5").style.visibility = "hidden";
  } else if(equip == "wooden_box" && inventory_wood >= 1600){
    document.getElementById("slot3").style.display = "inline-block";
    document.getElementById("slot4").style.display = "inline-block";
    document.getElementById("inventory").style.left = "635px";
    inventory_wood -= 1600;
    document.getElementById("item6").style.visibility = "hidden";
  } else if(equip == "stone_pickaxe" && inventory_wood >= 100 && inventory_rocks >= 600 && document.getElementById("item1").style.visibility == "hidden"){
    stone_per_harvest++;
    inventory_wood -= 100;
    inventory_rocks -= 600;
    document.getElementById("item7").style.visibility = "hidden";
  } else if(equip == "stone_axe" && inventory_wood >= 100 && inventory_rocks >= 600 && document.getElementById("item2").style.visibility == "hidden"){
    wood_per_harvest++;
    inventory_wood -= 100;
    inventory_rocks -= 600;
    document.getElementById("item8").style.visibility = "hidden";
  } else if(equip == "stone_sword" && inventory_wood >= 100 && inventory_rocks >= 400 && document.getElementById("item3").style.visibility == "hidden"){
    increaseAttack("damage");
    inventory_wood -= 100;
    inventory_rocks -= 400;
    document.getElementById("item9").style.visibility = "hidden";
  } else if(equip == "stone_spear" && inventory_wood >= 150 && inventory_rocks >= 200 && document.getElementById("item4").style.visibility == "hidden"){
    increaseAttack("range");
    inventory_wood -= 150;
    inventory_rocks -= 200;
    document.getElementById("item10").style.visibility = "hidden";
  } else if(equip == "stone_hammer" && inventory_wood >= 100 && inventory_rocks >= 200 && document.getElementById("item5").style.visibility == "hidden"){
    //for building stone stuff
    inventory_wood -= 100;
    inventory_rocks -= 200;
    document.getElementById("item11").style.visibility = "hidden";
  }

  if(slot1 == "rock"){
    document.getElementById("slot1").innerText = inventory_rocks;
  } else if(slot1 == "wood"){
    document.getElementById("slot1").innerText = inventory_wood;
  } else if(slot1 == "berry"){
    document.getElementById("slot1").innerText = inventory_berries;
  }
  if(slot2 == "rock"){
    document.getElementById("slot2").innerText = inventory_rocks;
  } else if(slot2 == "wood"){
    document.getElementById("slot2").innerText = inventory_wood;
  } else if(slot2 == "berry"){
    document.getElementById("slot2").innerText = inventory_berries;
  }
}

var isNight = false;

function nightTime(){
  if(isNight == true){
    for(i = 1; i <= 100; i++){
      for(j = 1; j <= 100; j++){
        var element = "r-" + i + "-" + j;
        if(document.getElementById(element).classList == "rock"){
          document.getElementById(element).style.backgroundColor = "#303030";
        } else if(document.getElementById(element).classList == "tree"){
          document.getElementById(element).style.backgroundColor = "#003400";
        } else if(document.getElementById(element).classList == "bush"){
          document.getElementById(element).style.backgroundImage = "url('Images/night_bush.jpg')";
        } else {
          document.getElementById(element).classList.add("night_grass");
        }
      }
    }
  } else {
    for(i = 1; i <= 100; i++){
      for(j = 1; j <= 100; j++){
        var element = "r-" + i + "-" + j;
        if(document.getElementById(element).classList == "rock"){
          document.getElementById(element).style.backgroundColor = "#808080";
        } else if(document.getElementById(element).classList == "tree"){
          document.getElementById(element).style.backgroundColor = "darkgreen";
        } else if(document.getElementById(element).classList == "bush"){
          document.getElementById(element).style.backgroundImage = "url('Images/bush.jpg')";
        } else {
          document.getElementById(element).classList.remove("night_grass");
        }
      }
    }
  }

  if(isNight == true){
    isNight = false;
  } else {
    isNight = true;
  }
}

var wooden_walls = 0;
var wooden_doors = 0;
var wooden_traps = 0;

function building_purchase(item){
  if(item == "wooden_wall" && inventory_wood >= 800){
    wooden_walls++;
    inventory_wood -= 800;
    collectResource();
  } else if(item == "wooden_door" && inventory_wood >= 1200){
    wooden_doors++;
    inventory_wood -= 1200;
    collectResource();
  } else if(item == "wooden_trap" && inventory_wood >= 1000){
    wooden_traps++;
    inventory_wood -= 1000;
    collectResource();
  }
}

function build(element){
  var temp = element.split("-");
  var row = temp[1];
  var col = temp[2];
  if(wooden_walls >= 1 && document.getElementById(element).classList == ""){
    document.getElementById(element).classList.add("wooden_wall");
    wooden_walls--;
  } else if(wooden_doors >= 1 && document.getElementById(element).classList == ""){
    document.getElementById(element).classList.add("wooden_door");
    wooden_doors--;
  } else if(wooden_traps >= 1 && document.getElementById(element).classList == ""){
    document.getElementById(element).classList.add("wooden_trap");
    wooden_traps--;
  }
}
