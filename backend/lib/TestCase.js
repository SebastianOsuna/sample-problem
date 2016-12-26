'use strict';

const Operation = require('./Operation');

/**
 * A Test Case representation.
 * @param params.N Matrix size
 * @param params.M Operations count
 * @param params.operation Array of operations to be performed.
 * @param params.handler Handler function for returned values of any operation. Defaults to console.log
 */
module.exports = class TestCase {
  constructor(params) {
    this.N = params.N;
    this.M = params.M;
    this.operations = (params.operations || []).map(o => o instanceof Operation ? o : new Operation(o));
    this.handler = params.handler || console.log;
    this.resetMatrix();
  }

  /**
   * Resets the current matrix to be a N * N * N zeroed matrix
   */
  resetMatrix() {
    this.matrix = [];
    const zeros = zerosArray(this.N);

    for (let i = 0; i < this.N; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.N; j++) {
        // Copy zero array
        this.matrix[i][j] = zeros.slice();
      } 
    }
  }

  /**
   * Applies the test case operations to the matrix.
   * If any operations returns a not null value, the handler function will be called 
   * with the returned value as parameter.
   */
  run() {
    this.operations.forEach(op => {
      const result = op.apply(this.matrix);
      if (result != null) { // only null and undefined should be skipped
        this.handler(result);
      }
    });
  }
}

/**
 * Returns an array of length n filled with only 0s
 */
function zerosArray(n) {
  var array = [];
  for (let i = 0; i < n; i++) {
    array.push(0);
  }
  return array;
}