import Student from './student';
import Teacher from './teacher';

Teacher.belongsToMany(Student, { through: 'TeacherStudentRegister' });
Student.belongsToMany(Teacher, { through: 'TeacherStudentRegister' });