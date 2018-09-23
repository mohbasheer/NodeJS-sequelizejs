import expect from 'expect';
import initializeDB from '../../../DB';
import register from '../../../src/models/teacher_student_register';
import { createNewRegister } from '../../../src/services/teacher_student_register';
import { getStudentsByTeacher, getTeacherByEmail, getStudents, getStudentByNotCondition } from '../../../src/services/teacher';
import { getStudentsByEmail } from '../../../src/services/student';

describe('Teacher Service test', () => {

    before(() => initializeDB());

    beforeEach(() => register.destroy({ where: {}, force: true }));

    it('get all student for a given teacher using getStudents service', async () => {
        const students_data = [
            "student11@gmail.com",
            "student22@gmail.com",
            "student33@gmail.com"
        ];
        const teacher = await getTeacherByEmail('teacheraa@gmail.com');
        const students = await getStudentsByEmail(students_data);
        await createNewRegister(teacher, students);

        const result = await getStudentsByTeacher(teacher);
        expect(result.map(student => student.email)).toEqual(students_data);
    });

    it('get speific student for a given teacher using getStudents service', async () => {
        const students_data = [
            "student11@gmail.com",
            "student22@gmail.com",
            "student33@gmail.com"
        ];
        const emails = ["student11@gmail.com", "student22@gmail.com"];
        const teacher = await getTeacherByEmail('teacheraa@gmail.com');
        const students = await getStudentsByEmail(emails);
        await createNewRegister(teacher, students);

        const result = await getStudentsByTeacher(teacher, students.map(record => record.student_id));
        expect(result.map(student => student.email)).toEqual(emails);
    });

    it('get all student for a given teacher except specified emails using getStudentByNotCondition service', async () => {
        const students_data = [
            "student11@gmail.com",
            "student22@gmail.com",
            "student33@gmail.com"
        ];
        const teacher = await getTeacherByEmail('teacheraa@gmail.com');
        const students = await getStudentsByEmail(students_data);
        await createNewRegister(teacher, students);

        const result = await getStudentByNotCondition(teacher, { email: ["student22@gmail.com"] });
        expect(result.map(student => student.email)).toEqual([
            "student11@gmail.com",
            "student33@gmail.com"
        ]);
    });

});
