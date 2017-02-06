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
    dd_link: item.ddl,
    anime_id: item.anime,
    publish: (item.publish == "false") ? false : true
  })
  .then(function(data) {
    post = data.toJSON()
    var mark = (post.publish) ? 'published' : 'drafted'
    req.flash('info', 'New post has been created and mark as ' + mark + ' post.')
    res.redirect('/backend/posts/user')
  })
  .catch(function(err) {
    next()
  })
})

PostsController.route('/edit/:pid')
.get(function(req, res, next) {
  switch (req.user.role_id) {
    case 1:
      Project
      .fetchAll()
      .then(function(projects) {
        Post
        .findById(req.params.pid)
        .then(function(post) {
          res.render('posts/edit', {user: req.user, post: post.toJSON(), projects: projects.toJSON()})
        })
        .catch(function(err) {
          req.flash('info', 'Couldn\'t find post by id ' + req.params.pid)
          res.redirect('/backend/posts/user')
        })
      })
      .catch(function(err) {
        next()
      })
      break
    default:
      Project
      .fetchAll()
      .then(function(projects) {
        Post
        .findOne({id: req.params.pid, user_id: req.user.id})
        .then(function(post) {
          res.render('posts/edit', {user: req.user, post: post.toJSON(), projects: projects.toJSON()})
        })
        .catch(function(err) {
          req.flash('info', 'Couldn\'t edit post, id ' + req.params.pid + ' not found or the post doesn\'t belong to you. ')
          res.redirect('/backend/posts/user')
        })
      })
      .catch(function(err) {
        next()
      })
  }
})
.post(function(req, res, next) {
  var item = req.body,
      user = req.user
  switch (user.role_id) {
    case 1:
      Post.upsert({
        id: item.pid
      },
      {
        title: item.title,
        content: item.content,
        dd_link: item.ddl,
        anime_id: item.anime,
        publish: (item.publish == "false") ? false : true
      })
      .then(function(data) {
        post = data.toJSON()
        var mark = (post.publish) ? 'published' : 'drafted'
        req.flash('info', 'The post has been updated and mark as ' + mark + ' post.')
        res.redirect('/backend/posts/all')
      })
      .catch(function(err) {
        req.flash('info', 'Admin system error: ' + err)
        res.redirect('/backend/posts/all')
      })
      break
    default:
      Post.upsert({
        id: item.pid,
        user_id: user.id
      },
      {
        title: item.title,
        content: item.content,
        dd_link: item.ddl,
        anime_id: item.anime,
        publish: (item.publish == "false") ? false : true
      })
      .then(function(data) {
        post = data.toJSON()
        var mark = (post.publish) ? 'published' : 'drafted'
        req.flash('info', 'The post has been updated and mark as ' + mark + ' post.')
        res.redirect('/backend/posts/user')
      })
      .catch(function(err) {
        req.flash('info', 'Couldn\'t edit post. The post doesn\'t belong to you.')
        res.redirect('/backend/posts/user')
      })
  }
})

PostsController.route('/delete/:pid')
.get(function(req, res, next) {
  switch (req.user.role_id) {
    case 1:
      Post
      .findById(req.params.pid)
      .then(function(post) {
        return Post.destroy({id: post.id})
      })
      .then(function() {
        req.flash('info', 'Post has been deleted.')
        res.redirect('/backend/posts/all')
      })
      .catch(function(err) {
        req.flash('info', 'Admin system error: ' + err)
        res.redirect('/backend/posts/all')
      })
      break
    default:
      Post
      .findOne({id: req.params.pid, user_id: req.user.id})
      .then(function(post) {
        return Post.destroy({id: post.id})
      })
      .then(function() {
        req.flash('info', 'Post has been deleted.')
        res.redirect('/backend/posts/user')
      })
      .catch(function() {
        req.flash('info', 'Couldn\'t delete the post. The post doesn\'t belong to you.')
        res.redirect('/backend/posts/user')
      })
  }
})

PostsController.route('/user/:pid?')
.get(function(req, res, next) {
  Post
  .forge()
  .where({user_id: req.user.id})
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
          uri: req.baseUrl + '/user/',
          next: (current_next < size) ? current_next += 1 : false,
          prev: (current_prev > 0) ? current_prev -= 1 : false,
          total: size,
          current: posts.pagination.page
        }
    res.render('posts/posts', {user: req.user, posts: posts.toJSON(), pages: pages, message: req.flash('info')})
  })
  .catch(function(err) {
    console.log(err)
    next()
  })
})

PostsController.route('/all/:pid?')
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
          uri: req.baseUrl + '/all/',
          next: (current_next < size) ? current_next += 1 : false,
          prev: (current_prev > 0) ? current_prev -= 1 : false,
          total: size,
          current: posts.pagination.page
        }
    res.render('posts/posts', {user: req.user, posts: posts.toJSON(), pages: pages, message: req.flash('info')})
  })
  .catch(function(err) {
    next()
  })
})

module.exports = PostsController
