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
    pageSize: 20,
    withRelated: ['user', 'project']
  })
  .then(function(posts){
    var current_prev = posts.pagination.page,
        current_next = posts.pagination.page,
        size = posts.pagination.pageCount,
        pages = {
          uri: req.baseUrl + '/pages/',
          next: (current_next < size) ? current_next += 1 : false,
          prev: (current_prev > 0) ? current_prev -= 1 : false,
          total: size,
          current: posts.pagination.page
        }
    res.render('index', {user: req.user, posts: posts.toJSON(), pages: pages, message: req.flash('info')})
  })
  .catch(function(err) {
    next()
  })
})

/**
  * GET /posts/pid rules.
  * @param pid {post_id}.
  */
IndexController.route('/posts/:slug')
.get(function(req, res, next) {
  var slug = req.params.slug
  Post
  .findOne({slug: slug}, {withRelated: ['user'], require: true})
  .then(function(post){
    var pages = {
      url: req.baseUrl + '/',
      next: false,
      prev: false
    }
    res.render('posts/single', {user: req.user, post: post.toJSON(), pages: pages, message: req.flash('info')})
  })
  .catch(function(err) {
    next()
  })
})

module.exports = IndexController
