/**
  * Log model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),
    Post = require('./post'),
    Page = require('./page'),
    Project = require('./project'),

    Log = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'logs',
      hasTimestamps: true,

      post: function() {
        return this.belongsTo('User', 'related_id')
      },
      project: function() {
        return this.belongsTo('Project', 'related_id')
      },
      page: function() {
        return this.belongsTo('Page', 'related_id')
      }
    })

module.exports = SoraBookshelf.model('Log', Log)
