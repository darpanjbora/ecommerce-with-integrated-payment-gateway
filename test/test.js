var request = require('supertest'),
    app = require('../app')

describe('homepage', function() {
    it('Displays the homepage', function(done) {
        request(app).get('/')
            .expect(200, done)
    })
})

describe('payment', function() {
    it('Displays the payment screen for suppose course with course id 100', function(done) {
        request(app).get('/100/payment')
            .expect(200, done)
    })
})