# Difference Generator

---

### Hexlet tests and linter status:
[![Actions Status](https://github.com/IgorLebedev/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/IgorLebedev/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d009c27ea66c9dc9a474/maintainability)](https://codeclimate.com/github/IgorLebedev/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d009c27ea66c9dc9a474/test_coverage)](https://codeclimate.com/github/IgorLebedev/frontend-project-46/test_coverage)
[![Linter & Jest](https://github.com/IgorLebedev/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/IgorLebedev/frontend-project-46/actions/workflows/main.yml)

---

### Description
A difference generator is a program that determines the difference between two data structures. This is a popular task for which there are many online services, such as [JSON Diff](http://www.jsondiff.com/). A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.
##### Utility features:
+ Support for different input formats: **yaml**, **json**
+ Report generation as **plain text**, **stylish** and **json**

---

### Requirements:  

+ Node.js version v.18.12.1 or later
+ Npm package version 8.19.2 or later
+ GNU Make version 4.2.1 or later

---

### Deploy:  
1. Clone project

        git@github.com:IgorLebedev/frontend-project-46.git
2. Install dependencies

        make install

---

### Usage example:
1. Help:

        gendiff --help
        Usage: gendiff [options] <filepath1> <filepath2>

        Compares two configuration files and shows a difference.

        Options:
          -v, --version        output the current version
          -f, --format <type>  output format (default: "stylish")
          -h, --help           display help for command
2. Plain format:

        gendiff --format plain path/to/file.yml another/path/file.json

        Property 'common.follow' was added with value: false
        Property 'group1.baz' was updated. From 'bas' to 'bars'
        Property 'group2' was removed
3. Stylish format:

        gendiff filepath1.json filepath2.json

        {
          + follow: false
            setting1: Value 1
          - setting2: 200
          - setting3: true
          + setting3: {
                key: value
            }
          + setting4: blah blah
          + setting5: {
                key5: value5
            }
        }


### Demonstration

### Stylish output:
[![Stylish](https://asciinema.org/a/MUn9aJNsjU13KKQADn0x3E96H.svg)](https://asciinema.org/a/MUn9aJNsjU13KKQADn0x3E96H)

### Plain output:
[![Plain](https://asciinema.org/a/GhaHXU2i3TFBZWh8GoRf1OlO1.svg)](https://asciinema.org/a/GhaHXU2i3TFBZWh8GoRf1OlO1)

### JSON output:
[![JSON](https://asciinema.org/a/44m0dlQHhl6RVri8hoZmWlY91.svg)](https://asciinema.org/a/44m0dlQHhl6RVri8hoZmWlY91)