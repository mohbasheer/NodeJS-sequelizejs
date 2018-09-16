import Sequelize from 'sequelize';
import DB from './connection';

const initializeDB = () => DB.sync();

export default initializeDB;