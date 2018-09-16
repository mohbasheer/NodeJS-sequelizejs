import Sequelize from 'sequelize';
import { default as DB } from '../../DB/connection';
import validateEmail from '../validations/email';

export default DB.define('Teacher', {
    employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: { validateEmail }
    }
});

