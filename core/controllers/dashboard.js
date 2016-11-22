/**
  * Module dependencies.
  */
var express = require('express'),
    DashboardController = express.Router()

/**
  * GET /backend/dashboard rules.
  */
DashboardController.route('/')
.get(function(req, res, next) {
  res.render('dashboard', {user: req.user})
})

module.exports = DashboardController
