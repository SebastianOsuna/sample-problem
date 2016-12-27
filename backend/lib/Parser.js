'use strict';

const TestCase = require('./TestCase');

/**
 * Parses the Input as described in https://www.hackerrank.com/challenges/cube-summation.
 * @throws Error if T is not a greater-than-0 number
 * @throws Error if any line doesn\'t conform to the rules.
 * @returns Plain object with the parsed information { T, cases: [{N, M, operations: [{ OP, x, y, z, W, x2, y2, z2 }] }] }.
 */
module.exports = function parse(input) {
  const lines = input.split('\n');
  const T = parseInt(lines.shift());

  if (!T || T < 1) {
    throw new Error('Invalid number of test cases');
  }

  var cases = [];

  function parseTestCase() {
    const l = /(\d+) (\d+)/g.exec(lines.shift());
    if (!l) throw new Error('Invalid Group header (N M)');
    const N = parseInt(l[1]), M = parseInt(l[2]);
    var operations = [];

    for (let i = 0; i < M; i++) {
      operations.push(parseOperation());
    }

    return { N, M, operations };
  }

  function parseOperation() {
    const l = /(UPDATE|QUERY) (\d+) (\d+) (\d+) (\d+)( (\d+) (\d+))?/g.exec(lines.shift());
    if (!l) throw new Error('Invalid line');

    var operation = {
      OP: l[1],
      x: parseInt(l[2]),
      y: parseInt(l[3]),
      z: parseInt(l[4]),
    };

    if (l[6]) {
      operation.x2 = parseInt(l[5]);
      operation.y2 = parseInt(l[7]);
      operation.z2 = parseInt(l[8]);
    } else {
      operation.W = parseInt(l[5]);
    }
    return operation;
  }

  for (let i = 0; i < T; i++) {
    cases.push(parseTestCase());
  }

  return { T, cases };
};