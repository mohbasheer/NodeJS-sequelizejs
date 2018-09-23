import DB from '../../DB/connection';
import Student from './student';
import Notification from './notification';

const StudentNotificationRegister = DB.define('StudentNotificationRegister', {});

Notification.belongsToMany(Student, { through: StudentNotificationRegister });
Student.belongsToMany(Notification, { through: StudentNotificationRegister });

export default StudentNotificationRegister;