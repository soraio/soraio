var request = require('supertest')
var should = require('should')
var app = require('../lib/server')

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
  it('should respond with status 200 OK if got specific Post ID', function(done) {
    request(app)
    .get('/posts/1')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err

      res.should.have.property('status', 200)
      done()
    })
  })
  it('should respond with status 404 Not Found when got no specific Post ID', function(done) {
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
  it('should respond with status 404 Not Found when got no registered routes', function(done) {
    request(app)
    .get('/admin/abc/')
    .set('Accept', 'application/json')
    .expect(404)
    .end(function(err, res) {
      if (err) throw err

      res.should.have.property('status', 404)
      done()
    })
  })
})
