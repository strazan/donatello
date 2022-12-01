/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
    contextBridge,
    ipcRenderer,
    IpcRenderer,
    IpcRendererEvent,
} from 'electron'

// contextBridge.exposeInMainWorld('versions', {})

contextBridge.exposeInMainWorld('electronAPI', {
    init: () => ipcRenderer.send('init'),
    toggleDownload: (name: string, value: boolean) =>
        ipcRenderer.send('toggleDownload', name, value),
    settings: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.on('settings', callback),
    // we can also expose variables, not just functions
})

declare global {
    namespace NodeJS {
        interface Global {
            ipcRenderer: IpcRenderer
        }
    }
}

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
// process.once('loaded', () => {
//   global.ipcRenderer = ipcRenderer
// })
