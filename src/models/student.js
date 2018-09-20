import Sequelize from 'sequelize';
import DB from '../../DB/connection';
import validateEmail from '../validations/email';


export default DB.define('Student', {
    student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: { validateEmail }
    },
    suspended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});