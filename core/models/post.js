/**
  * Post model.
  */
var SoraBookshelf = require('../db/database')
    User = require('./user')

    Post = SoraBookshelf.Model.extend({
      tableName: 'posts',
      hasTimestamps: true,

      // Relation Many-to-One Posts-to-User.
      user: function() {
        return this.belongsTo(User)
      }
    })

module.exports = SoraBookshelf.model('Post', Post)
