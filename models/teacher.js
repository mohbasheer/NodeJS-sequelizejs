import Sequelize from 'sequelize';
import { default as DB } from '../DB/connection';

export default DB.define('Teacher', {
    email: Sequelize.STRING
});

