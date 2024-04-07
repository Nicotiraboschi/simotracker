const { spawn } = require('child_process');
const path = require('path');

// Avvia il server Node.js
const serverProcess = spawn('node', ['server.js'], {
  stdio: 'inherit',
  cwd: path.join(__dirname, 'server'), // Imposta il percorso corrente sulla directory server
});

// Avvia l'applicazione Electron
const electronProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  cwd: __dirname, // Percorso corrente (cartella simontracker)
});
