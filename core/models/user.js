/**
  * User model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),
    Post = require('./post'),
    Role = require('./role'),
    User = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'users',
      hasTimestamps: true,

      // Relation One-to-Many User-to-Posts.
      posts: function() {
        return this.hasMany('Post')
      },
      role: function() {
        return this.belongsTo('Role', 'role_id')
      }
    })

module.exports = SoraBookshelf.model('User', User)
