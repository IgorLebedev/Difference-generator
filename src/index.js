import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parser.js';
import formatter from './formatter.js';

const getAbsolutePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const readFile = (file) => fs.readFileSync(file);

const genDiff = (file1, file2) => {
  const file1Coll = parse(readFile(getAbsolutePath(file1)), formatter(file1));
  const file2Coll = parse(readFile(getAbsolutePath(file2)), formatter(file2));
  const keys1 = Object.keys(file1Coll);
  const keys2 = Object.keys(file2Coll);
  const allSortedKeys = _.sortBy(_.union(keys1, keys2));

  const changes = allSortedKeys.reduce((acc, key) => {
    if (!_.has(file1Coll, key)) {
      return `${acc}\n- ${key}: ${file2Coll[key]}`;
    } if (!_.has(file2Coll, key)) {
      return `${acc}\n- ${key}: ${file1Coll[key]}`;
    } if (file1Coll[key] !== file2Coll[key]) {
      return `${acc}\n- ${key}: ${file1Coll[key]}\n+ ${key}: ${file2Coll[key]}`;
    } return `${acc}\n  ${key}: ${file1Coll[key]}`;
  }, '');
  return `{${changes}\n}`;
};

export default genDiff;
