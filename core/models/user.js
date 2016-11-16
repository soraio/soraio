/**
  * User model.
  */
var SoraBookshelf = require('../db/database')
    Post = require('./post')
    User = SoraBookshelf.Model.extend({
      tableName: 'users',
      hasTimestamps: true,

      // Relation One-to-Many User-to-Posts.
      posts: function() {
        return this.hasMany(Post)
      }
    })

module.exports = SoraBookshelf.model('User', User)
