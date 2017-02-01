/**
  * Module dependencies.
  */
var express = require('express'),
    IndexController = express.Router(),
    // include Post model
    Post = require('../models/post')

/**
  * GET / rules.
  */
IndexController.route('(/pages/:pid?|/)?')
.get(function(req, res, next) {
  Post.forge()
  .orderBy("-created_at")
  .fetchPage({
    page: req.params.pid,
    pageSize: 2,
    withRelated: ['user', 'project']
  })
  .then(function(posts){
    var current_prev = posts.pagination.page,
        current_next = posts.pagination.page,
        size = posts.pagination.pageCount,
        next = (current_next < size) ? current_next += 1 : false,
        prev = (current_prev > 0) ? current_prev -= 1 : false
    res.render('index', {user: req.user, posts: posts.toJSON(), next: next, prev: prev})
  })
  .catch(function(err) {
    next()
  })
})

/**
  * GET /posts/pid rules.
  * @param pid {post_id}.
  */
IndexController.route('/posts/:pid')
.get(function(req, res, next) {
  var pid = req.params.pid
  Post.where({id: pid})
  .fetch({withRelated: ['user'], require: true})
  .then(function(post){
    res.json(post)
  })
  .catch(function(err) {
    next()
  })
})

module.exports = IndexController
