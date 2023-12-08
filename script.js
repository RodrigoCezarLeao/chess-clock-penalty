// Variable Controls
var clockInterval_teamA;
var clockInterval_teamB;
var teamOfTurn = "teamB";
var isMenuColapsed = true;
var isGamePaused = true;
var isGameStarted = false;
var isGameFinished = true;

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


// Clock Singular Actions Functions
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
    document.getElementById("arrow-A").style.display = "block";
    document.getElementById("arrow-B").style.display = "none";    
  }else if (team === "teamB"){
    document.getElementById("arrow-B").style.display = "block";
    document.getElementById("arrow-A").style.display = "none";    
  }
}

function penaltyTeam(team){
    let penaltyValue = convertTimeToSeconds(getClockTime("time-penalty"));
    let teamValue = convertTimeToSeconds(getClockTime(team));
    let newTeamValue = teamValue > penaltyValue ? teamValue - penaltyValue : 0;
    setClockTime(team, convertSecondsToTime(newTeamValue));
    if(newTeamValue === 0)
      isGameFinished = true;
}

function updatePenaltyCounter(team, reset = false){  
  let element = document.getElementById(team === "teamA" ? "penalties_count_A" : "penalties_count_B");
  element.innerText = reset ? 0 : Number(element.innerText) + 1;
}


// Game Clock Actions
function handleGameClock(){
  if (isGameStarted && isGameFinished){
    alert(translateOnly("alert_game_has_ended"));
    return;
  }

  if (isGameStarted && isGamePaused){
    alert(translateOnly("alert_resume_game_before_continue"));
    return;
  }  

  isGameStarted = true;
  isGameFinished = false;

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
  if (isGameFinished && isGameStarted){
    alert(translateOnly("alert_game_has_ended"));
    return;
  }

  if (isGameStarted){
    if(!isGamePaused){
      pauseClocks();
    }else{
      let teamToResume = teamOfTurn === "teamA" ? "teamB" : "teamA";
      resumeClock(teamToResume);
    }
  }else{
    alert(translateOnly("alert_game_has_not_started"));
    return;
  }
}

function penalty(team){
  if (!isGameFinished){
    pauseClocks();  
    penaltyTeam(team);
    updatePenaltyCounter(team);
  }else {
    if (!isGameStarted)
      alert(translateOnly("alert_game_has_not_started"));
    else 
      alert(translateOnly("alert_game_has_ended"));
    return;
  }
}

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

function resetClockConfigs() {
  pauseClocks();

  // Capturar informações dos Inputs
  let timeA = getClockTime("time-config-teamA");
  let timeB = getClockTime("time-config-teamB");

  // Validar dados
  if (timeA === "" || timeB === "")
    alert(translateOnly("alert_clock_config_not_valid"));

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
  document.getElementById("arrow-A").style.display = "block";
  document.getElementById("arrow-B").style.display = "none";
  colapseMenu();

  updatePenaltyCounter("teamA", true);
  updatePenaltyCounter("teamB", true);

  isGameFinished = true;
  isGamePaused = true;
  isGameStarted = false;
}


function startDefaultClock(){
  document.getElementById("time-config-teamA").value = "05:00";
  document.getElementById("time-config-teamB").value = "05:00";
  document.getElementById("time-penalty").value = "00:45";
  resetClockConfigs();
  pauseClocks();
  changeClockTurnIndication("teamB");
  updatePenaltyCounter("teamA", true);
  updatePenaltyCounter("teamB", true);
  //colapseMenu();
}

startDefaultClock();