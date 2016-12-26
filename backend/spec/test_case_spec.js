'use strict';

const TestCase = require('../lib/TestCase');

describe('Test Case', function () {

  it('should initialize the matrix with the right size', function () {
    const N = 2;
    const subject = new TestCase({ N, M: 3, operations: [] });
    // 2 * 2 * 2 matrix
    expect(subject.matrix.length).toEqual(N);
    expect(subject.matrix[0].length).toEqual(N);
    expect(subject.matrix[0][0].length).toEqual(N);
  });

  it('should initialize the matrix with zeros', function () {
    const N = 2;
    const subject = new TestCase({ N, M: 3, operations: [] });
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        for (let k = 0; k < N; k++) {
          expect(subject.matrix[i][j][k]).toEqual(0);
        }
      }
    }
  });

  it('should work with the given sample input', function () {
    pending();
  });

  it('should call the handler function on QUERYs', function () {
    pending();
  });

  it('should not call the handler function on UPDATEs', function () {
    pending();
  });

});