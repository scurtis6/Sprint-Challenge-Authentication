const request = require('supertest');

const server = require('../api/server');

describe('POST /api/auth/register', function () {
    const newUser = {
        "username": "usertest",
        "password": "usertest"
    }
    it('should return 201 CREATED', function () {
        return request(server).post('/api/auth/register').send(newUser).then(res => {
            expect(res.status).toBe(201)
        }); 
    });
    it('should not allow users with the same username', function () {
        return request(server).post('/api/auth/register').send(newUser).then(res => {
            expect(res.status).toBe(500)
        }); 
    });
    describe('POST /api/auth/login', function () {
        const user = {
            "username": "user",
            "password": "user"
        }
        it('should return 200 OK', function () {
            return request(server).post('/api/auth/login').send(user).then(res => {
                expect(res.status).toBe(200)
            });
        });
        it('should return Welcome ${username}!', function () {
            return request(server).post('/api/auth/login').send(user).then(res => {
                expect(res.body.message).toMatch('Welcome user!')
            })
        })
    });
});

// describe('users router', function() {
//     it('should run the tests', function () {
//         expect(true).toBe(true);
//     });

//     describe('GET /', function() {
//         it('should return 200 OK', function() {
//             return request(server).get('/api/users').then(res => {
//                 expect(res.status).toBe(200);
//             });
//         });