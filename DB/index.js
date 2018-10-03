import Sequelize from 'sequelize';
import DB from './connection';

const initializeDB = () => DB.sync();

export const closeDB = () => DB.close();

export default initializeDB;