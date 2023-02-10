import _ from 'lodash';

const astBuilder = (first, second) => {
  const allSortedKeys = _.sortBy(_.union(Object.keys(first), Object.keys(second)));
  return allSortedKeys.map((key) => {
    if (!_.has(first, key)) {
      return {
        name: key,
        type: 'added',
        value: second[key],
      };
    }
    if (!_.has(second, key)) {
      return {
        name: key,
        type: 'deleted',
        value: first[key],
      };
    }
    if (_.isObject(first[key]) && _.isObject(second[key])) {
      return {
        name: key,
        type: 'nested',
        children: astBuilder(first[key], second[key]),
      };
    }
    if (!_.isEqual(first[key], second[key])) {
      return {
        name: key,
        type: 'updated',
        value1: first[key],
        value2: second[key],
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: first[key],
    };
  });
};

export default astBuilder;
