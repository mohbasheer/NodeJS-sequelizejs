import Sequelize from 'sequelize';
import { default as DB } from './connection';

const initializeDB = () => DB.sync();

export default initializeDB;