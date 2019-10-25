const path = require('path')
const fs = require('fs')
const electron = require('electron')
const {
    app,
    BrowserWindow,
    dialog
} = electron;

let isFileMoverRunning = true;
let toggleOne = document.getElementById('script-one');
let baseFolder = `/Users/siggelabor/Desktop/folder-to/`;

let labelBasePath = document.getElementById('orgDownBasePath');
labelBasePath.innerHTML = (baseFolder);
let labelBasePathInput = document.getElementById('orgDownBasePathInput')
// toggleOne.addEventListener('click', function () {
//     isFileMoverRunning = !isFileMoverRunning
//     if (isFileMoverRunning) {
//         toggleOne.style.backgroundColor = '#fff';
//     } else {
//         toggleOne.style.backgroundColor = '#fff3ee';
//     }

// });

labelBasePath.addEventListener('click', () => {


    // dialog.showOpenDialog(mainWindow, {
    //     properties: ['openDirectory']
    // })


    labelBasePathInput.click()
    labelBasePathInput.onchange = function (e) {
        labelBasePath.innerHTML = labelBasePathInput.value

    }

})






fs.watch('/Users/siggelabor/Desktop/folder-to/', (eventType, file) => {
    if (isFileMoverRunning) {
        if (eventType === 'rename') {
            let filename = file;
            let category = getCategory(file);
            let moveFrom = `${baseFolder}${filename}`
            let moveTo = `${baseFolder}${category}/${filename}`

            moveFile(moveFrom, moveTo, filename, category);
        }
    }
});

function moveFile(from, to, filename, cat) {

    doesFileExist(to, exists => {
        if (exists) {
            newFileName(from, to, filename, cat);
        } else {
            renameFile(from, to)
        }
    })
}

function newFileName(moveFrom, moveTo, filename, cat) {

    let newName = `${filename.split('.')[0]}-${getRandomID()}.${filename.split('.')[1]}`

    doesFileExist(path + '/' + newName, callback => {
        if (!callback) {
            moveTo = `/Users/siggelabor/Desktop/folder-to/${cat}/${newName}`
            renameFile(moveFrom, moveTo)
        }
    })
}

function renameFile(moveFrom, moveTo) {
    fs.rename(moveFrom, moveTo, function (err) {
        if (err) {
            throw err;
        }
    });
}

function doesFileExist(moveTo, callback) {
    fs.exists(moveTo, (exi) => {
        if (exi) {
            callback(true)
        } else {
            callback(false)
        }
    });
}

function getRandomID(len = 3, chars = 'abcdefghjkmnopqrstwxyz0123456789') {
    let id = '';
    while (len--) {
        id += chars[Math.random() * chars.length | 0];
    }
    return id;
}


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