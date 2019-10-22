const path = require('path')
const fs = require('fs')
const electron = require('electron')
const mvFile = require('move-file');
var shell = require('shelljs');

let isFileMoverRunning = false;

const {
    app,
    BrowserWindow
} = electron;

let toggleOne = document.getElementById('script-one');

toggleOne.addEventListener('click', function () {
    // console.log('3')
    // let python = spawn('python', [path.join(__dirname,'..', 'python_scripts/file_mover.py')])
    // shell.echo(pwd());
    mv('-p',)
    if (isFileMoverRunning) {
        toggleOne.style.backgroundColor = 'salmon ';
    } else {
        toggleOne.style.backgroundColor = 'LightGreen ';
    }

    // var python = require('child_process').spawn('python', ['./python_scripts/file_mover.py']);
    // python.stdout.on('data', function (data) {
    //     console.log("data: ", data.toString('utf8'));
    // });
    // python.stderr.on('data', function (data) {
    //     console.log("data: ", data.toString('utf8'));
    // });
    // isFileMoverRunning = !isFileMoverRunning

});

fs.watch('/Users/siggelabor/Desktop/folder-to/', (eventType, filename) => {
    console.log(eventType);
    if (eventType === 'rename') {
        let category = getCategory(filename);
        fs.rename('/Users/siggelabor/Desktop/folder-to/' + filename, '/Users/siggelabor/Desktop/folder-to/images/' + filename, function (err) {
            if (err){
                throw err;
            } 
        });
    }
});

function getCategory(filename){

}

function moveFile(moveFrom, moveTo) {

    console.log(moveFrom + ' has been moved to ' + moveTo);

}
