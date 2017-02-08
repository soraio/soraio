/**
  * Module dependencies.
  */
var express = require('express'),
    SettingsController = express.Router(),
    // include Setting model
    Setting = require('../models/setting')

SettingsController.route('/')
.get(function(req, res, next) {
  return res.render('settings/settings', {user: req.user, message: req.flash('info')})
})
.post(function(req, res, next) {
  var data = req.body
  req.flash('info', 'Success saving current site settings.')
  Setting.upsert({key: 'site_title'}, {value: data.siteTitle})
  Setting.upsert({key: 'site_description'}, {value: data.siteDescription})
  Setting.upsert({key: 'site_irc'}, {value: data.siteIrc})
  Setting.upsert({key: 'site_favicon'}, {value: data.siteFavicon})
  Setting.upsert({key: 'site_page_rows'}, {value: data.sitePageRows})
  return res.redirect('/backend/settings')
})

module.exports = SettingsController
