/**
  * Module dependencies.
  */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    routes = require('../core/routes')

/**
  * App setup.
  */
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, '../public')))
app.use('/node_modules',  express.static(path.join(__dirname, '../node_modules')))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(function(req, res, next) {
    res.locals.site = "Sora Iro Fansubs"
    res.locals.irc = "#sorairo@irc.rizon.net"
    next()
})
/**
  * App routes.
  */
app.use(routes)

/**
  * Error handlers.
  */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  err.status = 403
  next(err)
})
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({error: [{
        status: err.status,
        message: err.message,
        err
      }]
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({error: [{
      status: err.status,
      message: err.message
    }]
  })
})

/**
  * Module exports
  */
module.exports = app
