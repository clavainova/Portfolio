'use strict';

/**
 * Portfolio.js controller
 *
 * @description: A set of functions called "actions" for managing `Portfolio`.
 */

module.exports = {

  /**
   * Retrieve portfolio records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.portfolio.search(ctx.query);
    } else {
      return strapi.services.portfolio.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a portfolio record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.portfolio.fetch(ctx.params);
  },

  /**
   * Count portfolio records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.portfolio.count(ctx.query, populate);
  },

  /**
   * Create a/an portfolio record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.portfolio.add(ctx.request.body);
  },

  /**
   * Update a/an portfolio record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.portfolio.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an portfolio record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.portfolio.remove(ctx.params);
  }
};
