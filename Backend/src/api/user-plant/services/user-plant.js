'use strict';

/**
 * user-plant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-plant.user-plant');
