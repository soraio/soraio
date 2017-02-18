/**
  * Post model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),
    User = require('./user'),
    Project = require('./project'),

    Post = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'posts',
      hasTimestamps: true,

      // Relation Many-to-One Posts-to-User.
      user: function() {
        return this.belongsTo('User', 'user_id')
      },
      project: function() {
        return this.belongsTo('Project', 'anime_id')
      }
    })

module.exports = SoraBookshelf.model('Post', Post)
