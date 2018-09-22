import app from '../../src/app';
import expect from 'expect';
import request from 'supertest';
import initializeDB from '../../DB';

describe('Test suspend API', () => {

    before(async () => initializeDB());

    it('suspend a given student', done => {
        request(app)
            .post('/api/suspend')
            .send({
                student: "student11@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect(204)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});