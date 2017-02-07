/**
  * Module dependencies.
  */
var express = require('express'),
    SettingsController = express.Router(),
    // include Setting model
    Setting = require('../models/setting')

SettingsController.route('/')
.get(function(req, res, next) {
  return res.redirect('backend')
})

module.exports = SettingsController
