import _ from 'lodash';

const checkUnnested = (node) => {
  if (_.isObject(node)) {
    return '[complex value]';
  } if (_.isString(node)) {
    return `'${node}'`;
  } return node;
};

const plain = (ast) => {
  const iter = (tree, last) => {
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return iter(node.children, `${last}${node.name}.`);
        case 'added':
          return `Property '${last}${node.name}' was added with value: ${checkUnnested(node.value, last)}`;
        case 'deleted':
          return `Property '${last}${node.name}' was removed`;
        case 'updated':
          return `Property '${last}${node.name}' was updated. From ${checkUnnested(node.from, last)} to ${checkUnnested(node.to, last)}`;
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
