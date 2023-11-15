let timeTeamA = 180;
let timeTeamB = 180;

let intervalTeamA;
let intervalTeamB;



const resumeTeamA = () => {
    intervalTeamA = setInterval(() => {
        timeTeamA--;
        console.log(timeTeamA);
    }, 1000);    
}