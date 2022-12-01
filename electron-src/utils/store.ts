import { IpcMain, IpcMainEvent } from 'electron'
import Store from 'electron-store'

const store = new Store()
Store.initRenderer()

export type Category = {
    name: string
    files: string[]
    active: boolean
}

const DEFAULT_CATEGORIES: Category[] = [
    {
        name: 'Images',
        active: true,
        files: ['png', 'jpg', 'jpeg'],
    },
    {
        name: 'Other',
        active: true,
        files: [],
    },
    {
        name: 'Videos',
        active: true,
        files: ['mp4', 'mkv', 'avi', 'mov'],
    },
    {
        name: 'Documents',
        active: true,
        files: [
            'pdf',
            'doc',
            'docx',
            'xls',
            'xlsx',
            'ppt',
            'pptx',
            'txt',
            'rtf',
            'odt',
            'ods',
            'odp',
            'odg',
            'odf',
            'odb',
            'csv',
            'tsv',
            'xml',
            'html',
            'htm',
            'xhtml',
            'mht',
            'epub',
            'md',
            'yml',
            'yaml',
            'json',
            'ics',
            'vcf',
        ],
    },
]

function getCategories() {
    return store.get('categories') as Category[]
}

function setCategories(value: Category[]) {
    return store.set('categories', value)
}

async function init(ipc: IpcMain) {
    if (!store.has('categories')) {
        await store.set('categories', DEFAULT_CATEGORIES)
    }

    ipc.on('init', async (event: IpcMainEvent) => {
        const categories = await getCategories()
        event.sender.send('settings', categories)
    })

    ipc.on('toggleDownload', async (event: IpcMainEvent, name, value) => {
        const categories = await getCategories()
        const updated = categories.map((category) => {
            if (category.name === name) {
                category.active = value
            }
            return category
        })
        setCategories(updated)
        event.sender.send('settings', updated)
    })
}

export default {
    init,
    getCategories,
}
