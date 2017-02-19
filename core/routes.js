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
    PagesController = require('./controllers/pages'),
    ProjectsController = require('./controllers/projects'),
    UsersController = require('./controllers/users'),
    DownloadsController = require('./controllers/downloads'),
    SettingsController = require('./controllers/settings'),
    ProfileController = require('./controllers/profile'),
    ApiController = require('./controllers/api'),
    csrf = require('csurf'),
    Log = require('./models/log')

/**
  * Routing the controllers.
  */
// Public section
route.use('/', IndexController)
route.use('/downloads', DownloadsController)
route.use('/profile', ProfileController, function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  Log.create({type: 'home', related_id: 0, ip: ip})
  return next()
})

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
  return res.redirect('/backend/dashboard')
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
route.post('/api/menu', ensureAuthenticated)
route.use('/api', ApiController)
route.use('/backend/dashboard', DashboardController)
route.use('/backend/posts', PostsController)
route.use('/backend/pages', PagesController)
route.use('/backend/projects', ProjectsController)
route.use('/backend/users', UsersController)
route.use('/backend/settings', SettingsController)

// Secure section, needs csrftoken to access this rules
route.use(csrf({ cookie: true }))
route.use('/auth', function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  Log.create({type: 'home', related_id: 0, ip: ip})
  return next()
}, AuthController)

/**
  * Function to ensure if the client is authenticated
  */
function ensureAuthenticated(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/auth/login')
}
module.exports = route
