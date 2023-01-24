import { BrowserWindow } from 'electron'
import si from 'systeminformation'

export const streamSystem = async (window: BrowserWindow) => {
    setInterval(() => {
        si.getDynamicData("", "", (data) => {
            window.webContents.send('system', data)
        })
    }, 25000)
}

function init(window: BrowserWindow) {
    streamSystem(window)
}

export default {
    init,
}