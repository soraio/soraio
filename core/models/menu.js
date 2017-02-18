/**
  * Menu model.
  */
var dbPrefix = require('../../conf/config').dbPrefix,
    SoraBookshelf = require('../db/database'),

    Menu = SoraBookshelf.Model.extend({
      tableName: dbPrefix + 'menus',
      hasTimestamps: true
    })

module.exports = SoraBookshelf.model('Menu', Menu)
