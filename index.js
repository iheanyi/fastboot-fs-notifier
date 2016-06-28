"use strict";

const fs = require('fs');

class FSNotifier {
  constructor(options) {
    this.ui = options.ui;
    this.targetDir = options.targetDir;
  }

  subscribe(notify) {
    this.notify = notify;

    return this.initWatcher();
  }

  initWatcher() {
    return new Promise((resolve, reject) => {
      fs.watch(this.targetDir, {}, (event, filename) => {
        if (event === 'error') {
          this.ui.writeError('error while watching target directory');
          reject(err);
        } else if (event === 'change') {
          this.ui.writeLine('File Changed: ' + filename);
          this.notify();
          resolve();
        }
      });
    });
  }
}

module.exports = FSNotifier;
