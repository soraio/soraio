/**
  * Module dependencies.
  */
var express = require('express'),
    route = express(),
    path = require('path'),
    IndexController = require('./controllers/index'),
    AuthController = require('./controllers/auth'),
    csrf = require('csurf')

/**
  * Setting up views directory.
  */
route.set('views', path.join(__dirname, 'views'))
route.locals.moment = require('moment')

/**
  * Routing the controllers.
  */
route.use('/', IndexController)

// Secure section, needs csrftoken to access this rules
route.use(csrf({ cookie: true }))
route.use('/auth', AuthController)

module.exports = route
