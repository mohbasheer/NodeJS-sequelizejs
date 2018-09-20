import * as RegisterService from '../services/teacher_student_register';
import { getTeacherByEmail, getStudents } from '../services/teacher';
import { getStudentsByEmail } from '../services/student';

export const getCommonStudents = async (req, res, next) => {
    let { teacher } = req.query;
    if (!teacher) {
        return next(new Error('Missing request param \'teacher\' '));
    }
    if (typeof teacher === 'string') {
        teacher = [teacher];
    }
    if (!teacher.length) {
        return next(new Error('\'teacher\' param should have values '));
    }

    const getAllCommonStudents = async (teachers) => {
        let studentsRecord = await getStudents(teachers.pop());
        while (teachers.length && studentsRecord.length > 0) {
            studentsRecord = await getStudents(
                teachers.pop(),
                studentsRecord.map(record => record.student_id)
            );
        }
        return await studentsRecord;
    }

    try {
        const teachers = await Promise.all(teacher.map(email => getTeacherByEmail(email)));
        console.log('teachers ', teachers);
        let students = await getAllCommonStudents(teachers);
        students = students.map(record => record.email);
        console.log('students ', students);
        res.json(students);
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    const { teacher, students } = req.body;
    if (!teacher) {
        return next(new Error('Missing request param \'teacher\' '));
    }
    if (!students) {
        return next(new Error('Missing request param \'students\' '));
    }
    if (!students.length) {
        return next(new Error('\'students\' param should have values '));
    }
    try {
        const teacherRecord = await getTeacherByEmail(teacher);
        const studentsRecord = await getStudentsByEmail(students);
        await RegisterService.createNewRegister(teacherRecord, studentsRecord);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}