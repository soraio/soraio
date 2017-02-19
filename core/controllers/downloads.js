/**
  * Module dependencies.
  */
var express = require('express'),
    DownloadsController = express.Router(),
    // include Download model
    Post = require('../models/post'),
    Download = require('../models/download'),
    Log = require('../models/log'),
    token = require('crypto').randomBytes(20).toString('hex'),
    moment = require('moment')


/**
  * GET /downloads/token/:token rules.
  * @param {string} project
  * @param {string} post
  */
DownloadsController.route('/token/:token')
.get(function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  Download.findOne({token: req.params.token, ip: ip}).then(function(download) {
    var pages = {
      uri: req.baseUrl,
      next: false,
      prev: false
    },
    link = (!/^(https?:)?\/\//i.test(download.toJSON().link)) ? '//' + download.toJSON().link : download.toJSON().link,
    time = moment().diff(moment(download.toJSON().created_at), 'hours')
    if (time >= 7){
      return res.redirect(link)
    } else {
      Download.destroy({id: download.id})
      return res.render('downloads/download', {user: req.user, pages: pages})
    }
  })
  .catch(function(err) {
    var pages = {
      uri: req.baseUrl,
      next: false,
      prev: false
    },
        download = {
          title: 'Invalid Token Request'
        }
    res.render('downloads/token', {user: req.user, pages: pages, download: download})
  })
})

/**
  * GET / rules.
  * @param {string} project
  * @param {string} post
  */
DownloadsController.route('/:project/:post')
.get(function(req, res, next) {
  Post
  .findOne({slug: req.params.post}, {withRelated: ['project']})
  .then(function(post) {
      var pages = {
        uri: req.baseUrl,
        next: false,
        prev: false
      },
          itempost = post.toJSON()
      res.render('downloads/download', {user: req.user, pages: pages, download: itempost})
  })
  .catch(function(err) {
    next(err)
  })
})
.post(function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  Post
  .findOne({slug: req.params.post}, {withRelated: ['project']})
  .then(function(post) {
      var pages = {
        uri: req.baseUrl + '/token/',
        next: false,
        prev: false
      }
          post = post.toJSON()
      var download = {
        title: post.title,
        ip: ip,
        token: token
      }
      Log.create({type: 'download', related_id: post.id, ip: ip})
      Download.create({ip: download.ip, token: download.token, link: post.dd_link})
      res.render('downloads/download', {user: req.user, pages: pages, download: download})
  })
  .catch(function(err) {
    next(err)
  })
})

module.exports = DownloadsController
