/**
  * Module dependencies.
  */
var express = require('express'),
    PostsController = express.Router()

/**
  * GET /backend/posts rules.
  */
PostsController.route('/add')
.get(function(req, res, next) {
  res.render('posts/add', {user: req.user})
})

module.exports = PostsController
