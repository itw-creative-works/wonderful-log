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
  options.file.date = options.file.date || new Date();

  options.worker = options.worker || {};
  options.worker.timeout = typeof options.worker.timeout === 'undefined' ? 10000 : options.worker.timeout;

  options.clean = options.clean || {};
  options.clean.enabled = typeof options.clean.enabled === 'undefined' ? true : options.clean.enabled;
  options.clean.days = options.clean.days || 7;

  // save options
  self.options = options;

  // define the filename for the log file
  const logFile = `${new Date(options.file.date).toISOString().replace(/:/g, '-').slice(0, -5)}-${Math.random().toString().slice(2, 6)}.log`;
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
      self.stopWorker();
    });
  }

  // clean up old log files
  if (self.options.clean.enabled) {
    self.clean();
  }
}

Logger.prototype.log = function() {
  const self = this;

  self.logMessage('info', ...arguments);
};
Logger.prototype.info = Logger.log;

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

  // console.log('---self.worker', self.worker)

  // log to file if enabled
  if (self.options.file.enabled) {
    self.worker.postMessage(formattedMessage);
  }
};

Logger.prototype.startWorker = function() {
  const self = this;

  // if worker already exists, reset the timeout and return
  if (self.worker) {
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

Logger.prototype.stopWorker = function() {
  const self = this;

  // clear the worker timeout
  clearTimeout(self.workerTimeout);

  // terminate the worker thread
  if (self.worker) {
    self.worker.terminate();
    self.worker = null;
  }
};

// start worker timeout
Logger.prototype.startWorkerTimeout = function() {
  const self = this;

  // set a timeout of 10 seconds to close the worker thread
  clearTimeout(self.workerTimeout);
  self.workerTimeout = setTimeout(() => {
    self.stopWorker();
  }, self.options.worker.timeout);
};

Logger.prototype.clean = function() {
  const self = this;

  // get the current date
  const currentDate = new Date();
  // get the date from the number of days to keep logs
  const dateToKeep = new Date(currentDate.setDate(currentDate.getDate() - self.options.clean.days));

  // get a list of all files in the logs directory
  const files = fs.readdirSync(self.options.file.path);

  // loop through each file
  files.forEach((file) => {
    const fileDate = new Date(file.split('T')[0]);
    // if the file date is older than the date to keep, delete the file
    if (fileDate < dateToKeep) {
      fs.unlinkSync(path.join(self.options.file.path, file));
    }
  });
}

// Get full log file
Logger.prototype.getLogs = function() {
  const self = this;

  // get the full log file
  return fs.readFileSync(self.fullLogPath, 'utf8');
}

// export the Logger function for use in other modules
module.exports = Logger;
