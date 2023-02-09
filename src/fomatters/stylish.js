import _ from 'lodash';

const spacesWithSign = (multiplier) => ' '.repeat(4 * multiplier - 2);

const spacesWithoutSign = (multiplier) => ' '.repeat(4 * multiplier);

const checkObj = (node, multiplier) => {
  if (_.isObject(node)) {
    const entries = Object.entries(node);
    const deepObjects = entries
      .reduce((acc, [key, value]) => `${acc}\n${spacesWithoutSign(multiplier)}${key}: ${checkObj(value, multiplier + 1)}`, '');
    return `{${deepObjects}\n${spacesWithoutSign(multiplier - 1)}}`;
  } return node;
};

const stylish = (ast) => {
  const iter = (tree, multiplier) => {
    const result = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${spacesWithoutSign(multiplier)}${node.name}: ${(iter(node.children, multiplier + 1))}`;
        case 'unchanged':
          return `${spacesWithoutSign(multiplier)}${node.name}: ${checkObj(node.value, multiplier + 1)}`;
        case 'added':
          return `${spacesWithSign(multiplier)}+ ${node.name}: ${checkObj(node.value, multiplier + 1)}`;
        case 'deleted':
          return `${spacesWithSign(multiplier)}- ${node.name}: ${checkObj(node.value, multiplier + 1)}`;
        case 'updated': {
          const from = `${spacesWithSign(multiplier)}- ${node.name}: ${checkObj(node.from, multiplier + 1)}`;
          const to = `${spacesWithSign(multiplier)}+ ${node.name}: ${checkObj(node.to, multiplier + 1)}`;
          return `${from}\n${to}`;
        }
        default: throw new Error(`unexpected node type: ${node.type}`);
      }
    });
    return [
      '{',
      ...result,
      `${spacesWithoutSign(multiplier - 1)}}`,
    ].join('\n');
  };
  return iter(ast, 1);
};

export default stylish;
