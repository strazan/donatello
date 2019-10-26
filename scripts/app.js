const path = require('path')
const fs = require('fs')
const electron = require('electron')
const chokidar = require('chokidar');

const {
    app,
    BrowserWindow,
    dialog
} = electron;

let prefContent = document.getElementById('org-down-pref__content');

let categories = [{
        category: 'Images',
        filetypes: ['jpg', 'png', 'tiff']
    },
    {
        category: 'Zips',
        filetypes: ['zip']
    },
    {
        category: 'Documents',
        filetypes: ['pdf']
    },
]


let isFileMoverRunning = true;
let toggleOne = document.getElementById('script-one');
let baseFolder = `/Users/siggelabor/Desktop/folder-to/`;
let watcher = chokidar.watch(baseFolder, {
    persistent: true
});

watcherSetUp(watcher);

let labelBasePath = document.getElementById('orgDownBasePath');
labelBasePath.innerHTML = baseFolder;
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
    labelBasePathInput.click()
    labelBasePathInput.onchange = function (e) {
        baseFolder = labelBasePathInput.files[0].path + '/';
        labelBasePath.innerHTML = baseFolder;
        watcher = chokidar.watch(baseFolder, {
            persistent: true
        });
        watcherSetUp(watcher);
    }
})

function watcherSetUp(watcher) {

    watcher.on('ready', () => {

        console.log(`Download Organizer- watcher listening to: ${watcher._closers.keys().next().value}`)
        watcher.on('add', file => {
            if (isFileMoverRunning) {

                let filename = file.split('/')[(file.split('/').length) - 1];
                let category = getCategory(file);
                let moveFrom = `${baseFolder}${filename}`
                let moveTo = `${baseFolder}${category}/${filename}`

                moveFile(moveFrom, moveTo, filename, category);
            }

        });
    })
}

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
    moveTo = `${baseFolder}${cat}/${newName}`

    doesFileExist(moveTo, callback => {
        if (!callback) {
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

document.getElementById('orgDoCatImages').addEventListener('click', () => {
    updateOrgDownPrefContent(categories[0].filetypes)
})
document.getElementById('orgDoCatZips').addEventListener('click', () => {
    updateOrgDownPrefContent(categories[1].filetypes)
})
document.getElementById('orgDoCatDocuments').addEventListener('click', () => {
    updateOrgDownPrefContent(categories[2].filetypes)
})

function updateOrgDownPrefContent(fileTypes){
    prefContent.innerHTML = ''
    // let fileTypes = categories[0].filetypes
    for(let i = 0; i < fileTypes.length; i++){
        let p = document.createElement('P')
        let fileType = document.createTextNode(`.${fileTypes[i]}`)
        p.appendChild(fileType)
        prefContent.appendChild(p);
    }
}