const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;
let flaskProcess;

function createWindow() {
  // Start the Flask Server
  flaskProcess = exec('python app.py', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting Flask: ${err}`);
      return;
    }
  });

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#050505',
    icon: path.join(__currentMode, 'static/favicon.ico'), // Add an icon here
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Wait 2 seconds for Flask to boot, then load
  setTimeout(() => {
    mainWindow.loadURL('http://127.0.0.1:5000');
  }, 2000);

  mainWindow.on('closed', function () {
    mainWindow = null;
    // Kill Flask when window closes
    flaskProcess.kill();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
    flaskProcess.kill();
  }
});