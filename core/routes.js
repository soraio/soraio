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
    UsersController = require('./controllers/users'),
    DownloadsController = require('./controllers/downloads'),
    SettingsController = require('./controllers/settings'),
    ProfileController = require('./controllers/profile'),
    ApiController = require('./controllers/api'),
    csrf = require('csurf')

/**
  * Routing the controllers.
  */
// Public section
route.use('/', IndexController)
route.use('/downloads', DownloadsController)
route.use('/api', ApiController)

// Secure section, needs authenticated user to access this rules
route.use('/backend[\/]?*', ensureAuthenticated, function(req, res, next) {
  switch (req.user.role_id) {
    case 1:
      return next()
      break
    case 2:
      return next()
      break
    default:
      req.flash('info', 'Sorry you aren\'t part of the management users.')
      return res.redirect('/')
  }
})
route.get('(\/+(wp-)?admin)|(\/+dashboad)|(\/+backend)', ensureAuthenticated, function(req, res, next){
  res.redirect('/backend/dashboard')
})
route.use('/backend/+(users/+(add|delete|edit)+/:pid?|settings)', function(req, res, next) {
  switch (req.user.role_id) {
    case 1:
      return next()
      break
    default:
      req.flash('info', 'Role admin required to access this section.')
      return res.redirect('/backend/dashboard')
  }
})
route.use('/profile', ProfileController)
route.use('/backend/dashboard', DashboardController)
route.use('/backend/posts', PostsController)
route.use('/backend/projects', ProjectsController)
route.use('/backend/users', UsersController)
route.use('/backend/settings', SettingsController)

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
