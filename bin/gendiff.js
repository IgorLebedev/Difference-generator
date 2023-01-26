#!/usr/bin/env node
import { program } from "commander";

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1', '-v, --version', 'output the current version')
  .option('-f, --format <type>', 'output format');

program.parse()