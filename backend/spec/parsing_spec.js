'use strict';

const Parser = require('../parser');

describe('Input parsing', function () {

  it('should parse operations parameters', function () {
    const result = Parser(`1
      1 3
      UPDATE 1 2 3 4
      QUERY 1 12 89 123 1 0
      UPDATE 5 6 7 3`);
    const operations = result.cases[0].operations;
    expect(operations.length).toEqual(3);
    // Check operation type
    expect(operations[0].OP).toEqual('UPDATE');
    expect(operations[1].OP).toEqual('QUERY');
    expect(operations[2].OP).toEqual('UPDATE');
    // Check Update parameters
    expect(operations[2].x).toEqual(5);
    expect(operations[2].y).toEqual(6);
    expect(operations[2].z).toEqual(7);
    expect(operations[2].W).toEqual(3);
    // Check Query parameters
    expect(operations[1].x).toEqual(1);
    expect(operations[1].y).toEqual(12);
    expect(operations[1].z).toEqual(89);
    expect(operations[1].x2).toEqual(123);
    expect(operations[1].y2).toEqual(1);
    expect(operations[1].z2).toEqual(0);
  });

  it('should parse the right number of operations per group', function () {
    const result = Parser(`1
      1 3
      UPDATE 1 1 1 2
      QUERY 1 1 1 1 1 1
      UPDATE 1 1 1 3`);
    expect(result.cases[0].operations.length).toEqual(3);
    expect(result.cases[0].M).toEqual(3);
  });

  it('should should fail if there are missing cases', function () {
    try {
      // it should require more cases to be added
      const result = Parser(`3
      1 1
      UPDATE 1 1 1 2
      2 3
      QUERY 1 1 1 1 1 1`);
      fail();
    } catch(error) {
      expect(error).toBeTruthy();
    }
  });

  it('should ignore extra test cases', function () {
    try {
      // it should ignore other cases
      const result = Parser(`1
      1 1
      UPDATE 1 1 1 2
      2 3
      QUERY 1 1 1 1 1 1`);
      expect(result.T).toEqual(1);
      expect(result.cases.length).toEqual(1);
    } catch(error) {
      fail(error.message);
    }
  });

  it('should catch invalid number of test cases', function () {
    // 0 Is an invalid number of test cases
    try {
      Parser(`0`);
      fail();
    } catch(error) {
      expect(error.message).toEqual('Invalid number of test cases');
    }

    // the number of test cases should be positive
    try {
      Parser(`-1`);
      fail();
    } catch(error) {
      expect(error.message).toEqual('Invalid number of test cases');
    }

    // The number of test cases should be a number
    try {
      Parser(`a
      1 1
      UPDATE 1 1 1 2
      2 3
      QUERY 1 1 1 1 1 1`)
      fail();
    } catch(error) {
      expect(error.message).toEqual('Invalid number of test cases');
    }
  });

});