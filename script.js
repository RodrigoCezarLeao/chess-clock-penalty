// Variable Controls
var clockInterval_teamA;
var clockInterval_teamB;
var teamOfTurn = "teamB";
var isMenuColapsed = true;
var isGamePaused = true;
var isGameStarted = false;

// Clock Helper Functions
function getClockTime(id) {
  let element = document.getElementById(id);

  if (element.localName === "div") return element.innerText;
  else if (element.localName === "input") return element.value;
}

function setClockTime(id, time) {
  document.getElementById(id).innerText = time;
}

function convertTimeToSeconds(time) {
  return Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]);
}

function convertSecondsToTime(seconds) {
  return (
    (Math.trunc(seconds / 60) + "").padStart(2, "0") +
    ":" +
    ((seconds % 60) + "").padStart(2, "0")
  );
}


// Clock Actions Functions
function pauseClock(team) {
    if (team === "teamA") {
      clearInterval(clockInterval_teamA);
      clockInterval_teamA = undefined;
    } else if (team === "teamB") {
      clearInterval(clockInterval_teamB);
      clockInterval_teamB = undefined;
    }
}

function pauseClocks() {  
  pauseClock("teamA");
  pauseClock("teamB");
  isGamePaused = true;
}

function updateClock(team) {
  if (team === "teamB") {
    let timeB = getClockTime("teamB");
    let timeB_seconds = convertTimeToSeconds(timeB);
    timeB_seconds--;
    let timeB_formatted = convertSecondsToTime(timeB_seconds);
    setClockTime("teamB", timeB_formatted);
  } else if (team === "teamA") {
    let timeA = getClockTime("teamA");
    let timeA_seconds = convertTimeToSeconds(timeA);
    timeA_seconds--;
    let timeA_formatted = convertSecondsToTime(timeA_seconds);
    setClockTime("teamA", timeA_formatted);
  }
}

function resumeClock(team){
  isGamePaused = false;
  if (team === "teamA" && clockInterval_teamA === undefined) {
    clockInterval_teamA = setInterval(() => updateClock("teamA"), 1000);    
  } else if (team === "teamB" && clockInterval_teamB === undefined) {
    clockInterval_teamB = setInterval(() => updateClock("teamB"), 1000);
  }
}

function changeClockTurnIndication(team){
  if (team === "teamA"){
    document.getElementById("arrow-A").style.visibility = "visible";
    document.getElementById("arrow-B").style.visibility = "hidden";
  }else if (team === "teamB"){
    document.getElementById("arrow-B").style.visibility = "visible";
    document.getElementById("arrow-A").style.visibility = "hidden";    
  }
}

function handleGameClock(){
  if (isGameStarted && isGamePaused){
    alert("Resume game before continue!");
    return;
  }

  isGameStarted = true;

  if(teamOfTurn === "teamB"){
    pauseClock("teamA");
    changeClockTurnIndication("teamB");
    resumeClock("teamB");
    teamOfTurn = "teamA";
  }else if(teamOfTurn === "teamA"){
    pauseClock("teamB");
    changeClockTurnIndication("teamA");
    resumeClock("teamA");
    teamOfTurn = "teamB";
  }
}

function pauseResumeClock(){
  if (isGameStarted){
    if(!isGamePaused){
      pauseClocks();
    }else{
      let teamToResume = teamOfTurn === "teamA" ? "teamB" : "teamA";
      resumeClock(teamToResume);
    }
  }else{
    alert("The game has not started!")
  }
}



// Refatorar
function resetClockConfigs() {
  pauseClocks();

  // Capturar informações dos Inputs
  let timeA = getClockTime("time-config-teamA");
  let timeB = getClockTime("time-config-teamB");

  // Validar dados
  if (timeA === "" || timeB === "")
    window.alert("Os valores definidos para os relógios não são válidos!");

  // Tratar dados recebidos
  let timeA_seconds = convertTimeToSeconds(timeA);
  let timeB_seconds = convertTimeToSeconds(timeB);

  // Converter os dados para apresentar (formatar)
  let timeA_formatted = convertSecondsToTime(timeA_seconds);
  let timeB_formatted = convertSecondsToTime(timeB_seconds);

  // Atualizar na tela
  setClockTime("teamA", timeA_formatted);
  setClockTime("teamB", timeB_formatted);

  teamOfTurn = "teamB";
  document.getElementById("arrow-A").style.visibility = "visible";
  document.getElementById("arrow-B").style.visibility = "hidden";
  colapseMenu();
}


document.getElementById("time-config-teamA").value = "05:00";
document.getElementById("time-config-teamB").value = "05:00";
resetClockConfigs();
pauseClocks();
colapseMenu();
changeClockTurnIndication("teamB");



// General Configs Functions

function colapseMenu(){
  isMenuColapsed = !isMenuColapsed;

  if(isMenuColapsed){
    document.getElementById("colapse").innerHTML = "&darr;";
    document.getElementsByTagName("header")[0].style.display = "none";
  }else{
    document.getElementById("colapse").innerHTML = "&uarr;";
    document.getElementsByTagName("header")[0].style.display = "block";
  }
}

