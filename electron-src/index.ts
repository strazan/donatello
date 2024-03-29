// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { BrowserWindow, app, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

import store from './utils/store'
import watcher from './utils/watcher'
import system from './utils/system'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
    await prepareNext('./renderer')

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: join(__dirname, 'preload.js'),
        },
    })

    const url = isDev
        ? 'http://localhost:8000/'
        : format({
            pathname: join(__dirname, '../renderer/out/index.html'),
            protocol: 'file:',
            slashes: true,
        })

    mainWindow.loadURL(url)

    watcher.init()
    store.init(ipcMain)
    system.init(mainWindow)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
