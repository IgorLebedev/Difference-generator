import _ from 'lodash';

const astBuilder = (first, second) => {
  const keys = [Object.keys(first), Object.keys(second)];
  const allSortedKeys = _.sortBy(_.union(...keys));
  return allSortedKeys.map((key) => {
    if (_.isObject(first[key]) && _.isObject(second[key])) {
      return {
        name: key,
        type: 'nested',
        children: astBuilder(first[key], second[key]),
      };
    }
    if (!_.isEqual(first[key], second[key]) && _.has(first, key) && _.has(second, key)) {
      return {
        name: key,
        type: 'updated',
        from: first[key],
        to: second[key],
      };
    }
    if (!_.has(first, key)) {
      return {
        name: key,
        type: 'added',
        value: second[key],
      };
    }
    return {
      name: key,
      type: !_.has(second, key) ? 'deleted' : 'unchanged',
      value: first[key],
    };
  });
};

export default astBuilder;
