/**
  * Module dependencies.
  */
var express = require('express'),
    PostsController = express.Router(),
    // include Post model
    Post = require('../models/post'),
    Project = require('../models/project'),
    slugifies = require('slug')

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
.post(function(req, res, next) {
  var item = req.body,
      user = req.user
  Post.upsert({
    title: item.title,
    user_id: user.id
  },
  {
    title: item.title,
    slug: slugifies(item.title + ' by ' + user.id, {lower: true}),
    content: item.content,
    anime_id: item.anime,
    publish: (item.publish == "false") ? false : true
  })
  .then(function() {
    res.redirect('/backend/posts/user')
  })
  .catch(function(err) {
    next()
  })
})

PostsController.route('/user/:pid?')
.get(function(req, res, next) {
  Post
  .forge()
  .where({user_id: req.user.id})
  .fetchPage({
    page: req.params.pid,
    pageSize: 2,
    withRelated: ['user', 'project']
  })
  .then(function(posts){
    var current_prev = posts.pagination.page,
        current_next = posts.pagination.page,
        size = posts.pagination.pageSize,
        next = (current_next < size) ? current_next += 1 : false,
        prev = (current_prev > 0) ? current_prev -= 1 : false
    res.render('posts/posts', {user: req.user, posts: posts.toJSON(), next: next, prev: prev})
  })
  .catch(function(err) {
    console.log(err)
    next()
  })
})

PostsController.route('/all/:pid?')
.get(function(req, res, next) {
  Post.forge()
  .fetchPage({
    page: req.params.pid,
    pageSize: 2,
    withRelated: ['user', 'project']
  })
  .then(function(posts){
    var current_prev = posts.pagination.page,
        current_next = posts.pagination.page,
        size = posts.pagination.pageSize,
        next = (current_next < size) ? current_next += 1 : false,
        prev = (current_prev > 0) ? current_prev -= 1 : false
    res.render('posts/posts', {user: req.user, posts: posts.toJSON(), next: next, prev: prev})
  })
  .catch(function(err) {
    next()
  })
})

module.exports = PostsController
