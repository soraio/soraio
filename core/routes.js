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
// Public section
route.use('/', IndexController)

// Secure section, needs authenticated user to access this rules
route.use('/backend[\/]?*', ensureAuthenticated)

// Secure section, needs csrftoken to access this rules
route.use(csrf({ cookie: true }))
route.use('/auth', AuthController)

/**
  * Function to ensure if the client is authenticated
  */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next()
  else
    res.redirect('/auth/login')
}
module.exports = route
