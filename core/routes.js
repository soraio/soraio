/**
  * Module dependencies.
  */
var express = require('express'),
    route = express.Router(),
    path = require('path'),
    IndexController = require('./controllers/index'),
    AuthController = require('./controllers/auth'),
    DashboardController = require('./controllers/dashboard'),
    PostsController = require('./controllers/posts'),
    ProjectsController = require('./controllers/projects'),
    csrf = require('csurf')

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
route.use('/backend/posts', PostsController)
route.use('/backend/projects', ProjectsController)

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
