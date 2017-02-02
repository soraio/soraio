/**
  * Module dependencies.
  */
var express = require('express'),
    ProjectsController = express.Router(),
    // include Project model
    Project = require('../models/project'),
    request = require('request')

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
.post(function(req, res, next) {
  var item = req.body,
      user = req.user
  Project.upsert({
    title: item.title
  },
  {
    title: item.title,
    cover: item.cover,
    type: item.type,
    status: item.status,
    aired: item.aired,
    source: item.source,
    score: item.score
  })
  .then(function(data) {
    var project = data.toJSON()
    req.flash('info', project.title + ' has been added to the projects field.')
    res.redirect('/backend/projects/all')
  })
  .catch(function(err) {
    req.flash('info', 'Failed to add the project.')
    res.redirect('/backend/projects/all')
  })
})

ProjectsController.route('/delete/:pid/:title')
.get(function(req, res, next) {
  switch (req.user.role_id) {
    case 1:
        Project
        .findOne({id: req.params.pid, title: req.params.title})
        .then(function(project) {
          return Project.destroy({id: project.id})
        })
        .then(function() {
          req.flash('info', 'The project has been removed from the projects field.')
          res.redirect('/backend/projects/all')
        })
        .catch(function() {
          req.flash('info', 'Couldn\'t remove the projects. Missing arguments.')
          return res.redirect('/backend/projects/all')
        })
      break;
    default:
      req.flash('info', 'Role admin required to delete the project.')
      return res.redirect('/backend/projects/all')
  }
})

/**
  * GET /backend/projects/find rules.
  */
ProjectsController.route('/find/:anime')
.get(function(req, res, next) {
  var url = 'https://myanimelist.net/search/prefix.json?type=anime&keyword=' + req.params.anime
  try {
    request(url, function(error, response, body){
      if (!error && response.statusCode === 200) {
        var mal = JSON.parse(body).categories[0]
        res.render('projects/add', {user: req.user, animes: mal.items})
      } else {
        res.render('projects/add', {user: req.user})
      }
    })
  } catch (e) {
    res.render('projects/add', {user: req.user})
  }
})

ProjectsController.route('/all/:pid?')
.get(function(req, res, next) {
  Project.forge()
  .orderBy("-created_at")
  .fetchPage({
    page: req.params.pid,
    pageSize: 20
  })
  .then(function(projects){
    var current_prev = projects.pagination.page,
        current_next = projects.pagination.page,
        size = projects.pagination.pageCount,
        pages = {
          uri: req.baseUrl + '/all/',
          next: (current_next < size) ? current_next += 1 : false,
          prev: (current_prev > 0) ? current_prev -= 1 : false,
          total: size,
          current: projects.pagination.page
        }
    res.render('projects/projects', {user: req.user, projects: projects.toJSON(), pages: pages, message: req.flash('info')})
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
