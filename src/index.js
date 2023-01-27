import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getAbsolutePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const parse = (path) => {
  if (path.endsWith('.json')) {
    return JSON.parse(fs.readFileSync(getAbsolutePath(path)))
  }
};

const genDiff = (file1, file2) => {
  const file1Coll = parse(file1);
  const file2Coll = parse(file2);
  const keys1 = Object.keys(file1Coll);
  const keys2 = Object.keys(file2Coll);
  const allSortedKeys = _.sortBy(_.union(keys1, keys2));

  const changes = allSortedKeys.reduce((acc, key) => {
    if (!_.has(file1Coll, key)) {
      acc += `\n- ${key}: ${file2Coll[key]}`;
    } else if (!_.has(file2Coll, key)) {
      acc += `\n- ${key}: ${file1Coll[key]}`;
    } else if (file1Coll[key] !== file2Coll[key]) {
      acc += `\n- ${key}: ${file1Coll[key]}`;
      acc += `\n+ ${key}: ${file2Coll[key]}`;
    } else acc += `\n  ${key}: ${file1Coll[key]}`;
    return acc;
  }, '');
  return `{${changes}\n}`;
};

export default genDiff;
