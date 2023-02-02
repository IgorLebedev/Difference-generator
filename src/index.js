// import fs from 'fs';
import _ from 'lodash';
// import path from 'path';
import parse from './parser.js';
// import formatter from './formatter.js';
import stylish from './formatter.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const file1Coll = parse(file1);
  const file2Coll = parse(file2);
  const iter = (first, second) => {
    const keys1 = Object.keys(first);
    const keys2 = Object.keys(second);
    const allSortedKeys = _.sortBy(_.union(keys1, keys2));
    const changes = allSortedKeys.reduce((acc, key) => {
      if (!_.has(first, key)) {
        acc.push({
          name: key,
          type: 'added',
          value: _.cloneDeep(second[key]),
        });
      } if (!_.has(second, key)) {
        acc.push({
          name: key,
          type: 'deleted',
          value: _.cloneDeep(first[key]),
        });
      }
      if (first[key] !== second[key] && Object.hasOwn(first, key) && Object.hasOwn(second, key) && (!_.isObject(first[key]) || !_.isObject(second[key]))) {
        acc.push({
          name: key,
          type: 'changed',
          from: _.cloneDeep(first[key]),
          to: _.cloneDeep(second[key]),
        });
      }
      if (first[key] === second[key]) {
        acc.push({
          name: key,
          type: 'unchanged',
          value: _.cloneDeep(first[key]),
        });
      }
      if (_.isObject(first[key]) && _.isObject(second[key])) {
        acc.push({
          name: key,
          type: 'nested',
          children: iter(first[key], second[key]),
        });
      }
      return acc;
    }, []);
    return changes;
  };
  switch (format) {
    case 'stylish':
      return stylish(iter(file1Coll, file2Coll));
    default: throw new Error('unexpected format');
  }
};

export default genDiff;
