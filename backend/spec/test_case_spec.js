'use strict';

const TestCase = require('../lib/TestCase');
const Parser = require('../lib/Parser');

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
      QUERY 2 2 2 2 2 2`; 
    const sample = Parser(input);

    // Case 1:
    sample.cases[0].handler = function () {};
    spyOn(sample.cases[0], 'handler');
    new TestCase(sample.cases[0]).run();
    expect(sample.cases[0].handler).toHaveBeenCalledTimes(3);
    expect(sample.cases[0].handler).toHaveBeenCalledWith(4);
    expect(sample.cases[0].handler).toHaveBeenCalledWith(4);
    expect(sample.cases[0].handler).toHaveBeenCalledWith(27);

    // Case 2:
    sample.cases[1].handler = function () {};
    spyOn(sample.cases[1], 'handler');
    new TestCase(sample.cases[1]).run();
    expect(sample.cases[1].handler).toHaveBeenCalledTimes(3);
    expect(sample.cases[1].handler).toHaveBeenCalledWith(0);
    expect(sample.cases[1].handler).toHaveBeenCalledWith(1);
    expect(sample.cases[1].handler).toHaveBeenCalledWith(1);
  });

  it('should call the handler function on QUERYs', function () {
    const subject = new TestCase({ 
      N: 1, 
      operations: [{ OP: 'QUERY', x: 1, y: 1, z: 1, x2: 1, y2: 1, z2: 1}],
      handler: function () {},
    });
    spyOn(subject, 'handler');
    subject.run();
    expect(subject.handler).toHaveBeenCalled();
  });

  it('should not call the handler function on UPDATEs', function () {
    const subject = new TestCase({ 
      N: 1, 
      operations: [{ OP: 'UPDATE', x: 1, y: 1, z: 1, W: 3}],
      handler: function () {},
    });
    spyOn(subject, 'handler');
    subject.run();
    expect(subject.handler).not.toHaveBeenCalled();
  });

});

