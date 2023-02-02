import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff-test-json-stylish', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = fs.readFileSync(getFixturePath('expect-stylish.txt'), 'utf-8');

  expect(recieveJson).toBe(expected);
});

test('gendiff-test-yaml-stylish', () => {
  const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
  const expected = fs.readFileSync(getFixturePath('expect-stylish.txt'), 'utf-8');

  expect(recieveYaml).toBe(expected);
});

test('gendiff-test-json-plain', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const expected = fs.readFileSync(getFixturePath('expect-plain.txt'), 'utf-8');

  expect(recieveJson).toBe(expected);
});

test('gendiff-test-yaml-plain', () => {
  const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain');
  const expected = fs.readFileSync(getFixturePath('expect-plain.txt'), 'utf-8');

  expect(recieveYaml).toBe(expected);
});
