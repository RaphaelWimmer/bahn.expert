import './adjustSwcrc.mjs';
import childProcess from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = 'dist/node';
async function build() {
  const folderToBuild = ['src/server', 'src/types', 'src/util', 'src/Storage'];
  const buildPromises = folderToBuild.map((folder) => {
    const p = childProcess.spawn(
      'swc',
      [
        '-D',
        '-C',
        'minify=true',
        '-C',
        `env.targets.node=${process.versions.node}`,
        folder,
        '--out-dir',
        outDir,
      ],
      {
        env: {
          ...process.env,
        },
      },
    );

    p.stdout.pipe(process.stdout);
    p.stderr.pipe(process.stderr);

    return new Promise((resolve, reject) => {
      p.on('close', (code) => {
        if (code !== 0) {
          reject(code);
        }
        resolve(0);
      });
    });
  });

  await Promise.all(buildPromises);
}

build();
