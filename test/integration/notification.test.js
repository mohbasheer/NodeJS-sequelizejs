import app from '../../src/app';
import expect from 'expect';
import request from 'supertest';
import initializeDB from '../../DB';
import register from '../../src/models/teacher_student_register';
import notification from '../../src/models/notification';
import { createNewRegister } from '../../src/services/teacher_student_register';
import { getTeacherByEmail } from '../../src/services/teacher';
import { getStudentsByEmail, cancelSuspend, doSuspend } from '../../src/services/student';
import { registerStudents } from '../util';

describe('Test Notification API', () => {

    before(async () => {
        await initializeDB();
        await cancelSuspend('student11@gmail.com');
        await doSuspend("student99@gmail.com");
    });

    beforeEach(async () => {
        await notification.destroy({ where: {}, force: true });
        await registerStudents([
            "student11@gmail.com",
            "student22@gmail.com",
            "student33@gmail.com",
            "student99@gmail.com"
        ]);
        return await {};
    });

    it('retrive students for notification case 1', done => {
        request(app)
            .post('/api/retrievefornotifications')
            .send({
                teacher: "teacheraa@gmail.com",
                notification: "Hello students! @student22@gmail.com @student33@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.recipients).toEqual([
                    "student11@gmail.com",
                    "student22@gmail.com",
                    "student33@gmail.com"
                ]);
                done();
            });
    });

    it('retrive students for notification case 2', done => {
        request(app)
            .post('/api/retrievefornotifications')
            .send({
                teacher: "teacheraa@gmail.com",
                notification: "Hello students!"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.recipients).toEqual([
                    "student11@gmail.com",
                    "student22@gmail.com",
                    "student33@gmail.com"
                ]);
                done();
            });
    });

    it('retrive students for notification case 3', done => {
        request(app)
            .post('/api/retrievefornotifications')
            .send({
                teacher: "teacheraa@gmail.com",
                notification: "Hello students! @student44@gmail.com @student66@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.recipients).toEqual([
                    "student11@gmail.com",
                    "student22@gmail.com",
                    "student33@gmail.com",
                    "student44@gmail.com",
                    "student66@gmail.com"
                ]);
                done();
            });
    });

});
