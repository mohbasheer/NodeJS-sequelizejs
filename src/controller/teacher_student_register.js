import * as RegisterService from '../services/teacher_student_register';
import { getTeacherByEmail, getStudentsByTeacher } from '../services/teacher';
import { getStudentsByEmail } from '../services/student';
import { missingParamValue, missingParam } from '../utils/throw_error';

export const getCommonStudents = async (req, res, next) => {
    let { teacher } = req.query;
    if (!teacher) {
        return next(missingParam('teacher'));
    }
    if (typeof teacher === 'string') {
        teacher = [teacher];
    }
    if (!teacher.length) {
        return next(missingParamValue('teacher'));
    }

    const getAllCommonStudents = async (teachers) => {
        let studentsRecord = await getStudentsByTeacher(teachers.pop());
        while (teachers.length && studentsRecord.length > 0) {
            studentsRecord = await getStudentsByTeacher(
                teachers.pop(),
                studentsRecord.map(record => record.student_id)
            );
        }
        return await studentsRecord;
    }

    try {
        const teachers = await Promise.all(teacher.map(email => getTeacherByEmail(email)));
        let students = await getAllCommonStudents(teachers);
        students = students.map(record => record.email);
        res.json(students);
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    const { teacher, students } = req.body;
    if (teacher === '') {
        return next(missingParamValue('teacher'));
    }
    if (!teacher) {
        return next(missingParam('teacher'));
    }
    if (!students) {
        return next(missingParam('students'));
    }
    if (!students.length) {
        return next(missingParamValue('students'));
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