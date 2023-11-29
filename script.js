var clockInterval_teamA;
var clockInterval_teamB;
var teamOfTurn = "teamB";

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

function pauseClocks() {
  if(clockInterval_teamA === undefined && clockInterval_teamB === undefined)
  {
      teamOfTurn = teamOfTurn === "teamA" ? "teamB" : "teamA";
      startClocks();
      return;
  }else {
    pauseClock("teamA");
    pauseClock("teamB");
  }
}

function pauseClock(clock) {
    if (clock === "teamA") {
      clearInterval(clockInterval_teamA);
      clockInterval_teamA = undefined;
    } else if (clock === "teamB") {
      clearInterval(clockInterval_teamB);
      clockInterval_teamB = undefined;
    }
}


function startClocks() {
  if (teamOfTurn === "teamB" && clockInterval_teamB === undefined) {
    let aux = teamOfTurn.toString();
    clockInterval_teamB = setInterval(() => updateClock(aux), 1000);
    pauseClock("teamA");
    teamOfTurn = "teamA";
    document.getElementById("arrow-B").style.visibility = "visible";
    document.getElementById("arrow-A").style.visibility = "hidden";
  } else if (teamOfTurn === "teamA" && clockInterval_teamA === undefined) {
    let aux = teamOfTurn.toString();
    clockInterval_teamA = setInterval(() => updateClock(aux), 1000);
    pauseClock("teamB");
    teamOfTurn = "teamB";
    document.getElementById("arrow-A").style.visibility = "visible";
    document.getElementById("arrow-B").style.visibility = "hidden";
  }
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

function resetClockConfigs() {
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
}


document.getElementById("time-config-teamA").value = "05:00";
document.getElementById("time-config-teamB").value = "05:00";
resetClockConfigs();