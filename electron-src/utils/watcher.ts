import chokidar from 'chokidar'

const downloadsDir = process.env.HOME + "/Downloads";
let watcher: chokidar.FSWatcher;

type WatcherCallback = (event: string, file: string) => void;

export function onDownloadChange(callback: WatcherCallback) {
    watcher = chokidar.watch(downloadsDir, {
        persistent: true
    });

    watcherSetUp(watcher, callback);

    // chokidar.watch(downloadsDir).on('all', (event, path) => {
    //     console.log(path)
    //     callback(event, path);
    // });
}

function watcherSetUp(watcher: chokidar.FSWatcher, callback: WatcherCallback) {
    watcher.on('ready', () => {
        watcher.on('add', (path) => {
            // if (isFileMover) {
            console.log('File added RELOADED', path)
            callback("In main ", path)
            // callback('File added', event, path);
            // let filename = path.split('/')[(path.split('/').length) - 1];

            // let category = findCategory(file);
            // let moveFrom = `${baseFolder}${filename}`
            // let moveTo = `${baseFolder}${category}/${filename}`

            // moveFile(moveFrom, moveTo, filename, category);
            // }

        });
    })
}

