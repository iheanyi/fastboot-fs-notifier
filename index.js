"use strict";

const fs = require('fs');
const debounce = require('debounce');

class FSNotifier {
  constructor(options) {
    this.ui = options.ui;
    this.targetDir = options.targetDir;
  }

  subscribe(notify) {
    // Debounce Notify so it's only called once, filesystem change will shoot
    // off multiple notifiers otherwise.
    this.notify = debounce(notify, 200);

    return this.initWatcher();
  }

  initWatcher() {
    return new Promise((resolve, reject) => {
      fs.watch(this.targetDir, {}, (event, filename) => {
        this.hasWatcher = true;
        if (event === 'error') {
          this.ui.writeError('error while watching target directory');
          reject(err);
        } else if (event === 'change') {
          this.notify();
        }
      });

      resolve();
    });
  }
}

module.exports = FSNotifier;
