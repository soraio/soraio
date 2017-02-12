/**
  * Chat model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),
    User = require('./user'),
    Chat = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'chats',
      hasTimestamps: true,

      // Relation Many-to-One.
      user: function() {
        return this.belongsTo('User', 'user_id')
      }
    })

module.exports = SoraBookshelf.model('Chat', Chat)
