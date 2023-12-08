var language = "pt-br";
// var language = "en-us";

const intl = {
    "config_h2": {
        "pt-br": "Configuração do relógio",
        "en-us": "Clock config",
    },
    "clock_config_A": {
        "pt-br": "Tempo relógio A",
        "en-us": "Team A clock time",
    },
    "clock_config_B": {
        "pt-br": "Tempo relógio B",
        "en-us": "Team B clock time",
    },
    "clock_config_penalty": {
        "pt-br": "Tempo penalidade",
        "en-us": "Penalty time",
    },
    "clock_config_submit": {
        "pt-br": "Aplicar",
        "en-us": "Reset",
    },
    "team_A_name": {
        "pt-br": "Time A",
        "en-us": "Team A",
    },
    "team_B_name": {
        "pt-br": "Time B",
        "en-us": "Team B",
    },
    "penalties_A": {
        "pt-br": "Penalidades: ",
        "en-us": "Penalties: ",
    },
    "penalties_B": {
        "pt-br": "Penalidades: ",
        "en-us": "Penalties: ",
    },
    "alert_game_has_ended": {
        "pt-br": "O jogo terminou!",
        "en-us": "The game has finished!",
    },
    "alert_game_has_not_started": {
        "pt-br": "O jogo ainda não começou!",
        "en-us": "The game has not started!",
    },
    "alert_resume_game_before_continue": {
        "pt-br": "Retome o jogo antes de continuar!",
        "en-us": "Resume game before continue!",
    },
    "alert_clock_config_not_valid": {
        "pt-br": "Os valores definidos para os relógios não são válidos!",
        "en-us": "Defined values are not valid for clock config!",
    },
    "": {
        "pt-br": "",
        "en-us": "",
    },
}

function translate(key){
    return document.getElementById(key).innerText = intl[key][language];
}

function translateOnly(key){
    return intl[key][language];
}


function renderLanguage(){
    for(let i of Object.keys(intl)){
        try{
            translate(i);
        }catch(e){
            // console.error(`Key: ${i}, error = ${e}`)
        }
    }
}

function changeLanguage(lang){
    language = lang;
    renderLanguage();
}

renderLanguage();