import path from 'node:path';
import {resolve as pathResolve} from 'path';
import Browserify from 'browserify';
import esmify from 'esmify';

function resolveDependency(id, parent) {
  const pathsToAdd = [
    pathResolve('packages/core/node_modules'), 
    pathResolve('node_modules')
  ];

  try {
    return resolve.sync(id, {
      basedir: path.dirname(parent),
      paths: pathsToAdd,
    });
  } catch (error) {
    return false;
  }
}

const browserify = Browserify({
  entries: './src/index.js',
  plugin: [ esmify ],
  paths: [
    pathResolve('../../packages/core/node_modules'), 
    pathResolve('../../node_modules'), 
    pathResolve('node_modules')
  ],
});

browserify.bundle().pipe(process.stdout);
