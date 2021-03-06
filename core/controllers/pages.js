/**
  * Module dependencies.
  */
var express = require('express'),
    PagesController = express.Router(),
    // include Post model
    Page = require('../models/page'),
    slugifies = require('slug')

/**
  * GET /backend/pages/add rules.
  */
PagesController.route('/add')
.get(function(req, res, next) {
  return res.render('pages/add', {user: req.user})
})
.post(function(req, res, next) {
  var item = req.body,
      user = req.user
  Page
  .where({title: item.title})
  .fetchAll({require: true})
  .then(function(pages) {
    pages = pages.toJSON()
    var index = pages.length++
    Page
    .create({
      title: item.title,
      slug: slugifies(item.title + '-' + index, {lower: true}),
      user_id: req.user.id,
      content: item.content,
      publish: (item.publish === "false") ? false : true
    })
    .then(function(page) {
      req.flash('info', 'Page ' + item.title + ' has been created.')
      res.redirect('/backend/pages/all')
    })
    .catch(function(err) {
      req.flash('info', 'Page ' + item.title + ' couldn\'t be created.')
      res.redirect('/backend/pages/all')
    })
  })
  .catch(function(err) {
    Page
    .create({
      title: item.title,
      slug: slugifies(item.title, {lower: true}),
      user_id: req.user.id,
      content: item.content,
      publish: (item.publish === "false") ? false : true
    })
    .then(function(page) {
      req.flash('info', 'Page ' + item.title + ' has been created.')
      res.redirect('/backend/pages/all')
    })
    .catch(function(err) {
      next(err)
    })
  })
})

PagesController.route('/edit/:pid')
.get(function(req, res, next) {
  Page
  .findById(req.params.pid)
  .then(function(page) {
    res.render('pages/edit', {user: req.user, page: page.toJSON()})
  })
  .catch(function(err) {
    req.flash('info', 'Couldn\'t find page by id ' + req.params.pid)
    res.redirect('/backend/pages/all')
  })
})
.post(function(req, res, next) {
  var item = req.body,
      user = req.user
  Page
  .where({title: item.title})
  .fetchAll({require: true})
  .then(function(pages) {
    pages = pages.toJSON()
    var index = pages.length++
    Page
    .upsert({
      id: item.pid
    },
    {
      title: item.title,
      slug: slugifies(item.title + '-' + index, {lower: true}),
      user_id: req.user.id,
      content: item.content,
      publish: (item.publish === "false") ? false : true
    })
    .then(function(page) {
      var mark = (page.publish) ? 'published' : 'drafted'
      req.flash('info', 'Page ' + item.title + ' has been updated and marked as ' + mark +'.')
      res.redirect('/backend/pages/all')
    })
    .catch(function(err) {
      req.flash('info', 'Page ' + item.title + ' couldn\'t be updated.')
        res.redirect('/backend/pages/all')
    })
  })
  .catch(function(err) {
    Page
    .upsert({
      id: item.pid
    },
    {
      title: item.title,
      slug: slugifies(item.title, {lower: true}),
      user_id: req.user.id,
      content: item.content,
      publish: (item.publish === "false") ? false : true
    })
    .then(function(page) {
      req.flash('info', 'Page ' + item.title + ' has been updated.')
      res.redirect('/backend/pages/all')
    })
    .catch(function(err) {
      next(err)
    })
  })
})

PagesController.route('/all/:pid?')
.get(function(req, res, next) {
  Page.forge()
  .orderBy("-created_at")
  .fetchPage({
    page: req.params.pid,
    pageSize: 20,
    withRelated: ['user']
  })
  .then(function(data){
    var current_prev = data.pagination.page,
        current_next = data.pagination.page,
        size = data.pagination.pageCount,
        pages = {
          uri: req.baseUrl + '/all/',
          next: (current_next < size) ? current_next += 1 : false,
          prev: (current_prev > 0) ? current_prev -= 1 : false,
          total: size,
          current: data.pagination.page
        }
    res.render('pages/pages', {user: req.user, posts: data.toJSON(), pages: pages, message: req.flash('info')})
  })
  .catch(function(err) {
    next()
  })
})

PagesController.route('/delete/:pid')
.get(function(req, res, next) {
  Page
  .findOne({id: req.params.pid})
  .then(function(page) {
    return Page.destroy({id: req.params.pid})
  })
  .then(function() {
    req.flash('info', 'Page has been deleted.')
    return res.redirect('/backend/pages/all')
  })
  .catch(function(err) {
    req.flash('info', 'Couldn\'t delete page with id ' + req.params.pid)
    return res.redirect('/backend/pages/all')
  })
})

module.exports = PagesController
