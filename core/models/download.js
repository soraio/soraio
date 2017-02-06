/**
  * Download model.
  */
var SoraBookshelf = require('../db/database'),

    Download = SoraBookshelf.Model.extend({
      tableName: 'downloads',
      hasTimestamps: true
    })

module.exports = SoraBookshelf.model('Download', Download)
