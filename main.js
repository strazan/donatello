const electron = require('electron')
const url = require('url')
const path = require('path')

const {
    app,
    BrowserWindow,
    Menu
} = electron;

let mainWindow;

let orgDowPrefWindow;
// will print something similar to /Users/maf/.../Electron


app.on('ready', function () {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
         width: 900,
        height: 600,
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'preferences.html'),
    //    pathname: path.join(__dirname, 'main-window.html'),
        protocol: 'file:',
        slashes: true
    }))

    // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

    // Menu.setApplicationMenu(mainMenu)
    // console.log(mainMenu)
    // openPrefWindow();
});

const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Preferences',
        click(){
            openPrefWindow()
        }
    },
    {
        label: 'Quit',
        click(){
            app.quit();
        }
    }]
}];

function openPrefWindow() {
    orgDowPrefWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,

    });

    orgDowPrefWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'organize-download-pref.html'),
        protocol: 'file:',
        slashes: true
    }))
  
}

//+ document.getElementById('scriptOrgDow'))
// document.getElementById('scriptOrgDow').addEventListener('click', () => {

//     orgDowPrefWindow.show = true;
// })