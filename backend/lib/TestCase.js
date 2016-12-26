'use strict';

const Operation = require('./Operation');

module.exports = class TestCase {
  constructor(params) {
    this.N = params.N;
    this.M = params.M;
    this.operations = (params.operations || []).map(o => o instanceof Operation ? o : new Operation(o));
    this.handler = params.handler || console.log;
    this.resetMatrix();
  }

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

  run() {
    this.operations.forEach(op => {
      const result = op.apply(this.matrix);
      if (result != null) { // only null and undefined should be skipped
        this.handler(result);
      }
    });
  }
}

function zerosArray(n) {
  var array = [];
  for (let i = 0; i < n; i++) {
    array.push(0);
  }
  return array;
}