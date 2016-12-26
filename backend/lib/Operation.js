'use strict';

module.exports = class Operation {
  /**
   * Represents an operation of a Test Case to be performed on a 3D matrix.
   * Provided coordinates are fixed for 0-indexed arrays (ie. 1 is substracted)
   * @param OP Operation type (only UPDATE and QUERY allowed)
   * @param x x-coordinate
   * @param y y-coordinate
   * @param z z-coordinate
   * @param x2 x-coordinate for QUERY operation
   * @param y2 y-coordinate for QUERY operation
   * @param z2 z-coordinate for QUERY operation
   * @param W Value to set for UPDATE operation
   */
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

  /** 
   * Applys the operation to the given matrix.
   * @returns Sum of the block if QUERY operation. Return undefined if UPDATE operation
   * @throws Error if not QUERY or UPDATE operations
  */
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