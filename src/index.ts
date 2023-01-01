import { dirname } from 'path';
import myGlobal from './global';
import { runServer } from '@src/server';

const main = async () => {
  const mainFileName = require.main?.filename;
  if (mainFileName == undefined) {
    console.error('Get path failed');
    return;
  }

  const projRoot = dirname(dirname(mainFileName));
  myGlobal.projectRoot = projRoot;

  runServer();
}

main();