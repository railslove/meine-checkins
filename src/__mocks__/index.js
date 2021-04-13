import {readdirSync} from 'fs';

const currentBasename = __filename.split('/').pop();

readdirSync(__dirname)
  .filter(basename => basename !== currentBasename)
  .map(basename => require(`${__dirname}/${basename}`));
