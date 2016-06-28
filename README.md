# Fastboot FS Notifier
A Fastboot App Server Notifier for watching files on the local disk.

```javascript
const FSNotifier = require('fastboot-fs-notifier');

let notifier = new FSNotifier({
  targetDir: TARGET_PATH
});

let server = new FastBootAppServer({
  notifier: notifier
});
```

When the notifier is started, it will use the Node Filesystem's (watch
function)[https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener] to watch the target directory, which should be your directory for your Ember app. On new releases of the application, it will notify the Fastboot App Server and let it know that files have changed and it should be restarted. 
