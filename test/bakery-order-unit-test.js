'use strict';
const ProductImplementation = require('../product/product-implementation');
const assert = require('assert');

describe('Testing bakery orders', () => {
  it('Should get order processed successfully - 10 VS5', () => {
    const productImpl = new ProductImplementation('VS5');
    const result = productImpl.getOptimalPacks(10);
    expect(result.totalPrice).toBe('$17.98');
  });

  it('Should get order processed successfully - 14 MB11', () => {
    const productImpl = new ProductImplementation('MB11');
    const result = productImpl.getOptimalPacks(14);
    expect(result.totalPrice).toBe('$54.8');
  });

  it('Should get order processed successfully - 13 CF', () => {
    const productImpl = new ProductImplementation('CF');
    const result = productImpl.getOptimalPacks(13);
    expect(result.totalPrice).toBe('$25.85');
  });

  it('Should get invalid product code error', () => {
    assert.throws(function() {new ProductImplementation('ABCD');}, Error);
  });

  it('Should get error as the algorithm can not allocate packs for this order', () => {
    const productImpl = new ProductImplementation('VS5');
    assert.throws(function() {productImpl.getOptimalPacks(4);}, Error);
  });
})
