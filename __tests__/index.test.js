import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let expectedStylish;
let expectedPlain;
let expectedJson;

beforeAll(() => {
  expectedStylish = fs.readFileSync(getFixturePath('expect-stylish.txt'), 'utf-8');
  expectedPlain = fs.readFileSync(getFixturePath('expect-plain.txt'), 'utf-8');
  expectedJson = fs.readFileSync(getFixturePath('expect-json.json'), 'utf-8');
});

test('gendiff-test-json-stylish', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

  expect(recieveJson).toBe(expectedStylish);
});

test('gendiff-test-yaml-stylish', () => {
  const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));

  expect(recieveYaml).toBe(expectedStylish);
});

test('gendiff-test-json-plain', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');

  expect(recieveJson).toBe(expectedPlain);
});

test('gendiff-test-yaml-plain', () => {
  const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain');

  expect(recieveYaml).toBe(expectedPlain);
});

test('gendiff-test-json-json', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');

  expect(recieveJson).toBe(expectedJson);
});

test('gendiff-test-yaml-json', () => {
  const recieveYaml = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'json');

  expect(recieveYaml).toBe(expectedJson);
});
