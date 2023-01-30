import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import expected from '../__fixtures__/expect.js';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff-test', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expected);
});
