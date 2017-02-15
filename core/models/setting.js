/**
  * Setting model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),

    Setting = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'settings',
      hasTimestamps: true
    })

module.exports = SoraBookshelf.model('Setting', Setting)
