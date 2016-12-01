/**
  * Module dependencies.
  */
var express = require('express'),
    PostsController = express.Router(),
    // include Post model
    Post = require('../models/post'),
    Project = require('../models/project')

/**
  * GET /backend/posts/add rules.
  */
PostsController.route('/add')
.get(function(req, res, next) {
  Project.fetchAll()
  .then(function(projects) {
    res.render('posts/add', {user: req.user, projects: projects.toJSON()})
  })
  .catch(function(err) {
    next()
  })
})

PostsController.route('/user')
.get(function(req, res, next) {
  Post.where({user_id: req.user.id}).fetchAll({withRelated: ['user', 'project'], require: true})
  .then(function(posts){
    res.render('posts/posts', {user: req.user, posts: posts.toJSON()})
  })
  .catch(function(err) {
    console.log(err)
    next()
  })
})

PostsController.route('/all')
.get(function(req, res, next) {
  Post.fetchAll({withRelated: ['user', 'project'], require: true})
  .then(function(posts){
    res.render('posts/posts', {user: req.user, posts: posts.toJSON()})
  })
  .catch(function(err) {
    next()
  })
})

module.exports = PostsController
