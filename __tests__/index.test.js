import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff-test-json-stylish', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectedStylish = fs.readFileSync(getFixturePath('expect-stylish.txt'), 'utf-8');

  expect(recieveJson).toBe(expectedStylish);
});

test('gendiff-test-yaml-stylish', () => {
  const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
  const expectedStylish = fs.readFileSync(getFixturePath('expect-stylish.txt'), 'utf-8');

  expect(recieveYaml).toBe(expectedStylish);
});

test('gendiff-test-json-plain', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const expectedPlain = fs.readFileSync(getFixturePath('expect-plain.txt'), 'utf-8');

  expect(recieveJson).toBe(expectedPlain);
});

test('gendiff-test-yaml-plain', () => {
  const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain');
  const expectedPlain = fs.readFileSync(getFixturePath('expect-plain.txt'), 'utf-8');

  expect(recieveYaml).toBe(expectedPlain);
});

test('gendiff-test-json-json', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const expectedJson = fs.readFileSync(getFixturePath('expect-json.json'), 'utf-8');

  expect(recieveJson).toBe(expectedJson);
});

test('gendiff-test-yaml-json', () => {
  const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'json');
  const expectedJson = fs.readFileSync(getFixturePath('expect-json.json'), 'utf-8');

  expect(recieveYaml).toBe(expectedJson);
});
