/* global Job */
'use strict';

/**
 * Job.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

// Strapi utilities.
const utils = require('strapi-hook-bookshelf/lib/utils/');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');


module.exports = {

  /**
   * Promise to fetch all jobs.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    // Select field to populate.
    const withRelated = populate || Job.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const filters = convertRestQueryParams(params);

    return Job.query(buildQuery({ model: Job, filters }))
      .fetchAll({ withRelated })
      .then(data => data.toJSON());
  },

  /**
   * Promise to fetch a/an job.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Job.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    return Job.forge(_.pick(params, 'id')).fetch({
      withRelated: populate
    });
  },

  /**
   * Promise to count a/an job.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = convertRestQueryParams(params);

    return Job.query(buildQuery({ model: Job, filters: _.pick(filters, 'where') })).count();
  },

  /**
   * Promise to add a/an job.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Job.associations.map(ast => ast.alias));
    const data = _.omit(values, Job.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Job.forge(data).save();

    // Create relational data and return the entry.
    return Job.updateRelations({ id: entry.id , values: relations });
  },

  /**
   * Promise to edit a/an job.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Job.associations.map(ast => ast.alias));
    const data = _.omit(values, Job.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Job.forge(params).save(data);

    // Create relational data and return the entry.
    return Job.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an job.
   *
   * @return {Promise}
   */

  remove: async (params) => {
    params.values = {};
    Job.associations.map(association => {
      switch (association.nature) {
        case 'oneWay':
        case 'oneToOne':
        case 'manyToOne':
        case 'oneToManyMorph':
          params.values[association.alias] = null;
          break;
        case 'oneToMany':
        case 'manyToMany':
        case 'manyToManyMorph':
          params.values[association.alias] = [];
          break;
        default:
      }
    });

    await Job.updateRelations(params);

    return Job.forge(params).destroy();
  },

  /**
   * Promise to search a/an job.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = strapi.utils.models.convertParams('job', params);
    // Select field to populate.
    const populate = Job.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const associations = Job.associations.map(x => x.alias);
    const searchText = Object.keys(Job._attributes)
      .filter(attribute => attribute !== Job.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['string', 'text'].includes(Job._attributes[attribute].type));

    const searchInt = Object.keys(Job._attributes)
      .filter(attribute => attribute !== Job.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['integer', 'decimal', 'float'].includes(Job._attributes[attribute].type));

    const searchBool = Object.keys(Job._attributes)
      .filter(attribute => attribute !== Job.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['boolean'].includes(Job._attributes[attribute].type));

    const query = (params._q || '').replace(/[^a-zA-Z0-9.-\s]+/g, '');

    return Job.query(qb => {
      if (!_.isNaN(_.toNumber(query))) {
        searchInt.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query)}`);
        });
      }

      if (query === 'true' || query === 'false') {
        searchBool.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query === 'true')}`);
        });
      }

      // Search in columns with text using index.
      switch (Job.client) {
        case 'mysql':
          qb.orWhereRaw(`MATCH(${searchText.join(',')}) AGAINST(? IN BOOLEAN MODE)`, `*${query}*`);
          break;
        case 'pg': {
          const searchQuery = searchText.map(attribute =>
            _.toLower(attribute) === attribute
              ? `to_tsvector(${attribute})`
              : `to_tsvector('${attribute}')`
          );

          qb.orWhereRaw(`${searchQuery.join(' || ')} @@ to_tsquery(?)`, query);
          break;
        }
      }

      if (filters.sort) {
        qb.orderBy(filters.sort.key, filters.sort.order);
      }

      if (filters.skip) {
        qb.offset(_.toNumber(filters.skip));
      }

      if (filters.limit) {
        qb.limit(_.toNumber(filters.limit));
      }
    }).fetchAll({
      withRelated: populate
    });
  }
};
