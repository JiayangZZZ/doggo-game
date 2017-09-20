
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('Game');
var range = sheet.getRange("A1:Q17");
var windowColor = sheet.getRange("S9:U9").getCell(1,1),
    windowRow = sheet.getRange("S9:U9").getCell(1,2),
    windowColumn = sheet.getRange("S9:U9").getCell(1,3);
var health = sheet.getRange("S3:S3").getCell(1,1);
var bucket = sheet.getRange("S5:S5").getCell(1,1);
var tools = sheet.getRange("V3:V3").getCell(1,1);
var bonesTotal = sheet.getRange("B19:B19").getCell(1,1);
var bonesLeft = sheet.getRange("E19:E19").getCell(1,1);
var text = sheet.getRange("S8:S8").getCell(1,1);

function myFunction() {

}

//UP BUTTON
function up() {
  if(windowRow.getValue() > 1) {
    windowRow.setValue(windowRow.getValue()-1);
    highlight();
    windowColor.setBackground(show(windowRow.getValue()+1, windowColumn.getValue()+1));
    if(flower(windowRow.getValue(), windowColumn.getValue())) {
      damage(3);
    } else{
      damage(1);
    }
    home();
  }
  else {
    text.setValue("Nope it's fence. Good boy never run off.");
  }
}

//DOWN BUTTON
function down() {
  if(windowRow.getValue() < 15) {
    windowRow.setValue(windowRow.getValue()+1);
    highlight();
    windowColor.setBackground(show(windowRow.getValue()+1, windowColumn.getValue()+1));
    if(flower(windowRow.getValue(), windowColumn.getValue())) {
      damage(3);
    } else{
      damage(1);
    }
    home();
  }
  else {
    text.setValue("Nope it's fence. Good boy never run off.");
  }
}

//LEFT BUTTON
function left() {
  if(windowColumn.getValue() > 1) {
    windowColumn.setValue(windowColumn.getValue()-1);
    highlight();
    windowColor.setBackground(show(windowRow.getValue()+1, windowColumn.getValue()+1));
    if(flower(windowRow.getValue(), windowColumn.getValue())) {
      damage(3);
    } else{
      damage(1);
    }
    home();
  }
  else {
    text.setValue("Nope it's fence. Good boy never run off.");
  }
}

//RIGHT BUTTON
function right() {
  if(windowColumn.getValue() < 15) {
    windowColumn.setValue(windowColumn.getValue()+1);
    highlight();
    windowColor.setBackground(show(windowRow.getValue()+1, windowColumn.getValue()+1));
    if(flower(windowRow.getValue(), windowColumn.getValue())) {
      damage(3);
    } else{
      damage(1);
    }
    home();
  }
  else {
    text.setValue("Nope it's fence. Good boy never run off.");
  }
}

//SHOW CURRENT DIRT COLOR
function show(row, column) {
  if(range.getCell(row, column).getValue() == 1 ||
    range.getCell(row+1, column).getValue() == 1 ||
    range.getCell(row+1, column+1).getValue() == 1 ||
      range.getCell(row+1, column-1).getValue() == 1 ||
        range.getCell(row-1, column).getValue() == 1 ||
          range.getCell(row-1, column+1).getValue() == 1 ||
            range.getCell(row-1, column-1).getValue() == 1 ||
              range.getCell(row, column+1).getValue() == 1 ||
                range.getCell(row, column-1).getValue() == 1) {
    return "#cc4125";
  }
  else if(range.getCell(row, column).getValue() == 10 ||
    range.getCell(row+1, column).getValue() == 10 ||
    range.getCell(row+1, column+1).getValue() == 10 ||
      range.getCell(row+1, column-1).getValue() == 10 ||
        range.getCell(row-1, column).getValue() == 10 ||
          range.getCell(row-1, column+1).getValue() == 10 ||
            range.getCell(row-1, column-1).getValue() == 10 ||
              range.getCell(row, column+1).getValue() == 10 ||
                range.getCell(row, column-1).getValue() == 10) {
    return "#8d2c19";
  }
  else {
    return "#dba704";
  }
}

//DEAL DAMAGE
function damage(d) {
  var healthValue = health.getValue();
  healthValue = healthValue - d;
  
  if(healthValue <= 0 ) {
    Browser.msgBox("Nooooo00000o DIED!!!!!!!");
  }
  else {
    health.setValue(healthValue);
  }
}

