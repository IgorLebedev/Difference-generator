import _ from 'lodash';

const chooseSpaces = (place, multiplier) => {
  switch (place) {
    case 'withoutSign':
      return ' '.repeat(4 * multiplier);
    case 'withSign':
      return ' '.repeat(4 * multiplier - 2);
    case 'closingBracket':
      return ' '.repeat(4 * (multiplier - 1));
    default:
      throw new Error('nonoonon');
  }
};

const checkUnnested = (node, multiplier) => {
  if (_.isObject(node)) {
    const entries = Object.entries(node);
    const deepObjects = entries
      .reduce((acc, [key, value]) => `${acc}\n${chooseSpaces('withoutSign', multiplier)}${key}: ${checkUnnested(value, multiplier + 1)}`, '');
    return `{${deepObjects}\n${chooseSpaces('closingBracket', multiplier)}}`;
  } return node;
};

const stylish = (ast) => {
  const iter = (tree, multiplier) => {
    const result = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${chooseSpaces('withoutSign', multiplier)}${node.name}: ${(iter(node.children, multiplier + 1))}`;
        case 'unchanged':
          return `${chooseSpaces('withoutSign', multiplier)}${node.name}: ${checkUnnested(node.value, multiplier + 1)}`;
        case 'added':
          return `${chooseSpaces('withSign', multiplier)}+ ${node.name}: ${checkUnnested(node.value, multiplier + 1)}`;
        case 'deleted':
          return `${chooseSpaces('withSign', multiplier)}- ${node.name}: ${checkUnnested(node.value, multiplier + 1)}`;
        case 'updated': {
          const from = `${chooseSpaces('withSign', multiplier)}- ${node.name}: ${checkUnnested(node.value, multiplier + 1)}`;
          const to = `${chooseSpaces('withSign', multiplier)}+ ${node.name}: ${checkUnnested(node.value, multiplier + 1)}`;
          return `${from}\n${to}`;
        }
        default:
          throw new Error(`unexpected node type: ${node.type}`);
      }
    });
    return [
      '{',
      ...result,
      `${chooseSpaces('closingBracket', multiplier)}}`,
    ].join('\n');
  };
  return iter(ast, 1);
};

export default stylish;
