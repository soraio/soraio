/**
  * Module dependencies.
  */
var express = require('express'),
    ProjectsController = express.Router(),
    // include Project model
    Project = require('../models/project')

/**
  * GET /backend/projects/add rules.
  */
ProjectsController.route('/add')
.get(function(req, res, next) {
  Project.fetchAll()
  .then(function(projects) {
    res.render('projects/add', {user: req.user})
  })
  .catch(function(err) {
    next()
  })
})

ProjectsController.route('/all')
.get(function(req, res, next) {
  Project.findAll()
  .then(function(projects){
    res.render('projects/projects', {user: req.user, projects: projects.toJSON()})
  })
  .catch(function(err) {
    next()
  })
})

ProjectsController.route('/')
.get(function(req, res, next) {
  res.redirect('/backend/projects/all')
})

module.exports = ProjectsController
