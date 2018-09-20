import RegisterModel from '../models/teacher_student_register';

export const getRegisteredTeachers = async () => RegisterModel.findAll();

export const createNewRegister = async (teacher, students) => {
    const register = await teacher.addStudents(students);
    const registeredStudents = register[0] ? register[0].map(record => record.StudentStudentId) : [];
    const result = students
        .filter(student => registeredStudents.includes(student.student_id))
        .map(student => student.email);
    return await result;
};