'use strict';

/**
 * Hyperlink.js controller
 *
 * @description: A set of functions called "actions" for managing `Hyperlink`.
 */

module.exports = {

  /**
   * Retrieve hyperlink records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.hyperlink.search(ctx.query);
    } else {
      return strapi.services.hyperlink.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a hyperlink record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.hyperlink.fetch(ctx.params);
  },

  /**
   * Count hyperlink records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.hyperlink.count(ctx.query, populate);
  },

  /**
   * Create a/an hyperlink record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.hyperlink.add(ctx.request.body);
  },

  /**
   * Update a/an hyperlink record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.hyperlink.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an hyperlink record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.hyperlink.remove(ctx.params);
  }
};
