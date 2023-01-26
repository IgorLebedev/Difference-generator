import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getPath = (filename) => {
  return path.resolve(process.cwd(), filename);
};

export const genDiff = (file1, file2) => {
  const file1coll = JSON.parse(fs.readFileSync(getPath(file1)));
  const file2coll = JSON.parse(fs.readFileSync(getPath(file2)));
  const keys1 = Object.keys(file1coll);
  const keys2 = Object.keys(file2coll);
  const allSortedKeys = _.sortBy(_.union(keys1, keys2));

  console.log(allSortedKeys)

  const changes = allSortedKeys.reduce((acc, key) => {
    if (!_.has(file1coll, key)) {
      const plus = `+ ${key}`
      acc[plus] = file2coll[key]
    } else if (!_.has(file2coll, key)) {
      acc[`- ${key}`] = file1coll[key]
    } else if (file1coll[key] !== file2coll[key]) {
      acc[`- ${key}`] = file1coll[key];
      acc[`+ ${key}`] = file2coll[key];
    } else acc[key] = file1coll[key];
    return acc;
  }, {});
  return changes;
};

