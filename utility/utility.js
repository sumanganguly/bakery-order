'use strict';
/*
* The following logic finds the optimal pack for the input requested quantity
* It iterates through the available packs and allocates to the order based on remaining quantity after each allocation
* It calls recursively itself to allocate items until there is no items left to be allocated
* At max there will be (number of packs available for product * number of packs available for product) number of iteration
* If the algorithm fails to allocate packs with input requested quantities, it will return error - The algorithm is not able to identify pack breakdown
*/
module.exports.findOptimalPacks = (packs, startIndex, packsQuantities, totalQuantities) => {
  let totalRemainingQuantities = totalQuantities;
  packs.forEach(function(element, index) {
    if (index >= startIndex) {
      let quantity = Math.trunc(totalRemainingQuantities/element);
      if (quantity > 0) {
        packsQuantities[index] = quantity;
        totalRemainingQuantities = totalRemainingQuantities - (quantity * element);        
      } else if (index > 0 && packsQuantities[index - 1] > 0 && (totalRemainingQuantities + (1 * packs[index - 1])) % element === 0) {
        totalRemainingQuantities = totalRemainingQuantities + (1 * packs[index - 1]);
        packsQuantities[index - 1] = packsQuantities[index - 1] - 1;
        quantity = Math.trunc(totalRemainingQuantities/element);
        packsQuantities[index] = quantity;
        totalRemainingQuantities = totalRemainingQuantities - (quantity * element);        
      } else {
        packsQuantities[index] = 0;
      }
    }
  }, this);
  if (totalRemainingQuantities === 0) {
    return packsQuantities;
  } else if (startIndex <= packs.length - 1) {
    packsQuantities[startIndex] = packsQuantities[startIndex] === 0 ? 0 : packsQuantities[startIndex] - 1;
    return this.findOptimalPacks(packs, startIndex + 1, packsQuantities, (totalQuantities - (packsQuantities[startIndex] * packs[startIndex])));
  } else {
    throw new Error('The algorithm is not able to identify pack breakdown');
  }
}
