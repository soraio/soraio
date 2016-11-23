/**
  * Module dependencies.
  */
var express = require('express'),
    route = express(),
    path = require('path'),
    IndexController = require('./controllers/index'),
    AuthController = require('./controllers/auth'),
    DashboardController = require('./controllers/dashboard'),
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
route.get('(\/+(wp-)?admin)|(\/+dashboad)|(\/+backend)', ensureAuthenticated, function(req, res, next){
  res.redirect('/backend/dashboard')
})
route.use('/backend/dashboard', DashboardController)
route.use('/backend/posts', Posts)

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
