import Sequelize from 'sequelize';
import { default as DB } from './connection';

let env = process.env.NODE_ENV || 'development',
    force = env === 'development';

const initializeDB = () => DB.sync();

export default initializeDB;