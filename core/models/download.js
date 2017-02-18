/**
  * Download model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),

    Download = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'downloads',
      hasTimestamps: true
    })

module.exports = SoraBookshelf.model('Download', Download)
