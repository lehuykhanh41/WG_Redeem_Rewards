images = [
  {"name":"Sheep SMILE", "src":"img/SheepSMILE.jpg"},
  {"name":"Monkey SMILE", "src":"img/20230106025948.jpg"},
  {"name":"Elephant SMILE", "src":"img/20230106030017.jpg"},
  {"name":"Bat SMILE", "src":"img/20230106030013.jpg"},
  {"name":"Bull SMILE", "src":"img/20230106030039.jpg"},
  {"name": "Lion SMILE", "src":"img/20230106030048.jpg"},
  {"name": "Snake SMILE", "src":"img/20230106025939.jpg"},
  {"name": "Peacock SMILE", "src":"img/20230106025909.jpg"},
  {"name": "Bear SMILE", "src":"img/20230106025934.jpg"},
  {"name": "Tiger SMILE", "src":"img/20230106030044.jpg"},
  {"name": "Alpaca SMILE", "src":"img/20230106030008.jpg"},
  {"name": "Horse SMILE", "src":"img/20230106030022.jpg"},
  {"name": "Scorpion SMILE", "src":"img/20230106025957.jpg"},
  {"name": "Eagle SMILE", "src":"img/20230106030032.jpg"},
  {"name": "Magnet-Magnet Fruit", "src":"img/20230106125129.jpg"}, // Para - 14
  {"name": "Flower-Flower Fruit", "src":"img/20230106125149.jpg"}, // Para
  {"name":"String-String Fruit", "src":"img/20230106125157.jpg"}, // Para
  {"name":"Ope-Ope Fruit", "src":"img/20230106124945.jpg"}, // Para
  {"name":"Dark-Dark Fruit", "src":"img/20230106124707.jpg"}, // Logia - 18
  {"name":"Flame-Flame Fruit", "src":"img/20230106124703.jpg"}, // Logia
  {"name":"Smoke-Smoke Fruit", "src":"img/20230106125154.jpg"}, // Logia
  {"name":"Fish-Fish Fruit, Model: Dragon", "src":"img/20230106124819.jpg"}, // Zoan - 21
  {"name":"Bird-Bird Fruit, Model: Phoenix", "src":"img/20230106030126.jpg"}, // Zoan
  {"name":"Snake-Snake Fruit, Model: Yamata no Orochi", "src":"img/20230106030232.jpg"}, // Zoan
];

//Special= 14 - 23
// Win Chance: 
// Miss: 14 / 25 = 56%;
// Win: 10 / 25 = 40%;
// Jackpot: 1 / 25 = 4%;

let pressed = false;

let codeValue = 0;
imgIndex = 0;
let currName = "";
let DFCount = 0;

function changeImg(){
  document.getElementById("slideshow").src = images[imgIndex].src;
  currName = images[imgIndex].name;
  if(images.length > imgIndex+1){
    imgIndex++;
  } else {
    imgIndex = 0;
  }
}

function startCycle() {

  if (!pressed) {
  let timey = Math.random() * 100 + 2000;
  pressed = true;

  return new Promise(function(resolve, reject) { 
         let s = setInterval(changeImg, 50);
         setTimeout(()=>{clearInterval(s); resolve;}, timey); 
         setTimeout(resolve, timey);

        }).then(function() { 
          currName = images[codeValue].name;
          document.getElementById("slideshow").src = images[codeValue].src;
           if (currName.includes("SMILE")) {
  document.getElementById("Description").innerHTML = "Unfortunately, it's just a SMILE. You don't win anything. Good luck next time.";
} else if (currName.includes("Fruit")){

if (codeValue >= 14 && codeValue <= 17) {
  document.getElementById("Description").innerHTML = "It's a Paramecia. You won a small prize !";
} else if (codeValue >= 18 && codeValue <= 20) {
  document.getElementById("Description").innerHTML = "It's a Logia. You won a medium prize !";
} else if (codeValue >= 21 && codeValue <= 23) {
  document.getElementById("Description").innerHTML = "It's a MYTHICAL ZOAN ! YOU WON A LARGE PRIZE !";
}
} else {
  document.getElementById("Description").innerHTML = "IT'S A JACK POT ! CONTACT THE MODS IMMEDIATELY FOR REWARDS !";
}

document.getElementById("startGacha").innerHTML = "FINISH";
        }); 
}
}

function redeem() {
  let enteredCode = decipher(document.getElementById("codeField").value);
  if (enteredCode === '' || enteredCode > '24') {
    document.getElementById("startGacha").innerHTML = "RE-ENTER";
    document.getElementById("codeField").value = ""
    document.getElementById("codeField").placeholder = "INVALID. ENTER AGAIN:"
  } else {
    codeValue = parseInt(enteredCode);
    document.getElementById("codeScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
  }
}

function decipher(code) {

  let decipheredCode = "";

  if (code.length == 8) {

    if (code[1] === 'm' && code[6] == 'p') {

      decipheredCode += code[2];
      decipheredCode += code[5];
      
    } else if (code[1] === 'v' && code[6] == 'e') {

      decipheredCode += code[0];
      decipheredCode += code[4];
      
    } if (code[1] === 'k' && code[6] == 'c') {

      decipheredCode += code[7];
      decipheredCode += code[3];
      
    }
  } 
  return decipheredCode;
}

function generateValidCode(type) {
  let randomNumber = Math.floor(Math.random() * 3);

  let code = new Array(8);
  let wincode = 0;

  for (let i = 0; i < 8; i++) {
    let success = false;
    let randomChar = Math.floor(48 + Math.random() * 74);
    while (!success) {
      if (randomChar > 122 || (randomChar >= 91 && randomChar <= 96) || (randomChar >= 58 && randomChar <= 64)) {
        randomChar = Math.floor(48 + Math.random() * 74);
      } else {
        success = true;
        code[i] =  String.fromCharCode(randomChar);
      }
    }
  }

  switch (randomNumber) {
    case 0:
      code[1] = 'm';
      code[6] = 'p';
      break;
    
    case 1:
      code[1] = 'v';
      code[6] = 'e';
      break;
    
    case 2:
      code[1] = 'k';
      code[6] = 'c';
  }

  if (type == "win" || type == "W") {
    wincode = (Math.floor(Math.random() * 10) + 14).toString();
  }
  else if (type == "lose" || type == "L") {
    wincode = (Math.floor(Math.random() * 14)).toString();
  }

    switch (randomNumber) {
      case 0:
        if (wincode < 10) {
          code[2] = 0;
          code[5] = wincode[0];
        } else {
          code[2] = wincode[0];
          code[5] = wincode[1];
        }
        break;
      
      case 1:
        if (wincode < 10) {
          code[0] = 0;
          code[4] = wincode[0];
        } else {
          code[0] = wincode[0];
          code[4] = wincode[1];
        }
        break;
      
      case 2:
        if (wincode < 10) {
          code[7] = 0;
          code[3] = wincode[0];
        } else {
          code[7] = wincode[0];
          code[3] = wincode[1];
        }

        console.log("\n" + randomNumber + "\n" + wincode);
  }
  
  let finalCode = "";

  for (let k = 0; k < 8; k++) {
    finalCode += code[k];
  }
  return finalCode;
}

/*
function getCode() {
  console.log(generateValidCode("lose"));
}

getCode();
*/