import StudentModel from '../models/student';

export const getStudentsByEmail = (emails) => StudentModel.findAll({ where: { email: emails } });