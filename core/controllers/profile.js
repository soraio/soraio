/**
  * Module dependencies.
  */
var express = require('express'),
    ProfileController = express.Router(),
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
    passport = require('passport'),
    // include Setting model
    User = require('../models/user')

ProfileController.route('/')
.get(function(req, res, next) {
  if (!req.isAuthenticated()){
    return res.redirect('/auth/login')
  }

  return res.render('profile/profile', {user: req.user, profile: req.user, message: req.flash('info')})
})

ProfileController.route('/edit')
.get(function(req, res, next) {
  if (!req.isAuthenticated()){
    return res.redirect('/auth/login')
  }

  return res.render('profile/edit', {user: req.user, message: req.flash('info')})
})
.post(function(req, res, next) {
  if (!req.isAuthenticated()){
    return res.redirect('/auth/login')
  }

  var data = req.body,
      user = req.user

  User
  .update({
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    birth: new Date(data.birth)
  }, {id: user.id})
  .then(function(a) {
    req.user = a.toJSON()
    if(data.password !== data.copassword){
      req.flash('info', 'Password confirmation doesn\'t match.')
    }else if(data.oldpassword !== '' && data.password !== '' && !bcrypt.compareSync(data.oldpassword, user.password)){
      req.flash('info', 'Wrong old password.')
    }else{
      req.flash('info', 'Your profile has been updated.')
    }

    if(data.password !== data.copassword || data.oldpassword === '' || data.password === '' || data.copassword === '' || !bcrypt.compareSync(data.oldpassword, user.password)){
      return res.redirect('/profile')
    }

    User
    .update({
      password: bcrypt.hashSync(data.password, salt)
    }, {id: user.id})
    .then(function() {
      return res.redirect('/profile')
    })
    .catch(function(err) {
      req.flash('info', 'Couldn\'t update your profile.')
      return res.redirect('/profile')
    })
  })
  .catch(function(err) {
    req.flash('info', 'Couldn\'t update your profile.')
    return res.redirect('/profile')
  })
})

ProfileController.route('/:user')
.get(function(req, res, next) {
  User
  .findOne({username: req.params.user}, {withRelated: ['role']})
  .then(function(user) {
    return res.render('profile/profile', {user: req.user, profile: user.toJSON(), message: req.flash('info')})
  })
  .catch(function(err) {
    next()
  })
})

module.exports = ProfileController
