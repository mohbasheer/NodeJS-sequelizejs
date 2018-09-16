import * as RegisterService from '../services/teacher_student_register';

export const getCommonStudents = async (req, res, next) => {
    let students = await RegisterService.getRegisteredTeachers();
    res.json(students);
}