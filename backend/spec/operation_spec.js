'use strict';

const Operation = require('../lib/Operation');

describe('Operation', function () {

  describe('UPDATE', function () {

    it('should correct index array reference', function () {
      const operation = new Operation({ OP: 'UPDATE', x: 1, y: 1, z: 2, W: 3 });
      var subject = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];

      operation.apply(subject);

      expect(subject[0][0][1]).toEqual(3);
      expect(subject[1][1][2]).toBeUndefined();
    });

    it('should return a falsy value', function () {
      const operation = new Operation({ OP: 'UPDATE', x: 1, y: 1, z: 2, W: 3 });
      var subject = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
      expect(operation.apply(subject)).toBeFalsy();
    });

  });

  describe('QUERY', function () {
    pending();
  });

});