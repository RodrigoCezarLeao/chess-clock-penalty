var clockInterval;

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
  clearInterval(clockInterval);
}

function startClocks() {
  clockInterval = setInterval(() => updateClock(), 1000);
}

function updateClock() {
  // Capturar informações dos relógios
  let timeA = getClockTime("teamA");
  let timeB = getClockTime("teamB");

  // Converter para segundos numéricos
  let timeA_seconds = convertTimeToSeconds(timeA);
  let timeB_seconds = convertTimeToSeconds(timeB);

  // Subtrair 1 segundo
  timeA_seconds--;
  timeB_seconds--;

  // Converter para tempo formatado
  let timeA_formatted = convertSecondsToTime(timeA_seconds);
  let timeB_formatted = convertSecondsToTime(timeB_seconds);

  // Atualizar no relógio
  setClockTime("teamA", timeA_formatted);
  setClockTime("teamB", timeB_formatted);
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
