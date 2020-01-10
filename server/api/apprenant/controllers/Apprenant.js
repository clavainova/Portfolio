'use strict';

/**
 * Apprenant.js controller
 *
 * @description: A set of functions called "actions" for managing `Apprenant`.
 */

module.exports = {

  /**
   * Retrieve apprenant records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.apprenant.search(ctx.query);
    } else {
      return strapi.services.apprenant.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a apprenant record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.apprenant.fetch(ctx.params);
  },

  /**
   * Count apprenant records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.apprenant.count(ctx.query, populate);
  },

  /**
   * Create a/an apprenant record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.apprenant.add(ctx.request.body);
  },

  /**
   * Update a/an apprenant record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.apprenant.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an apprenant record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.apprenant.remove(ctx.params);
  }
};
