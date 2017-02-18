// Databases
var LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy,
    bcrypt = require('bcrypt'),
    passport = require('passport'),
    salt = bcrypt.genSaltSync(10),
    User = require('./models/user'),
    utils = require('./utils')

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, {withRelated: ['role']}).then(function(user){
      done(null, user.toJSON())
    }).catch(function(err){
      done(err)
    })
  })

  // signup
  passport.use(
      'signup',
      new LocalStrategy({
          // by default, local strategy uses username and password
          usernameField : 'username',
          passwordField : 'password',
          passReqToCallback : true // allows us to pass back the entire request to the callback
      },

        function(req, username, password, done) {
            if(req.body.password !== req.body.copassword){
              return done(null, false, req.flash('signupMessage', 'Password confirmation doesn\'t match.'))
            }
            var newUser = {
                username: username,
                password: bcrypt.hashSync(password, salt),  // use the generateHash function in our user model
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birth: new Date(req.body.birth),
                role_id: 3,
                remember_token: null
            }
            // find a user whose username is the same as the forms username
            // we are checking to see if the user trying to sign up already exists
            User.findOne({username: username})
            .then(function(user){
              done(null, false, req.flash('signupMessage', 'The username has already taken.'))
            })
            .catch(function(err){
              User.findOne({email: newUser.email})
              .then(function(user){
                done(null, false, req.flash('signupMessage', 'The email has already used by another username.'))
              })
              .catch(function(){
                User.create(newUser)
                .then(function(user){
                  done(null, false, req.flash('signupMessage', 'The registration was success. Now, you can sign in with your username.'))
                })
                .catch(function(err){
                  err.status = 500
                  err.stack = err.message
                  err.message = 'Couldn\'t create to the user database.'
                  done(err)
                })
              })
            })
        })
      )

  // login
  passport.use(
      'login',
      new LocalStrategy({
          // by default, local strategy uses username and password
          usernameField : 'username',
          passwordField : 'password',
          passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) { // callback with email and password from our form
        User.findOne({username: username})
        .then(function(user){
          if(!bcrypt.compareSync(password, user.toJSON().password)){
            return done(null, false, req.flash('loginMessage', 'Oops! The username and password doesn\'t match.')) // create the loginMessage and save it to session as flashdata
          }

          // all is well, return successful user
          return done(null, user.toJSON())
        })
        .catch(function(err){
          return done(null, false, req.flash('loginMessage', 'No user found.')) // req.flash is the way to set flashdata using connect-flash
        })
      })
  )

  // Remember Me cookie strategy
  //   This strategy consumes a remember me token, supplying the user the
  //   token was originally issued to.  The token is single-use, so a new
  //   token is then issued to replace it.
  passport.use(new RememberMeStrategy(
    function(token, done) {
      consumeRememberMeToken(token, function(err, uid) {
        if (err) { return done(err) }
        if (!uid) { return done(null, false) }

        User.findById(uid, {withRelated: ['role']}).then(function(user){
          done(null, user.toJSON())
        }).catch(function(err){
          done(err)
        })
      })
    },
    issueToken
  ))

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
module.exports = passport
