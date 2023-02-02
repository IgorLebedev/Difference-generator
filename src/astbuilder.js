import _ from 'lodash';

const astBuilder = (first, second) => {
  const keys1 = Object.keys(first);
  const keys2 = Object.keys(second);
  const allSortedKeys = _.sortBy(_.union(keys1, keys2));
  return allSortedKeys.map((key) => {
    if (!_.has(first, key)) {
      return {
        name: key,
        type: 'added',
        value: _.cloneDeep(second[key]),
      };
    } if (!_.has(second, key)) {
      return {
        name: key,
        type: 'deleted',
        value: _.cloneDeep(first[key]),
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
        type: 'changed',
        from: _.cloneDeep(first[key]),
        to: _.cloneDeep(second[key]),
      };
    } return {
      name: key,
      type: 'unchanged',
      value: _.cloneDeep(first[key]),
    };
  });
};

export default astBuilder;
