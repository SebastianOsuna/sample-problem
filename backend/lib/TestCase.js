'use strict';

module.exports = class TestCase {
  constructor(params) {
    this.N = params.N;
    this.M = params.M;
    this.operations = params.operations;
    resetMatrix();
  }

  resetMatrix() {
    this.matrix = [];
    const ceros = ceros(this.N);

    for (let i = 0; i < this.N; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.N; j++) {
        // Copy zero array
        this.matrix[i][j] = [].splice.call(ceros);
      } 
    }
  }

  run() {
    this.operations.forEach(op => op.apply(this.matrix));
  }
}

function ceros(n) {
  var array = [];
  for (let i = 0; i < n; i++) {
    array.push(0);
  }
}