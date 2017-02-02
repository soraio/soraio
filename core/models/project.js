/**
  * Project model.
  */
var SoraBookshelf = require('../db/database'),
    Post = require('./post'),
    Project = SoraBookshelf.Model.extend({
      tableName: 'animes',
      hasTimestamps: true,

      // Relation One-to-Many Project-to-Posts.
      posts: function() {
        return this.hasMany(Post)
      }
    })

module.exports = SoraBookshelf.model('Project', Project)
