/**
  * Project model.
  */
var SoraBookshelf = require('../db/database'),
    User = require('./user'),
    Role = SoraBookshelf.Model.extend({
      tableName: 'roles',

      // Relation One-to-Many Role-to-Users.
      users: function() {
        return this.hasMany(User)
      }
    })

module.exports = SoraBookshelf.model('Role', Role)
