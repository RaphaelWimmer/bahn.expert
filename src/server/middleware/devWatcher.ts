import childProcess from 'node:child_process';
import chokidar from 'chokidar';
import path from 'node:path';

const watcher = chokidar.watch(path.resolve('./src/**'));

watcher.on('change', (file: any) => {
  if (file.includes('src/server/API/controller/')) {
    // eslint-disable-next-line no-console
    console.log('Rebuilding Routes & doc');
    childProcess.exec('pnpm doc:build', (err, _, stderr) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(stderr);
      } else {
        // eslint-disable-next-line no-console
        console.log('Done rebuilding');
      }
    });
  }
});
