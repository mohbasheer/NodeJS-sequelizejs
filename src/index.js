import initializeModel from './models';
import initializeDB from '../DB';
import http from 'http';
import App from './app';

const server = http.createServer(App);
server.on('error', (error) => {
    console.log('http server error ==> ', error);
});

const initialize = async () => {
    initializeModel();
    await initializeDB();
    await server.listen(3000)
    console.log('server started at port 3000');
};


initialize();