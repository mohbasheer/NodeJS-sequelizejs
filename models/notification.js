import Sequelize from 'sequelize';
import { default as DB } from '../DB/connection';
import Teacher from './teacher';
import Student from './student';


const Notification = DB.define('Notification', { message: Sequelize.STRING });

Student.hasMany(Notification, { as: 'receiver', foreignKey: 'receiverId' });
Teacher.hasOne(Notification, { as: 'sender', foreignKey: 'senderId' });


export default Notification;