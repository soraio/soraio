/**
  * Page model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),
    User = require('./user'),

    Page = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'pages',
      hasTimestamps: true,

      // Relation Many-to-One Pages-to-User.
      user: function() {
        return this.belongsTo('User', 'user_id')
      }
    })

module.exports = SoraBookshelf.model('Page', Page)
