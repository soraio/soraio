/**
  * Module dependencies.
  */
var express = require('express'),
    AuthController = express.Router(),
    passport = require('passport')

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
function(req, res) {
  console.log("hello")

  if (req.body.ui_login_remember) {
    req.session.cookie.maxAge = 1000 * 60 * 3;
  } else {
    req.session.cookie.expires = false;
  }
res.redirect('/')
})

/**
  * GET /auth/logout rules.
  */
AuthController.route('/logout')
.get(function(req, res, next) {
  req.logout()
  res.redirect('/')
})

module.exports = AuthController
