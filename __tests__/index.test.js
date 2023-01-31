import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff-test-json', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = fs.readFileSync(getFixturePath('expect.txt'), 'utf-8');

  expect(recieveJson).toBe(expected);
});

const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
const expected = fs.readFileSync(getFixturePath('expect.txt'), 'utf-8');

test('gendiff-test-yaml', () => {
  expect(recieveYaml).toBe(expected);
});
