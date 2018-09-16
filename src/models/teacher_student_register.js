import { default as DB } from '../../DB/connection';
import Student from './student';
import Teacher from './teacher';

const TeacherStudentRegister = DB.define('TeacherStudentRegister', {});

Teacher.belongsToMany(Student, { through: TeacherStudentRegister });
Student.belongsToMany(Teacher, { through: TeacherStudentRegister });

export default TeacherStudentRegister;