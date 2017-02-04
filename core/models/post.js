/**
  * Post model.
  */
var SoraBookshelf = require('../db/database'),
    User = require('./user'),
    Project = require('./project'),

    Post = SoraBookshelf.Model.extend({
      tableName: 'posts',
      hasTimestamps: true,

      // Relation Many-to-One Posts-to-User.
      user: function() {
        return this.belongsTo(User)
      },
      project: function() {
        return this.belongsTo('Project', 'anime_id')
      }
    })

module.exports = SoraBookshelf.model('Post', Post)
