import Sequelize from 'sequelize';
import DB from '../../DB/connection';
import Teacher from './teacher';
import Student from './student';


const Notification = DB.define('Notification', { message: Sequelize.STRING });

Notification.hasMany(Student, { as: 'receiver', otherKey: 'receiverId' });
Notification.hasMany(Teacher, { as: 'sender', otherKey: 'senderId' });


export default Notification;