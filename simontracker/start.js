const { spawn } = require('child_process');
const path = require('path');

// Define absolute paths
const serverFilePath = path.join(__dirname, 'server', 'server.js');
const simontrackerFolderPath = __dirname;

// Start the Node.js server
const serverProcess = spawn('node', [serverFilePath], {
  stdio: 'inherit',
  cwd: path.join(__dirname, 'server'),
});

// Start the Electron application
const electronProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  cwd: simontrackerFolderPath,
});
