import _ from 'lodash';

const stylish = (ast) => {
  const iter = (tree, multiplier) => {
    const spacesWithoutSign = ' '.repeat(4 * multiplier);
    const spacesWithSign = ' '.repeat(4 * multiplier - 2);
    const closingBracketSpace = ' '.repeat(4 * (multiplier - 1));
    if (!_.isArray(tree)) {
      if (_.isObject(tree)) {
        const entries = Object.entries(tree);
        const deepObjects = entries
          .reduce((acc, [key, value]) => `${acc}\n${spacesWithoutSign}${key}: ${iter(value, multiplier + 1)}`, '');
        return `{${deepObjects}\n${closingBracketSpace}}`;
      } return tree;
    }
    const mapped = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${spacesWithoutSign}${node.name}: ${_.cloneDeep(iter(node.children, multiplier + 1))}`;
        case 'unchanged':
          return `${spacesWithoutSign}${node.name}: ${iter(node.value, multiplier + 1)}`;
        case 'added':
          return `${spacesWithSign}+ ${node.name}: ${iter(node.value, multiplier + 1)}`;
        case 'deleted':
          return `${spacesWithSign}- ${node.name}: ${iter(node.value, multiplier + 1)}`;
        case 'changed':
          return `${spacesWithSign}- ${node.name}: ${iter(node.from, multiplier + 1)}\n${spacesWithSign}+ ${node.name}: ${iter(node.to, multiplier + 1)}`;
        default: throw new Error('unexpected node type');
      }
    });
    return [
      '{',
      ...mapped,
      `${closingBracketSpace}}`,
    ].join('\n');
  };
  return iter(ast, 1);
};

export default stylish;
