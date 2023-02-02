import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import astBuilder from './astbuilder.js';
import formatter from './fomatters/index.js';

const getAbsolutePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const readFile = (file) => fs.readFileSync(file);
const getExtension = (file) => path.extname(file);

const genDiff = (file1, file2, format = 'stylish') => {
  const file1Coll = parse(readFile(getAbsolutePath(file1)), getExtension(file1));
  const file2Coll = parse(readFile(getAbsolutePath(file2)), getExtension(file2));
  const astTree = astBuilder(file1Coll, file2Coll);
  return formatter(astTree, format);
};

export default genDiff;
