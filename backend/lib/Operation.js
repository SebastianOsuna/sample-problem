'use strict';

module.exports = class Operation {
  constructor(params) {
    this.OP = params.OP;
    this.x = params.x;
    this.y = params.y;
    this.z = params.z;
    this.x2 = params.x2;
    this.y2 = params.y2;
    this.z2 = params.z2;
    this.W = params.W;
  }

  apply(matrix) {
    if (this.OP === 'UPDATE') {
      matrix[this.x][this.y][this.z] = this.W;
    } else if (this.OP === 'QUERY') {
      
    } else {
      throw new Error(`Unknown Operation ${this.OP}`);
    }
  }
}