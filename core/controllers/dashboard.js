/**
  * Module dependencies.
  */
var express = require('express'),
    DashboardController = express.Router(),
    Page = require('../models/page')

/**
  * GET /backend/dashboard rules.
  */
DashboardController.route('/')
.get(function(req, res, next) {
  res.render('dashboard', {user: req.user, message: req.flash('info')})
})

/**
  * GET /backend/dashboard rules.
  */
DashboardController.route('/menu')
.get(function(req, res, next) {
  Page
  .fetchAll()
  .then(function(pages) {
    res.render('settings/menu', {user: req.user, pages: pages.toJSON(), message: req.flash('info')})
  })
  .catch(function(err) {
    next(err)
  })
})

module.exports = DashboardController
