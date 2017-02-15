/**
  * Role model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),
    User = require('./user'),
    Role = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'roles',

      // Relation One-to-Many Role-to-Users.
      users: function() {
        return this.hasMany('User')
      }
    })

module.exports = SoraBookshelf.model('Role', Role)
