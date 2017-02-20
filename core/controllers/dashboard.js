/**
  * Module dependencies.
  */
var express = require('express'),
    DashboardController = express.Router(),
    Page = require('../models/page'),
    Log = require('../models/log')

/**
  * GET /backend/dashboard rules.
  */
DashboardController.route('/')
.get(function(req, res, next) {
  Log
  .query(function(qb) {
    qb.where('type', '!=', 0)
  })
  .fetchAll()
  .then(function(visitors) {
    var downloads = 0, views = 0
    visitors = visitors.toJSON()
    for(var visitor of visitors) {
      switch (visitor.type) {
        case 'download':
          downloads++
          break
        default:
          views++
      }
    }
    var chart = {views: views, downloads: downloads}
    res.render('dashboard', {user: req.user, chart: chart, message: req.flash('info')})
  })
})

/**
  * GET /backend/dashboard/menu rules.
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
