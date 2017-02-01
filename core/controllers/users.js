/**
  * Module dependencies.
  */
var express = require('express'),
    UsersController = express.Router(),
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
    // include User model
    User = require('../models/user'),
    Role = require('../models/role')

/**
  * GET /backend/users/add rules.
  */
UsersController.route('/add')
.get(function(req, res, next) {
  Role.fetchAll()
  .then(function(roles) {
    return res.render('users/add', {user: req.user, roles: roles.toJSON()})
  })
  .catch(function(err) {
    next()
  })
})
.post(function(req, res, next) {
  var user = req.body
  User.findOne({username: user.username})
  .then(function(data){
    req.flash('info', 'The username has already taken.')
    return res.redirect('/backend/users/add')
  })
  .catch(function(err){
    User.findOne({email: user.email})
    .then(function(data) {
      req.flash('info', 'The email has already used by another username.')
      return res.redirect('/backend/users/add')
    })
    .catch(function(err) {
      User.upsert({
        username: user.username,
        password: bcrypt.hashSync(user.password, salt)
      },
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role_id: user.role,
        remember_token: null
      })
      .then(function(data) {
        result = data.toJSON()
        req.flash('info', 'New user with username ' + result.username + ' has been created.')
        return res.redirect('/backend/users')
      })
      .catch(function(err) {
        next()
      })
    })
  })
})

UsersController.route('/edit/:pid')
.get(function(req, res, next) {
  Role
  .fetchAll()
  .then(function(roles) {
    User
    .findOne({id: req.params.pid})
    .then(function(user) {
      return res.render('users/edit', {user: req.user, user_detail: user.toJSON(), roles: roles.toJSON()})
    })
    .catch(function(err) {
      req.flash('info', 'Couldn\'t find user by id ' + req.params.pid)
      return res.redirect('/backend/users')
    })
  })
  .catch(function(err) {
    next()
  })
})
.post(function(req, res, next) {
  var user = req.body,
      checkUsername = User
                      .forge()
                      .where({username: user.username})
                      .fetchPage()
                      .then(function(data) {
                        return (data.pagination.rowCount >= 1) ? false : true
                      })
                      .catch(function(err) {
                        next()
                      }),
      checkEmail = User
                   .forge()
                   .where({email: user.email})
                   .fetchPage()
                   .then(function(data) {
                     return (data.pagination.rowCount >= 1) ? false : true
                   })
    if(!checkUsername){
      req.flash('info', 'The username has already taken.')
      return res.redirect('/backend/users/add' + req.params.pid)
    }
    if(!checkEmail){
      req.flash('info', 'The email has already used by another username.')
      return res.redirect('/backend/users/edit' + req.params.pid)
    }
    User.upsert({
      id: req.params.pid
    },
    {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role_id: user.role,
      remember_token: null
    })
    .then(function(data) {
      var data = data.toJSON()
      if(!user.password){
        req.flash('info', 'User with username ' + data.username + ' has been updated.')
        return res.redirect('/backend/users')
      }
      User
      .update({password: bcrypt.hashSync(user.password, salt)}, {id: data.id})
      .then(function(data){
        var data = data.toJSON()
        req.flash('info', 'User with username ' + data.username + ' has been updated.')
        return res.redirect('/backend/users')
      })
    })
    .catch(function(err) {
      req.flash('info', 'Couldn\'t edit user with id ' + req.params.pid)
      return res.redirect('/backend/users')
    })
})

UsersController.route('/delete/:pid')
.get(function(req, res, next) {
  User
  .findOne({id: req.params.pid})
  .then(function(user) {
    return User.destroy({id: req.params.pid})
  })
  .then(function() {
    req.flash('info', 'user has been deleted.')
    return res.redirect('/backend/users/all')
  })
  .catch(function(err) {
    req.flash('info', 'Couldn\'t delete user with id ' + req.params.pid)
    return res.redirect('/backend/users/all')
  })
})

UsersController.route('/:pid?')
.get(function(req, res, next) {
  User
  .forge()
  .orderBy("-created_at")
  .fetchPage({
    page: req.params.pid,
    pageSize: 2,
    withRelated: ['role']
  })
  .then(function(users){
    var current_prev = users.pagination.page,
        current_next = users.pagination.page,
        size = users.pagination.pageCount,
        next = (current_next < size) ? current_next += 1 : false,
        prev = (current_prev > 0) ? current_prev -= 1 : false
    return res.render('users/users', {user: req.user, user_lists: users.toJSON(), next: next, prev: prev, message: req.flash('info')})
  })
  .catch(function(err) {
    next()
  })
})

module.exports = UsersController
