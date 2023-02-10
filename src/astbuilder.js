import _ from 'lodash';

const astBuilder = (first, second) => {
  const allSortedKeys = _.sortBy(_.union(Object.keys(first), Object.keys(second)));
  return allSortedKeys.map((key) => {
    const result = {
      name: key,
      type: null,
      children: null,
      value: [],
    };
    if (!_.has(second, key)) {
      result.type = 'deleted';
      result.value.push(first[key]);
    } else if (!_.has(first, key)) {
      result.type = 'added';
      result.value.push(second[key]);
    } else if (_.isObject(first[key]) && _.isObject(second[key])) {
      result.type = 'nested';
      result.children = astBuilder(first[key], second[key]);
    } else if (!_.isEqual(first[key], second[key])) {
      result.type = 'updated';
      result.value.push(first[key]);
      result.value.push(second[key]);
    } else if (first[key] === second[key]) {
      result.type = 'unchanged';
      result.value.push(first[key]);
    }
    return result;
  });
};

export default astBuilder;
