const electron = require('electron');
const App = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

App.on('window-all-closed', function() {
    //client.end();
    App.quit();
});

App.on('ready', function() {
    global.mainWindow = mainWindow = new BrowserWindow({width: 800, height: 800});

    mainWindow.loadURL('file://' + __dirname + '/snake.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});