'use strict';

/**
 * inventory-item service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::inventory-item.inventory-item');
