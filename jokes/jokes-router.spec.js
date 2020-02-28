const request = require('supertest');

const server = require('../api/server');

const jwt = require('jsonwebtoken');
const secret = require('../config/secrets')

describe('GET /', function() {
    it('should return 200 OK', function() {
        return request(server).get('/').then(res => {
            expect(res.status).toBe(200);
        });
    });
})

// describe('GET /api/jokes', function () {
//     it("should return status of 200", function () {
//         const token = jwt.verify(token, secret.jwtSecret)
//         return request(server).get("/api/jokes")
//         // .set('Accept', 'application/json')
//         .set('Authorization', token)
//         .then(res => {
//             expect(res.status).toBe(200);
//         })
//     })
// })