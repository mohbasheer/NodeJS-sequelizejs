import initializeModel from './models';
import initializeDB from '../DB';
import chalk from 'chalk';
import http from 'http';
import App from './app';

const server = http.createServer(App);
server.on('error', (error) => {
    console.log(chalk.red('http createServer error', error));
});

const initialize = async () => {
    initializeModel();
    await initializeDB();
    await server.listen(3000)
    console.log(chalk.green('application server started at localhost:3000'));
};


initialize();