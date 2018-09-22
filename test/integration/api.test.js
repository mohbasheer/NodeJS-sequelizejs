import app from '../../src/app';
import expect from 'expect';
import request from 'supertest';
import initializeDB from '../../DB';
import register from '../../src/models/teacher_student_register';
import notification from '../../src/models/notification';
import { createNewRegister } from '../../src/services/teacher_student_register';
import { getTeacherByEmail } from '../../src/services/teacher';
import { getStudentsByEmail, cancelSuspend, doSuspend } from '../../src/services/student';

const registerStudents = (students) => request(app)
    .post('/api/register')
    .send({
        teacher: "teacheraa@gmail.com",
        students
    })
    .set('Accept', 'application/json');


describe('Test API', () => {

    before(() => initializeDB());

    const config = { where: {}, force: true };

    describe('Test Commonstudents API', () => {

        beforeEach(async () => {
            await register.destroy(config);
            let teacher = await getTeacherByEmail('teacheraa@gmail.com');
            let students = await getStudentsByEmail(["student11@gmail.com", "student22@gmail.com", "student33@gmail.com"])
            await createNewRegister(teacher, students);
            teacher = await getTeacherByEmail('teacherbb@gmail.com');
            students = await getStudentsByEmail(["student22@gmail.com", "student55@gmail.com", "student66@gmail.com"])
            await createNewRegister(teacher, students);
            teacher = await getTeacherByEmail('teachercc@gmail.com');
            students = await getStudentsByEmail(["student33@gmail.com", "student55@gmail.com", "student22@gmail.com"])
            await createNewRegister(teacher, students);
            return await {};
        });

        it('get common studenst case 1', (done) => {
            request(app)
                .get('/api/commonstudents?teacher=teacheraa@gmail.com&teacher=teacherbb@gmail.com&teacher=teachercc@gmail.com')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).toEqual(["student22@gmail.com"]);
                    done();
                });
        });

        it('get common studenst case 2', (done) => {
            request(app)
                .get('/api/commonstudents?teacher=teacheraa@gmail.com&teacher=teachercc@gmail.com')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).toEqual(["student22@gmail.com", "student33@gmail.com"]);
                    done();
                });
        });

        it('get common studenst case 3', (done) => {
            request(app)
                .get('/api/commonstudents?teacher=teacheraa@gmail.com')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).toEqual(["student11@gmail.com", "student22@gmail.com", "student33@gmail.com"]);
                    done();
                });
        });

    });

    describe('Test Register API', () => {

        beforeEach(async () => {
            await register.destroy(config);
            return await {};
        });

        it('register studenst with teacher', done => {
            registerStudents([
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

    describe('Test suspend API', () => {

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

    describe('Test Notification API', () => {

        before(async () => {
            await cancelSuspend('student11@gmail.com');
            await doSuspend("student99@gmail.com");
        });

        beforeEach(async () => {
            await notification.destroy(config);
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


});
