const fs = require('fs');
const { workerData, parentPort } = require('worker_threads');

// create a write stream for the log file
const logStream = fs.createWriteStream(workerData.path, { flags: 'a' });

// listen for messages from the parent thread
parentPort.on('message', message => {
  logStream.write(message);
});
