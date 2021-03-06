/**
  * Project model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),
    Post = require('./post'),
    Project = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'animes',
      hasTimestamps: true,

      // Relation One-to-Many Project-to-Posts.
      posts: function() {
        return this.hasMany('Post')
      }
    })

module.exports = SoraBookshelf.model('Project', Project)
