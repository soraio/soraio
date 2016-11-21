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
IndexController.route('/')
.get(function(req, res, next) {
  Post.fetchAll({withRelated: ['user'], require: true})
  .then(function(posts){
    res.render('index', {user: req.user, posts: posts.toJSON()})
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
