import chokidar from 'chokidar'
import fs from 'fs'
import store from './store'

const downloadsDir = process.env.HOME + '/Downloads'

async function findCategory(filename: string) {
    const categories = await store.getCategories()
    const extension = filename.split('.').pop() as string
    const category = categories.find((category) =>
        category.files.includes(extension)
    )
    return category?.name || 'Other'
}

async function rename(baseDir: string, filename: string, category: string) {
    if (fs.existsSync(`${baseDir}/${filename}`)) {
        await createDirIfNotExists(`${baseDir}/${category}`)
        fs.rename(
            `${baseDir}/${filename}`,
            `${baseDir}/${category}/${filename}`,
            (err) => {
                if (err) {
                    throw err
                }
            }
        )
    }
}

async function sort(path: string) {
    const filename = path.split('/').pop() as string
    const category = await findCategory(filename)
    rename(downloadsDir, filename, category)
}

function startWatcher(watcher: chokidar.FSWatcher) {
    watcher.on('ready', () => {
        watcher.on('add', (path) => {
            sort(path)
        })
    })
}

function createDirIfNotExists(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

async function init() {
    const watcher: chokidar.FSWatcher = chokidar.watch(downloadsDir, {
        persistent: true,
    })

    const categories = await store.getCategories()

    categories.forEach((category) => {
        if (category.active) {
            createDirIfNotExists(`${downloadsDir}/${category.name}`)
        }
    })

    startWatcher(watcher)
}

export default {
    init,
}
