const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');

function Logger(options) {
  const self = this;

  // set options
  options = options || {};

  options.console = options.console || {};
  options.console.enabled = typeof options.console.enabled === 'undefined' ? true : options.console.enabled;
  
  options.file = options.file || {};
  options.file.enabled = typeof options.file.enabled === 'undefined' ? true : options.file.enabled;
  options.file.path = options.file.path || './logs';
  
  options.worker = options.worker || {};
  options.worker.timeout = typeof options.worker.timeout === 'undefined' ? 10000 : options.worker.timeout;

  // save options
  self.options = options;

  // define the filename for the log file
  const logFile = `${new Date().toISOString().replace(/:/g, '_').slice(0, -5)}.log`;
  self.fullLogPath = path.join(self.options.file.path, logFile);

  // create the logs directory if it does not exist
  if (self.options.file.enabled && !fs.existsSync(self.options.file.path)) {
    fs.mkdirSync(self.options.file.path, {recursive: true});
  }

  // create a worker thread to write logs to file in the background
  if (self.options.file.enabled) {
    self.startWorker();

    // listen for the exit event on the main process
    process.on('exit', () => {
      self.worker.terminate();
    });    
  }
}

Logger.prototype.log = function() {
  const self = this;

  self.logMessage('log', ...arguments);
};

Logger.prototype.warn = function() {
  const self = this;

  self.logMessage('warn', ...arguments);
};

Logger.prototype.error = function() {
  const self = this;

  self.logMessage('error', ...arguments);
};

Logger.prototype.logMessage = function() {
  const self = this;

  const level = arguments[0];
  const message = Array.prototype.slice.call(arguments, 1).join(' ');

  // create a timestamp for the log message
  const timestamp = new Date().toISOString();
  // format the log message with the timestamp and level
  const formattedMessage = `[${timestamp}] ${level}: ${message}\n`;

  // log to console if enabled
  if (self.options.console.enabled) {
    console[level](formattedMessage);
  }

  // start the worker thread
  self.startWorker();

  // log to file if enabled
  if (self.options.file.enabled) {
    self.worker.postMessage(formattedMessage);
  }
};

Logger.prototype.startWorker = function() {
  const self = this;

  // if worker already exists, reset the timeout and return
  if (self.worker) {
    // self.worker.terminate();
    return self.startWorkerTimeout();
  }

  // create a worker thread to write logs to file in the background
  self.worker = new Worker(path.join(__dirname, './worker.js'), {
    workerData: {
      path: self.fullLogPath,
    },
  });

  self.startWorkerTimeout();
};

// // start worker timeout
Logger.prototype.startWorkerTimeout = function() {
  const self = this;

  // set a timeout of 10 seconds to close the worker thread
  clearTimeout(self.workerTimeout);
  self.workerTimeout = setTimeout(() => {
    self.worker.terminate();
  }, self.options.worker.timeout);
};

// export the Logger function for use in other modules
module.exports = Logger;
