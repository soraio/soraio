/**
  * Setting up database uses bookshelf ORM.
  */
var config    = require('../../conf/config'),

    // Selects the correct DB config object for the current environment.
    knex      = require('knex')(require('../../knexfile')[config.environment]),
    bookshelf = require('bookshelf')(knex)

    // Resolve circular dependencies with relations.
    bookshelf.plugin('registry')
    bookshelf.plugin('pagination')
    bookshelf.plugin(require('bookshelf-modelbase').pluggable)

module.exports = bookshelf
