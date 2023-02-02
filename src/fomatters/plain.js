import _ from 'lodash';

const plain = (ast) => {
  const iter = (tree, last) => {
    if (!_.isArray(tree)) {
      if (_.isObject(tree)) {
        return '[complex value]';
      } if (_.isString(tree)) {
        return `'${tree}'`;
      } return tree;
    }
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return iter(node.children, `${last}${node.name}.`);
        case 'added':
          return `Property '${last}${node.name}' was added with value: ${iter(node.value, last)}`;
        case 'deleted':
          return `Property '${last}${node.name}' was removed`;
        case 'updated':
          return `Property '${last}${node.name}' was updated. From ${iter(node.from, last)} to ${iter(node.to, last)}`;
        case 'unchanged':
          return [];
        default: throw new Error(`unexpected node type: ${node.type}`);
      }
    });
    return result.join('\n');
  };
  return iter(ast, '');
};

export default plain;
