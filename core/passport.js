// Databases
var config = require('../conf/config'),
    knex = require('knex')(require('../knexfile')[config.environment]),
    LocalStrategy   = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    passport = require('passport'),
    salt = bcrypt.genSaltSync(10)

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      knex('users').where('id', id).asCallback(function(err, rows) {
        done(err, rows[0])
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
            if(req.body.password != req.body.copassword){
              return done(null, false, req.flash('signupMessage', 'Password confirmation doesn\'t match.'))
            }
            var newUser = {
                username: username,
                password: bcrypt.hashSync(password, salt),  // use the generateHash function in our user model
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birth: new Date(req.body.birth),
                level: 1,
                remember_token: null
            }
            // find a user whose username is the same as the forms username
            // we are checking to see if the user trying to sign up already exists
            knex('users').where('username', username).orWhere('email', newUser.email).asCallback(function(err, rows) {
                if (err)
                    return done(err)
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username or email has already taken.'))
                } else {
                    // if there is no user with that username
                    // create the user
                    knex('users').insert(newUser)
                    .returning('id')
                    .then(function (id) {
                      newUser.id = id[0]
                      return done(null, newUser)
                    })
                }
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
        knex('users').where('username', username).asCallback(function(err, rows) {
              if (err)
                  return done(err)
              if (!rows.length) {
                  return done(null, false, req.flash('loginMessage', 'No user found.')) // req.flash is the way to set flashdata using connect-flash
              }

              // if the user is found but the password is wrong
              if (!bcrypt.compareSync(password, rows[0].password))
                  return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')) // create the loginMessage and save it to session as flashdata

              // all is well, return successful user
              return done(null, rows[0])
          })
      })
  )

module.exports = passport
