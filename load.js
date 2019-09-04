function createTable(){
  createTDs();
  var table = createTRs();
  document.getElementById("everything").innerHTML = table;
  addAssets();
  onclickEverything();
}

var tds = [];

function createTDs(){
  for(i = 1; i <= 100; i++){
    for(j = 1; j <= 100; j++){
      var id = "r-" + i + "-" + j;
      var element = "<td id='" + id + "'></td>";
      tds.push(element);
    }
  }
}

var trs = [];

function createTRs(){
  for(i = 0; i < 100; i++){
    var tempTds = [];
    for(j = 0 + (100 * i); j < 100 + (100 * i); j++){
      var element = tds[j];
      tempTds.push(element);
    }
    tempTds = tempTds.join("");
    var element = "<tr>" + tempTds + "</tr>";
    trs.push(element);
  }
  return trs.join("");
}

function addAssets(){
  document.getElementById("r-8-8").classList.add("player");
  for(i = 0; i < rocks.length; i++){
    document.getElementById(rocks[i]).classList.add("rock");
  }
  for(j = 0; j < trees.length; j++){
    document.getElementById(trees[j]).classList.add("tree");
  }
  for(k = 0; k < bushes.length; k++){
    document.getElementById(bushes[k]).classList.add("bush");
  }
  for(l = 0; l < cows.length; l++){
    var element = cows[l].split(",");
    document.getElementById(element[1]).classList.add(element[0]);
    document.getElementById(element[1]).innerText = 1500;
  }
}

function onclickEverything(){
  for(i = 1; i <= 100; i++){
    for(j = 1; j <= 100; j++){
      var element = "r-" + i + "-" + j;
      document.getElementById(element).setAttribute("onclick","build('" + element + "')");
    }
  }
}

window.setInterval(function(){
  nightTime();
}, 120000);
