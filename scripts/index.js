// import getIsFileMover from "organizeDownloads"
// const child_process = require('child_process');
// child_process.fork('./organizeDownloads.js', [], {
//     env: {
//       ...process.env,
//       ELECTRON_RUN_AS_NODE: 1,
//     },
//     silent: true,
// });
// console.log(child_process)
let isRunning = true;
const orgDown = require('./scripts/organizeDownloads')
let toggleOne = document.getElementById('script-one');
toggleOne.addEventListener('click', function () {
    isRunning = !isRunning
    orgDown.setIsFileMover(isRunning)
    if (isRunning) {
        toggleOne.style.backgroundColor = '#fff';
    } else {
        toggleOne.style.backgroundColor = '#fff3ee';
    }
});