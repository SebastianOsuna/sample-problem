'use strict';

const parse = require('./lib/Parser');
const TestCase = require('./lib/TestCase');

const input = `2
4 5
UPDATE 2 2 2 4
QUERY 1 1 1 3 3 3
UPDATE 1 1 1 23
QUERY 2 2 2 4 4 4
QUERY 1 1 1 3 3 3
2 4
UPDATE 2 2 2 1
QUERY 1 1 1 1 1 1
QUERY 1 1 1 2 2 2
QUERY 2 2 2 2 2 2
`;

const test = parse(input);
new TestCase(test.cases[0]).run();
new TestCase(test.cases[1]).run();
