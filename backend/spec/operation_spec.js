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
    
    it('should add properly', function () {
      const operation = new Operation({ OP: 'QUERY', x: 1, y: 1, z: 1, x2: 2, y2: 2, z2: 2 });
      
      expect(operation.apply([[[0, 0], [0, 0]], [[0, 0], [0, 0]]])).toEqual(0);
      expect(operation.apply([[[0, 0], [0, 1]], [[1, 0], [0, 1]]])).toEqual(3);
      expect(operation.apply([[[1, 1], [1, 1]], [[1, 100], [90, 0]]])).toEqual(195);
      expect(operation.apply([[[0, 0, 20], [0, 1, 89], [0 , 0, 0]], [[1, 0, 0], [0, 1, 0], [0, 5, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]])).toEqual(3);
    });

  });

});