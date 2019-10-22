const path = require('path')
const fs = require('fs')
const electron = require('electron')
const {
    app,
    BrowserWindow
} = electron;

let isFileMoverRunning = false;
let toggleOne = document.getElementById('script-one');

toggleOne.addEventListener('click', function () {
    if (isFileMoverRunning) {
        toggleOne.style.backgroundColor = 'salmon ';
    } else {
        toggleOne.style.backgroundColor = 'LightGreen ';
    }
    isFileMoverRunning = !isFileMoverRunning

});

fs.watch('/Users/siggelabor/Desktop/folder-to/', (eventType, filename) => {
    if (isFileMoverRunning) {
        if (eventType === 'rename') {
            let category = getCategory(filename);

            // let user change path
            let moveFrom = `/Users/siggelabor/Desktop/folder-to/${filename}`
            let moveTo = `/Users/siggelabor/Desktop/folder-to/${category}/${filename}`
            fs.rename(moveFrom, moveTo, function (err) {
                if (err) {
                    throw err;
                }
            });
        }
    }
});

function getCategory(filename) {
    let arr = filename.split('.');
    let type = arr[arr.length - 1];
    let category = '';

    // fix const arr with filetypes.
    if (type === 'png' || type === 'jpg') {
        category = 'images'
    }
    return category
}