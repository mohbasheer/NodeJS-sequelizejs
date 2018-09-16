import Sequelize from 'sequelize';
import Config from '../config/config';

let env = process.env.NODE_ENV || 'development';
let dbConfig = Config[env];

let dbConnection;

if (env === 'production') {
    dbConnection = new Sequelize(dbConfig.db_url, dbConfig);
} else {
    dbConnection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, { dialect: dbConfig.dialect });
}

export default dbConnection;