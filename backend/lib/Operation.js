'use strict';

module.exports = class Operation {
  // Coordinates are substracted 1 since arrays are 0-indexed
  constructor(params) {
    this.OP = params.OP;
    this.x = params.x - 1;
    this.y = params.y - 1;
    this.z = params.z - 1;
    this.x2 = params.x2 ? params.x2 - 1 : null;
    this.y2 = params.y2 ? params.y2 - 1 : null;
    this.z2 = params.z2 ? params.z2 - 1 : null;
    this.W = params.W;
  }

  apply(matrix) {
    if (this.OP === 'UPDATE') {
      matrix[this.x][this.y][this.z] = this.W;
    } else if (this.OP === 'QUERY') {
      return sumOver(matrix, [this.x, this.y, this.z], [this.x2, this.y2, this.z2]);
    } else {
      throw new Error(`Unknown Operation ${this.OP}`);
    }
  }
}

function sumOver(matrix, coordsInit, coordsEnd) {
  var sum = 0;
  for (let i = coordsInit[0]; i <= coordsEnd[0]; i++) {
    for (let j = coordsInit[1]; j <= coordsEnd[1]; j++) {
      for (let k = coordsInit[2]; k <= coordsEnd[2]; k++) {
        sum += matrix[i][j][k];
      }
    }
  }
  return sum;
}