var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3001');


describe('app', () => {
    it('should return 404 if main path does not exist', (done) => {
        api.get('/')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 404 if random path does not exist', (done) => {
        api.get('/' + Math.random())
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return an error if argument "first" is undefined', (done) => {
        api.get('/add?last=1')
            .expect(400)
            .end((err, res) => {
                expect(res.body.status).to.equal('error');
                expect(res.body.message).to.equal('Argument first is undefined');
                done();
            });
    });
    it('should return an error if argument "last" is undefined', (done) => {
        api.get('/add?first=1')
            .expect(400)
            .end((err, res) => {
                expect(res.body.status).to.equal('error');
                expect(res.body.message).to.equal('Argument last is undefined');
                done();
            });
    });
    it('should return an error if argument "first" is not a number', (done) => {
        api.get('/add?first=abc&last=1')
            .expect(400)
            .end((err, res) => {
                expect(res.body.status).to.equal('error');
                expect(res.body.message).to.equal('Argument first is not a number');
                done();
            });
    });
    it('should return an error if argument "last" is not a number', (done) => {
        api.get('/add?first=1&last=aasd')
            .expect(400)
            .end((err, res) => {
                expect(res.body.status).to.equal('error');
                expect(res.body.message).to.equal('Argument last is not a number');
                done();
            });
    });
});

describe('calculator', () => {
    it('should add 2 numbers', (done) => {
        api.get('/add?first=1&last=1')
            .expect(200)
            .end((err, res) => {
                expect(res.body.status).to.equal('ok');
                expect(res.body.message).to.equal(2);
                done();
            });
    });
    it('should substract 2 numbers', (done) => {
        api.get('/sub?first=5&last=1')
            .expect(200)
            .end((err, res) => {
                expect(res.body.status).to.equal('ok');
                expect(res.body.message).to.equal(4);
                done();
            });
    });
    it('should multiply 2 numbers', (done) => {
        api.get('/mul?first=5&last=2')
            .expect(200)
            .end((err, res) => {
                expect(res.body.status).to.equal('ok');
                expect(res.body.message).to.equal(10);
                done();
            });
    });
    it('should divide 2 numbers', (done) => {
        api.get('/div?first=5&last=2')
            .expect(200)
            .end((err, res) => {
                expect(res.body.status).to.equal('ok');
                expect(res.body.message).to.equal(2.5);
                done();
            });
    });
    it('should return an error if divide by 0', (done) => {
        api.get('/div?first=5&last=0')
            .expect(400)
            .end((err, res) => {
                expect(res.body.status).to.equal('error');
                expect(res.body.message).to.equal('Cannot divide by 0');
                done();
            });
    });
});