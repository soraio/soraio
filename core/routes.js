/**
  * Module dependencies.
  */
var express = require('express'),
    route = express(),
    path = require('path'),
    IndexController = require('./controllers/index')

/**
  * Setting up views directory.
  */
route.set('views', path.join(__dirname, 'views'))
route.locals.moment = require('moment')

/**
  * Routing the controllers.
  */
route.use('/', IndexController)

module.exports = route
