const path = require('path')

const electron = require('electron');
// const chokidar = require('chokidar');
// const main = require('scripts/main.js')
// console.log(require('./main'))
const {
    app,
    BrowserWindow,
    dialog
} = electron;

const orgdown = require('./scripts/organizeDownloads')
// const addCategory = require('./organizeDownloads.js').addCategory;

// let baseFolder = organizeDownloads.getBaseFolder
let prefContent = document.getElementById('org-down-pref__content');

// let isFileMoverRunning = true;



let orgDownCatAdd = document.getElementById('orgDoCatAdd')
let orgDownCatInput = document.getElementById('orgDownCatInput')
let fileTypeInput = document.getElementById('orgDoFileTypeInput')
let fileTypeAddDiv = document.getElementById('orgDoFileTypeAddDot')

let activeCategory;

// let labelBasePath; // = document.getElementById('orgDownBasePath');
// labelBasePath.innerHTML = organizeDownloads.baseFolder;
// let labelBasePathInput; // = document.getElementById('orgDownBasePathInput')



let labelBasePath = document.getElementById('orgDownBasePath');
labelBasePath.innerHTML = orgdown.baseFolder;
let labelBasePathInput = document.getElementById('orgDownBasePathInput')

labelBasePath.addEventListener('click', () => {
    labelBasePathInput.click()
    labelBasePathInput.onchange = function (e) {
        baseFolder = labelBasePathInput.files[0].path + '/';
        labelBasePath.innerHTML = orgdown.baseFolder;

        orgdown.baseFolder = baseFolder
        orgdown.setWatcher(orgdown.baseFolder)
    }
})


/* MAKE BETTER */
document.getElementById('orgDoCatImages').addEventListener('click', () => {
    updateOrgDownPrefContent(orgdown.categories[0].filetypes)
    changeCatHeading('Images')
})
document.getElementById('orgDoCatZips').addEventListener('click', () => {
    updateOrgDownPrefContent(orgdown.categories[1].filetypes)
    changeCatHeading('Zips')
})
document.getElementById('orgDoCatDocuments').addEventListener('click', () => {
    updateOrgDownPrefContent(orgdown.categories[2].filetypes)
    changeCatHeading('Documents')
})
document.getElementById('orgDoCatAudio').addEventListener('click', () => {
    updateOrgDownPrefContent(orgdown.categories[3].filetypes)
    changeCatHeading('Audio')
})
document.getElementById('orgDoCatVideo').addEventListener('click', () => {
    updateOrgDownPrefContent(orgdown.categories[4].filetypes)
    changeCatHeading('Video')
})



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


/*
        PLEASE FIND BETTER SOLUTION
*/
let catHeading = document.getElementById('ord-down-cat-heading')


function changeCatHeading(cat) {
    activeCategory = orgdown.categories.find(c => cat === c.category)
    catHeading.innerHTML = `Categories<span class="makeGray">/${cat}</span>`
}


function createNewCategory(category) {
    let DOMCategories = document.getElementById('org-down-pref-categories')
    orgdown.categories.push({
        category: category,
        filetypes: []
    })
    let h3 = document.createElement('H3')
    let txtNode = document.createTextNode(category)
    h3.classList.add('org-down-pref__categories-item')
    h3.appendChild(txtNode)
    DOMCategories.appendChild(h3)
    h3.addEventListener('click', () => {
        let cat = orgdown.categories.find(c => category === c.category) //.filetypes
        console.log(cat)
        updateOrgDownPrefContent(cat)
        activeCategory = cat
        changeCatHeading(activeCategory.category)

    })
    orgDownCatInput.style.display = 'none'
    orgDownCatAdd.style.display = 'block'
}

function createNewFileType(filetype) {
    console.log(activeCategory);
    console.log('file: ', activeCategory.filetypes) //categories.find(c => activeCategory.category === c.category).filetypes)
    let types = orgdown.categories.find(c => activeCategory.category === c.category).filetypes
    types.push(filetype)
    updateOrgDownPrefContent(types)

    fileTypeAddDiv.style.display = 'none'
}

function updateOrgDownPrefContent(fileTypes) {
    prefContent.innerHTML = ''
    // let fileTypes = categories[0].filetypes
    let isRed = []
    let fileTypeAdd = document.getElementById('orgDoFileTypeAdd')

    // console.log(fileTypes);
    for (let i = 0; i < fileTypes.length; i++) {
        let p = document.createElement('P')
        let fileType = document.createTextNode(`.${fileTypes[i]}`)
        isRed.push(false)
        p.appendChild(fileType)
        p.addEventListener('click', () => {
            if (isRed[i]) {
                prefContent.childNodes[i].remove()
                let cat = getCategoryFromFileType(fileTypes[i])
                let types = orgdown.categories.find(c => c.category === cat).filetypes.splice(categories.find(c => c.category === cat).filetypes.indexOf(fileTypes[i]), 1);
            } else {
                p.style.backgroundColor = 'red';
                p.innerHTML = 'DELETE'
                p.style.color = '#fff'
                p.style.textAlign = 'center'
                isRed[i] = true;
                setTimeout(() => {
                    p.style.backgroundColor = '#fff';
                    console.log(fileType)
                    p.innerHTML = ''
                    p.appendChild(fileType)
                    p.style.color = '#000'
                    p.style.textAlign = 'left'
                    isRed[i] = false;
                }, 700)
            }
        })
        prefContent.appendChild(p);
    }
    fileTypeAdd.style.display = 'block'

    fileTypeAdd.addEventListener('click', () => {
        fileTypeAdd.style.display = 'none'
        fileTypeInput.style.display = 'block'
        fileTypeAddDiv.style.display = 'flex'
        fileTypeInput.focus()
    })

    fileTypeInput.addEventListener("focusout", () => {

        if (fileTypeInput.value.length === 0) {

            fileTypeInput.style.display = 'none'
            fileTypeAddDiv.style.display = 'none'
            fileTypeAdd.style.display = 'block'
        }
    });
}



document.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && orgDownCatInput === document.activeElement && orgDownCatInput.value.length !== 0) {
        createNewCategory(orgDownCatInput.value);
        orgDownCatInput.value = ''
    }
    if (e.keyCode === 13 && fileTypeInput === document.activeElement && fileTypeInput.value.length !== 0) {
        createNewFileType(fileTypeInput.value);
        fileTypeInput.value = ''
    }
})