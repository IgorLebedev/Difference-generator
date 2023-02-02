import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (ast, format) => {
  switch (format) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    default: throw new Error(`Unexpected format: ${format}`);
  }
};

export default formatter;
