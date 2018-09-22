import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes/route';

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.message || err);
    res.status(err.status || 500).json({ message: err.message || err })
});

export default app;
