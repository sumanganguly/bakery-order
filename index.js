'use strict';

const ProductImplementation = require('./product/product-implementation');
const logger = require('./logger').getLogger('bakery-order');
const readline = require('readline');

/*
* The following lines of code will create interface to read commandline input
* One command will be added into the order array once 'Enter' key is pressed
*/

let orders = [];
let packDetailsOnOrders = [];

const orderCommands = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

orderCommands.prompt();

orderCommands.on('line', function (cmd) {
    orders.push(cmd);
});

orderCommands.on('close', function (cmd) {
/*
* System will start processing when all orders are entered and CTRL + C is pressed in command prompt
*/  
  orders.forEach(function(element) {
    const order = element.split(' ');
    if (order && order.length === 2) {
      /*
      The program splits each input order and expects first argument in an order to be quantity and the second item to be the product code
      If less than two inputs are provided for any order, system will log an error - Invalid arguments! and that order won't be processed at all
      */
      const orderQuantity = order[0];
      const product = order[1];
      try {
        /*
        Instantiate product implementation object from the input product code
        If invalid product code is provided, system will return error, else it will proceed to order packs based on qrder quantity
        */
        const productImpl = new ProductImplementation(product);
        packDetailsOnOrders.push(productImpl.getOptimalPacks(parseInt(orderQuantity)));
      } catch (err) {
        logger.error(err, 'Error occurred while processing the request. Product:%s, Quantity:%s', product, orderQuantity);
      }
    } else {
      logger.error('Invalid arguments! - ' + JSON.stringify(order));
    }
  }, this);

  /*
  * Prting the order result below
  */
  logger.debug('::The order pack allocation result::');
  logger.debug('************************************');
  packDetailsOnOrders.forEach(function(element) {
    logger.debug(element.totalQuantities + ' ' + element.product + ' ' + element.totalPrice);
    element.packs.forEach(function(pack) {
      logger.debug('\t' + pack.quantity + ' X ' + pack.pack + ' ' + '$'+ pack.price);
    }, this); 
  }, this);		

  process.exit(0);
});
