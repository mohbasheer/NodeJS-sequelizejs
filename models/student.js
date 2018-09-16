import Sequelize from 'sequelize';
import { default as DB } from '../DB/connection';

export default DB.define('Student', {
    student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: Sequelize.STRING
});