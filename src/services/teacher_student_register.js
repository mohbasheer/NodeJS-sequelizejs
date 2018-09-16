import { default as RegisterModel } from '../models/teacher_student_register';

export const getRegisteredTeachers = async () => RegisterModel.findAll();