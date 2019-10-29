/*

TODO:

• connect category dom elements to object maybe?
    - Then run eventlistener in loop, no need for ID and 
    makes adding cat easier perhaps.

• remove category

• add/remove filetypes in categories.



*/


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
        filetypes: ['zip', 'rar']
    },
    {
        category: 'Documents',
        filetypes: ['pdf', 'html', 'xml']
    },
    {
        category: 'Audio',
        filetypes: ['waw', 'mp3']
    },
    {
        category: 'Video',
        filetypes: ['mov', 'mp4']
    },
]


let isFileMoverRunning = true;
let toggleOne = document.getElementById('script-one');
let baseFolder = `/Users/siggelabor/Desktop/folder-to/`;
let watcher = chokidar.watch(baseFolder, {
    persistent: true
});

let orgDownCatAdd = document.getElementById('orgDoCatAdd')
let orgDownCatInput = document.getElementById('orgDownCatInput')

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
        folderCheck()
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

function doesFileExist(file, callback) {
    fs.exists(file, (exi) => {
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
    let type = arr[arr.length - 1].toLowerCase();
    let category = categories.filter(obj => {
        return obj.filetypes.includes(type)
    })[0].category
    return category
}

function getCategoryFromFileType(type) {
    let category = categories.filter(obj => {
        return obj.filetypes.includes(type)
    })[0].category
    return category;
}


/*
        PLEASE FIND BETTER SOLUTION
*/
let catHeading = document.getElementById('ord-down-cat-heading')
document.getElementById('orgDoCatImages').addEventListener('click', () => {
    updateOrgDownPrefContent(categories[0].filetypes)
    changeCatHeading('Images')
})
document.getElementById('orgDoCatZips').addEventListener('click', () => {
    updateOrgDownPrefContent(categories[1].filetypes)
    changeCatHeading('Zips')
})
document.getElementById('orgDoCatDocuments').addEventListener('click', () => {
    updateOrgDownPrefContent(categories[2].filetypes)
    changeCatHeading('Documents')
})
document.getElementById('orgDoCatAudio').addEventListener('click', () => {
    updateOrgDownPrefContent(categories[3].filetypes)
    changeCatHeading('Audio')
})
document.getElementById('orgDoCatVideo').addEventListener('click', () => {
    updateOrgDownPrefContent(categories[4].filetypes)
    changeCatHeading('Video')
})

function changeCatHeading(cat){
    catHeading.innerHTML = `Categories<span class="makeGray">/${cat}</span>`
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

function createNewCategory(category) {
    let DOMCategories = document.getElementById('org-down-pref-categories')
    categories.push({
        category: category
    })
    let h3 = document.createElement('H3')
    let txtNode = document.createTextNode(category)
    h3.classList.add('org-down-pref__categories-item')
    h3.appendChild(txtNode)
    DOMCategories.appendChild(h3)

    orgDownCatInput.style.display = 'none'
    orgDownCatAdd.style.display = 'block'
}

function updateOrgDownPrefContent(fileTypes) {
    prefContent.innerHTML = ''
    // let fileTypes = categories[0].filetypes
    let isRed = []
    let fileTypeAdd = document.getElementById('orgDoFileTypeAdd')
    let fileTypeInput = document.getElementById('orgDoFileTypeInput')

    console.log(fileTypes);
    for (let i = 0; i < fileTypes.length; i++) {
        let p = document.createElement('P')
        let fileType = document.createTextNode(`.${fileTypes[i]}`)
        isRed.push(false)
        p.appendChild(fileType)
        p.addEventListener('click', () => {
            if (isRed[i]) {
                prefContent.childNodes[i].remove()
                let cat = getCategoryFromFileType(fileTypes[i])
                let types = categories.find(c => c.category === cat).filetypes.splice(categories.find(c => c.category === cat).filetypes.indexOf(fileTypes[i]), 1);
            } else {
                p.style.backgroundColor = 'red';
                p.innerHTML = 'DELETE'
                p.style.color = '#fff'
                p.style.textAlign = 'center'
                isRed[i] = true;
            }
        })
        prefContent.appendChild(p);
    }
    fileTypeAdd.style.display = 'block'

    fileTypeAdd.addEventListener('click', () => {
        fileTypeAdd.style.display = 'none'
        fileTypeInput.style.display = 'block'
        fileTypeInput.focus()
    })
    
    fileTypeInput.addEventListener("focusout", () => {
    
        if (fileTypeInput.value.length === 0) {
    
            fileTypeInput.style.display = 'none'
            fileTypeAdd.style.display = 'block'
        }
    });
}



orgDownCatAdd.addEventListener('click', () => {
    orgDownCatAdd.style.display = 'none'
    orgDownCatInput.style.display = 'block'
    orgDownCatInput.focus()
})

orgDownCatInput.addEventListener("focusout", () => {

    if (orgDownCatInput.value.length === 0) {

        orgDownCatInput.style.display = 'none'
        orgDownCatAdd.style.display = 'block'
    }
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && orgDownCatInput === document.activeElement && orgDownCatInput.value.length !== 0) {
        createNewCategory(orgDownCatInput.value);
        orgDownCatInput.value = ''
    }
})