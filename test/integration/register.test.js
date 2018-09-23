import app from '../../src/app';
import expect from 'expect';
import request from 'supertest';
import register from '../../src/models/teacher_student_register';
import initializeDB from '../../DB';
import { registerStudents } from '../util';

describe('Test Register API', () => {

    beforeEach(async () => {
        await register.destroy({ where: {}, force: true });
        return await {};
    });

    it('register studenst with teacher', done => {
        registerStudents("teacheraa@gmail.com", [
            "student11@gmail.com",
            "student22@gmail.com"
        ])
            .expect(204)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

});