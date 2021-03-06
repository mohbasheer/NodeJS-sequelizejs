import expect from 'expect';
import initializeDB from '../../../DB';
import { getStudentsByEmail, doSuspend, cancelSuspend } from '../../../src/services/student';


describe('Student Service test', () => {

    before(() => initializeDB());

    after(() => cancelSuspend('student11@gmail.com'));

    it('get all students by email', async () => {
        const students_data = [
            "student11@gmail.com",
            "student22@gmail.com",
            "student33@gmail.com"
        ];
        const students = await getStudentsByEmail(students_data);
        expect(students.map(record => record.email)).toEqual(students_data);
    });

    it('suspend a student', async () => {
        const student = await doSuspend('student11@gmail.com');
        expect(student.suspended).toBeTruthy();
    });

});
