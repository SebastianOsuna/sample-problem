'use strict';

const TestCase = require('./TestCase');

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

    return new TestCase({ N, M, operations });
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

  // const entryRegexp = `((UPDATE \\d+ \\d+ \\d+ \\d+)|(QUERY \\d+ \\d+ \\d+ \\d+ \\d+ \\d+))`;
  // const groupRegexp = `\\n(\\d+) (\\d+)\\n(${entryRegexp}+)`;
  // const inputCheck = new RegExp(`(\\d+)(${groupRegexp})+`, 'g').exec(input);
  // var groups = [];


  // // Just check input is valid
  // if (!inputCheck) {
  //   throw new Error('Invalid input: wrong format');
  // }

  // // Parse groups
  // const testCases = parseInt(inputCheck[1]);
  // var regExp = new RegExp(groupRegexp, 'g');
  // for (let i = 0; i < testCases; i++) {
  //   var parsedRegexp = regExp.exec(input);
  //   console.log(parsedRegexp);
  //   var parsedGroup = {
  //     N: parseInt(parsedRegexp[1]),
  //     M: parseInt(parsedRegexp[2]),
  //   };
  //   groups.push(parsedGroup);
  // }

  // if (testCases !== groups.length) {
  //   throw new Error('Invalid Input: T is different form the provided cases');
  // }

  // return groups;
};