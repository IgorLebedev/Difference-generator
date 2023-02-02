import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getAbsolutePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const readFile = (file) => fs.readFileSync(file);

const getExtension = (file) => path.extname(file);

export default (file) => {
  const format = getExtension(file);
  if (format === '.json') {
    return JSON.parse(readFile(getAbsolutePath(file)));
  } if (format === '.yml' || format === '.yaml') {
    return yaml.load(readFile(getAbsolutePath(file)));
  } throw new Error('This format doesn\'t support');
};
