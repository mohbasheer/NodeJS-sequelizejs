import app from '../../src/app';
import expect from 'expect';
import request from 'supertest';
import initializeDB from '../../DB';
import register from '../../src/models/teacher_student_register';
import notification from '../../src/models/notification';
import { createNewRegister } from '../../src/services/teacher_student_register';
import { getTeacherByEmail } from '../../src/services/teacher';
import { getStudentsByEmail, cancelSuspend, doSuspend } from '../../src/services/student';


describe('Test Commonstudents API', () => {

    before(() => initializeDB());

    const config = { where: {}, force: true };

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