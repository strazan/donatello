const process = require('process');
const fs = require('fs')
const chokidar = require('chokidar');

let baseFolder = `/Users/siggelabor/Desktop/folder-to/`;
// export 
var isFileMover = true;

// function getIsFileMover(){
//     return isFileMover
// }

let categories = [{
        category: 'Images',
        filetypes: ['jpg', 'png', 'tiff']
    },
    {
        category: 'Zips',
        filetypes: ['zip', 'rar']
    },
    {
        category: 'Documents',
        filetypes: ['pdf', 'html', 'xml']
    },
    {
        category: 'Audio',
        filetypes: ['wav', 'mp3', 'aif', 'aiff']
    },
    {
        category: 'Video',
        filetypes: ['mov', 'mp4']
    },
]

// function addCategory(name, filetypes) {
//     categories.push('');
// }

let watcher = chokidar.watch(baseFolder, {
    persistent: true
});

watcherSetUp(watcher);

function doesFileExist(file, callback) {
    fs.exists(file, (exi) => {
        if (exi) {
            callback(true)
        } else {
            callback(false)
        }
    });
}

function folderCheck() {
    for (let index = 0; index < categories.length; index++) {
        const category = categories[index].category;
        fs.exists(baseFolder + category, (exi) => {
            if (!exi) {
                fs.mkdir(baseFolder + category.toLowerCase(), {
                    recursive: true
                }, (err) => {
                    if (err) throw err;
                });
            }
        });
    }
}

function findCategory(filename) {
    let arr = filename.split('.');
    let type = arr[arr.length - 1].toLowerCase();
    let category = categories.filter(obj => {
        return obj.filetypes.includes(type)
    })[0].category
    return category
}

// function getCategoryFromFileType(type) {
//     let category = categories.filter(obj => {
//         return obj.filetypes.includes(type)
//     })[0].category
//     return category;
// }
// function getBaseFolder() {
//     return baseFolder
// }

function getRandomID(len = 3, chars = 'abcdefghjkmnopqrstwxyz0123456789') {
    let id = '';
    while (len--) {
        id += chars[Math.random() * chars.length | 0];
    }
    return id;
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

function setIsFileMover(isRunning){
    isFileMover = isRunning
}

function setWatcher(folder){
    watcher = chokidar.watch(folder, {
        persistent: true
    });
    watcherSetUp(watcher);
}

function watcherSetUp(watcher) {

    watcher.on('ready', () => {

        console.log(`Download Organizer- watcher listening to: ${watcher._closers.keys().next().value}`)
        folderCheck()
        console.log(isFileMover)
        watcher.on('add', file => {
            if (isFileMover) {
                console.log(isFileMover)
                let filename = file.split('/')[(file.split('/').length) - 1];
                let category = findCategory(file);
                let moveFrom = `${baseFolder}${filename}`
                let moveTo = `${baseFolder}${category}/${filename}`

                moveFile(moveFrom, moveTo, filename, category);
            }

        });
    })
}

module.exports = {
    categories: categories,
    baseFolder: baseFolder,
    setIsFileMover: setIsFileMover,
    setWatcher: setWatcher,
}