/* eslint-disable import/extensions */
/* global describe, it */
// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import { downAccuracy, ceilAccuracy } from '../src/lib/MapHelpers.js';

describe('MapHelpers', () => {
  describe('downAccuracy', () => {
    let result;
    it('fixed to 5 digits', () => {
      result = downAccuracy(17.030501234);
      assert.equal(result, '17.03050', 'keep zero');
      result = downAccuracy(17.030509234);
      assert.equal(result, '17.03050', 'down');
    });
    it('fixed to various digits', () => {
      const num = 17.123456789;
      result = downAccuracy(num, 3);
      assert.equal(result, '17.123', 'down 3');
      result = downAccuracy(num, 4);
      assert.equal(result, '17.1234', 'down 4');
      result = downAccuracy(num, 5);
      assert.equal(result, '17.12345', 'down 5');
      result = downAccuracy(num, 6);
      assert.equal(result, '17.123456', 'down 6');
    });
  });
  describe('ceilAccuracy', () => {
    let result;
    it('fixed to 5 digits', () => {
      result = ceilAccuracy(17.0305);
      assert.equal(result, '17.03050', 'keep zero');
      result = ceilAccuracy(17.030509234);
      assert.equal(result, '17.03051', 'up');
    });
  });
});