//DIG
function dig() {
  damage(1);
  var cell = range.getCell(windowRow.getValue()+1, windowColumn.getValue()+1);
  cell.setBackground("#ffffff");
  skeleton(cell);
  if(cell.getValue() == 1) {
    bucket.setValue(bucket.getValue()+1);
    bonesLeft.setValue(bonesLeft.getValue()-1);
    text.setValue("Found a bone! Imma good boyyyy");
    win();
    cell.setValue(0);
  }
  if(tools.getValue() > 0) {
    var cellLeft = range.getCell(windowRow.getValue()+1, windowColumn.getValue());
    var cellRight = range.getCell(windowRow.getValue()+1, windowColumn.getValue()+2);
    cellLeft.setBackground('#ffffff');
    cellRight.setBackground('#ffffff');
    if(cellLeft.getValue() == 1) {
      bucket.setValue(bucket.getValue()+1);
      bonesLeft.setValue(bonesLeft.getValue()-1);
      text.setValue("Found a bone! Imma good boyyyy");
      win();
      cellLeft.setValue(0);
    }
    if(cellRight.getValue() == 1) {
      bucket.setValue(bucket.getValue()+1);
      bonesLeft.setValue(bonesLeft.getValue()-1);
      text.setValue("Found a bone! Imma good boyyyy");
      win();
      cellRight.setValue(0);
    }
    else {
      text.setValue("Wooo, nice shovel. Luv it!");
    }
    tools.setValue(tools.getValue()-1);
  }
}

//SKELETON
function skeleton(cell) {
  if(cell.getValue() == 10) {
    damage(10);
    text.setValue("Look what you digged up. It's a skeleton! Neighbor saw it, recognized was his missing wife. OMG did hooman kill the annoying b and bury her in the yard? Anyway neighbor shot you in butt.")
    bucket.setValue(getValue()+1);
    win();
  }
  else {
    return;
  }
}

//RESET ENV
function reset() {
  sheet.getRange("B2:P16").setBackground("#38761d");
  sheet.getRange("B2:P16").setValue(0);
  bucket.setValue(0);
  windowColor.setBackground("#ffffff");
  windowRow.setValue(1);
  windowColumn.setValue(1);
  health.setValue(30);
  tools.setValue(0);
  range.setBorder(false, false, false, false, false, false);
  range.getCell(2, 2).setBorder(true, true, true, true, true, true, "#ffffff", SpreadsheetApp.BorderStyle.SOLID_THICK);
  text.setValue("Go dig around!");
}

//RESET LEVEL 1
function resetL1() {
  reset();
  var boneSpots = [[3,3],[4,13],[7,7],[15,13],[8,14]];
  var skeletonSpot = [12,10];
  for(var i=0; i<boneSpots.length; i++) {
    range.getCell(boneSpots[i][0]+1,boneSpots[i][1]+1).setValue(1);
  }
  range.getCell(skeletonSpot[0], skeletonSpot[1]).setValue(10);
  bonesTotal.setValue(sheet.getRange("B20:B20").getCell(1, 1).getValue());
  bonesLeft.setValue(bonesTotal.getValue());
}

//RESET LEVEL 2
function resetL2() {
  reset();
  var boneSpots = [[3,4],[4,11],[2,11],[7,4],[12,6],[8,7],[10,9],[15,12],[6,14]];
  var skeletonSpot = [10,10];
  var flowerSpots = [[3,1],[4,1],[5,1],[13,1],[13,2],[13,3],[1,8],[2,8],[3,8],[4,8],[10,12],[10,13],[10,14]];
  for(var i=0; i<boneSpots.length; i++) {
    range.getCell(boneSpots[i][0]+1,boneSpots[i][1]+1).setValue(1);
  }
  range.getCell(skeletonSpot[0], skeletonSpot[1]).setValue(10);
  for(var j=0; j<flowerSpots.length; j++) {
    range.getCell(flowerSpots[j][0]+1,flowerSpots[j][1]+1).setValue("f");
    range.getCell(flowerSpots[j][0]+1,flowerSpots[j][1]+1).setBackground("#ea5ca7");
  }
  bonesTotal.setValue(sheet.getRange("B20:B20").getCell(1, 1).getValue());
  bonesLeft.setValue(bonesTotal.getValue());
}

//HIGHLIGHT
function highlight() {
  range.setBorder(false, false, false, false, false, false);
  range.getCell(windowRow.getValue()+1, windowColumn.getValue()+1).setBorder(true, true, true, true, true, true, "#ffffff", SpreadsheetApp.BorderStyle.SOLID_THICK);
}

//EAT
function eat() {
  if(bucket.getValue() > 0) {
    health.setValue(health.getValue()+8);
    bucket.setValue(bucket.getValue()-1);
  }
  else {
    text.setValue("No bone in the bucket...QAQ");
  }
}

//TRADE
function trade() {
  if(bucket.getValue() > 0) {
    bucket.setValue(bucket.getValue()-1);
    tools.setValue(tools.getValue()+1);
  }
  else {
    text.setValue("No bone in the bucket...QAQ");
  }
}

//HOME
function home() {
  if(windowRow.getValue() == 1 && windowColumn.getValue() == 1) {
    health.setValue(30);
  }
}

//FLOWER
function flower(row, column) {
  if(range.getCell(row+1, column+1).getValue() == 'f') {
    text.setValue("OH NO. Stepped on hooman's flowers. Bad boyyyyyy! Hooman hit your bott with newspaper roll.");
    return true;
  } else{
    return false;
  }
}

//WIN
function win() {
  if(bonesLeft.getValue() == 0) {
    Browser.msgBox("AHHH WONNNNNNN!");
  }
}