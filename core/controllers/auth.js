/**
  * Module dependencies.
  */
var express = require('express'),
    AuthController = express.Router(),
    passport = require('passport'),
    utils = require('../utils')

/**
  * GET and POST /auth/signup rules.
  * @param username {text}.
  * @param password {password}.
  */
AuthController.route('/signup')
.get(function(req, res, next){
  res.render('signup', {message: req.flash('signupMessage'), csrfToken: req.csrfToken()})
})
.post(passport.authenticate('signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/auth/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}))

/**
  * GET and POST /auth/login rules.
  * @param username {text}.
  * @param password {password}.
  */
AuthController.route('/login')
.get(function(req, res, next){
  res.render('login', {message: req.flash('loginMessage'), csrfToken: req.csrfToken()})
})
.post(passport.authenticate('login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/auth/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}),
  function(req, res, next) {
    // Issue a remember me cookie if the option was checked
    if (!req.body.ui_login_remember) { return next() }

    issueToken(req.user, function(err, token) {
      if (err) { return next(err) }
      res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 })
      return next()
    })
  },
  function(req, res) {
    res.redirect('/')
})

/**
  * GET /auth/logout rules.
  */
AuthController.route('/logout')
.get(function(req, res, next) {
  res.clearCookie('remember_me')
  req.logout()
  res.redirect('/')
})

/* Fake, in-memory database of remember me tokens */

var tokens = {}

function consumeRememberMeToken(token, fn) {
  var uid = tokens[token]
  // invalidate the single-use token
  delete tokens[token]
  return fn(null, uid)
}

function saveRememberMeToken(token, uid, fn) {
  tokens[token] = uid
  return fn()
}

function issueToken(user, done) {
  var token = utils.randomString(64)
  saveRememberMeToken(token, user.id, function(err) {
    if (err) { return done(err) }
    return done(null, token)
  })
}
module.exports = AuthController
