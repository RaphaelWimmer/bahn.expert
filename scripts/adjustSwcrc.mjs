import fs from 'node:fs';
import json5 from 'json5';
import path from 'node:path';

if (process.env.NODE_ENV !== 'production' || process.env.TEST_RUN) {
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0);
}

const swcConfig = json5.parse(fs.readFileSync(path.resolve('.swcrc')));
const originalSWCConfig = json5.parse(fs.readFileSync(path.resolve('.swcrc')));

swcConfig.jsc.experimental.plugins.unshift([
  '@swc/plugin-react-remove-properties',
  {
    properties: ['^data-test'],
  },
]);

fs.writeFileSync(
  path.resolve('.swcrc'),
  JSON.stringify(swcConfig, undefined, 2),
  'utf8',
);

const restoreOldConfig = (code) => {
  fs.writeFileSync(
    path.resolve('.swcrc'),
    JSON.stringify(originalSWCConfig, undefined, 2),
    'utf8',
  );
};
process.on('beforeExit', restoreOldConfig);
process.on('exit', restoreOldConfig);
