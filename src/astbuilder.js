import _ from 'lodash';

const astBuilder = (first, second) => {
  const allSortedKeys = _.sortBy(_.union(Object.keys(first), Object.keys(second)));
  return allSortedKeys.map((key) => {
    const result = {
      name: key,
      makeTree() {
        if (!_.has(second, key)) {
          this.type = 'deleted';
          this.value = first[key];
        } else if (!_.has(first, key)) {
          this.type = 'added';
          this.value = second[key];
        } else if (_.isObject(first[key]) && _.isObject(second[key])) {
          this.type = 'nested';
          this.children = astBuilder(first[key], second[key]);
        } else if (!_.isEqual(first[key], second[key])) {
          this.type = 'updated';
          this.value = [first[key], second[key]];
        } else if (first[key] === second[key]) {
          this.type = 'unchanged';
          this.value = first[key];
        }
      },
    };
    result.makeTree();
    return result;
  });
};

export default astBuilder;
