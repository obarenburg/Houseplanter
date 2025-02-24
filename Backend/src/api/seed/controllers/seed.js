'use strict';

/**
 * seed controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::seed.seed');
