const package = require('../package.json');
const assert = require('assert');
const fs = require('fs');
const powertools = require('node-powertools');

beforeEach(() => {
});

before(() => {
});

after(() => {
});

/*
 * ============
 *  Test Cases
 * ============
 */
describe(`${package.name}`, () => {
  let oldLib;
  let newLib;

  // Clear logs directory
  if (fs.existsSync('./test/logs')) {
    fs.rmdirSync('./test/logs', {recursive: true});
  }

  describe('old logs', () => {
    before(() => {
      oldLib = new (require('../dist/index.js'))({
        file: {
          enabled: true,
          path: './test/logs',
          date: new Date(0),
        }
      });
    });

    it('old log file is created', (done) => {
      oldLib.log('old log');
      powertools.wait(100).then(() => {
        assert.equal(fs.existsSync(oldLib.fullLogPath), true);
        done();
      });
    });

    it('old log worker is closed', () => {
      oldLib.stopWorker();
      assert.equal(oldLib.worker, null);
    });
  });

  describe('new logs', () => {
    before(() => {
      newLib = new (require('../dist/index.js'))({
        file: {
          enabled: true,
          path: './test/logs',
        }
      });
    });

    it('new log file is created', (done) => {
      newLib.log('new log');
      powertools.wait(100).then(() => {
        assert.equal(fs.existsSync(newLib.fullLogPath), true);
        done();
      });
    });

    it('old log file is deleted', (done) => {
      powertools.wait(100).then(() => {
        assert.equal(fs.existsSync(oldLib.fullLogPath), false);
        done();
      });
    });

    it('new log worker is closed', () => {
      newLib.stopWorker();
      assert.equal(newLib.worker, null);
    });
  });
});

