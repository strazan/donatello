"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDownloadChange = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const downloadsDir = process.env.HOME + "/Downloads";
let watcher;
function onDownloadChange(callback) {
    watcher = chokidar_1.default.watch(downloadsDir, {
        persistent: true
    });
    watcherSetUp(watcher, callback);
    // chokidar.watch(downloadsDir).on('all', (event, path) => {
    //     console.log(path)
    //     callback(event, path);
    // });
}
exports.onDownloadChange = onDownloadChange;
function watcherSetUp(watcher, callback) {
    watcher.on('ready', () => {
        watcher.on('add', (path) => {
            // if (isFileMover) {
            console.log('File added RELOADED', path);
            callback("In main ", path);
            // callback('File added', event, path);
            // let filename = path.split('/')[(path.split('/').length) - 1];
            // let category = findCategory(file);
            // let moveFrom = `${baseFolder}${filename}`
            // let moveTo = `${baseFolder}${category}/${filename}`
            // moveFile(moveFrom, moveTo, filename, category);
            // }
        });
    });
}
