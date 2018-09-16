import Sequelize from 'sequelize';
import { default as DB } from '../DB/connection';

export default DB.define('Teacher', {
    employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: Sequelize.STRING
});

