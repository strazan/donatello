const electron = require('electron')
const url = require('url')
const path = require('path')

const {
    app,
    BrowserWindow
} = electron;

let mainWindow;
// will print something similar to /Users/maf/.../Electron


app.on('ready', function () {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main-window.html'),
        protocol: 'file:',
        slashes: true

    }))
});