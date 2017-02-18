var request = require('supertest'),
    should = require('should'),
    app = require('../lib/server')
    require('mocha-jshint')({
      paths: [
        'lib',
        'core'
      ],
      pretty: true
    })
describe('GET / index | GET / params', function() {
  it('should respond with json', function(done) {
    request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err)

      res.should.have.property('status', 200)
      done()
    })
  })
  it('should respond with status 200 OK if got specific Post', function(done) {
    request(app)
    .get('/posts/hi-no-youjin-movie')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err

      res.should.have.property('status', 200)
      done()
    })
  })
  it('should respond with status 404 Not Found when got no specific Post', function(done) {
    request(app)
    .get('/posts/11283182931231')
    .set('Accept', 'application/json')
    .expect(404)
    .end(function(err, res) {
      if (err) throw err

      res.should.have.property('status', 404)
      done()
    })
  })
  it('should respond with status 302 Found when anonymous try to access admin sections', function(done) {
    request(app)
    .get('/admin')
    .set('Accept', 'application/json')
    .expect(302)
    .end(function(err, res) {
      if (err) throw err

      res.should.have.property('status', 302)
      done()
    })
  })
  it('should respond with status 404 Not Found when got no registered routes', function(done) {
    request(app)
    .get('/asdbas/asdas/asd')
    .set('Accept', 'application/json')
    .expect(404)
    .end(function(err, res) {
      if (err) throw err

      res.should.have.property('status', 404)
      done()
    })
  })
})
