'use strict';

const productConfig = require('../config/product-config');
const jsonPath = require('jsonpath');
const logger = require('../logger').getLogger('bakery-order');
const utility = require('../utility/utility');

class ProductImplementation {
  constructor(productCode) {
    /*
    * Based on input product code, parse the product config JSON object to load the selected product details
    * It may return an error if the input product code is not found in product config file
    */
    let product = null; 
    try {
      product = jsonPath.query(productConfig, '$.products[?(@.code =="' + productCode + '")]');
    } catch(err) {
      logger.error(err, 'Error occurred while parsing product config');
    }
    if (product && product instanceof Array && product.length > 0) {
      logger.debug('product has been identified successfully');
      this.product = product[0];
    } else {
      logger.warn('product identification failed for invalid product code %s', productCode);
      throw new Error('Invalid Product Code');
    }
  }

  getPackPrice(packQuantity) {
    /*
    * this operation will return the specific pack details (price and quantity) based on input quantity
    */
    if (!this.product) {
      logger.error('no valid product associated with the object');
      throw new Error('Invalid product exception');      
    } else {
      let pack = null;
      try {
        pack = jsonPath.query(this.product, '$.packs[?(@.quantity =="' + packQuantity + '")]');
      } catch(err) {
        logger.error(err, 'Error occurred while parsing packs');
      }
      if (pack && pack instanceof Array && pack.length > 0) {
        logger.debug('pack has been identified successfully');
        return pack[0].price;
      } else {
        logger.warn('pack identification failed for invalid pack quantity %s', packQuantity);
        throw new Error('Invalid pack quantity');
      }
    }
  }

  getOptimalPacks(totalQuantities) {
    if (!this.product) {
      logger.error('no valid product associated with the object');
      throw new Error('Invalid product exception');      
    } else {
      /*
      * Push packs available for the product in an array and then sort it in descending order 
      * so that we can assign the packs with maximum quantity pack size
      */
      let packs = [];
      let packsQuantities = [];
      this.product.packs.forEach(function(element) {
        packs.push(element.quantity);
        packsQuantities.push(0);
      }, this);
      packs.sort().reverse();
      logger.debug('Available packs are identified and sorted before processing the order', packs);
      /*
      * Using the above sorted pack array, prepare the order using the below utility method
      */
      packsQuantities = utility.findOptimalPacks(packs, 0, packsQuantities, totalQuantities);
      logger.debug('Packs are identified successfully based on the specified input quantity', packsQuantities);
      let packDetails = [];
      let totalPrice = 0
      /*
      * Once we get selected packs, below code calculates the total price and generates the allocated pack details
      */
      packs.forEach(function(element, index) {
        const packPrice = this.getPackPrice(element);
        const quantities = packsQuantities[index];
        if (quantities > 0) {
          totalPrice = totalPrice + ( packPrice * quantities);
          packDetails.push({pack: element, price: packPrice, quantity: quantities});
        }
      }, this);
      logger.debug('Total price for the order has been calculated and final selected packs are identified. Total price $%s and packs:', Math.round(totalPrice * 100) / 100, packDetails);
      /*
      * Retrun the total price and pack details to caller
      */
      return {totalPrice: '$' + Math.round(totalPrice * 100) / 100, totalQuantities: totalQuantities, product: this.product.code, packs: packDetails};
    }
  }
}
module.exports = ProductImplementation;
