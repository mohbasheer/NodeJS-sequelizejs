import app from '../src/app';
import request from 'supertest';


export const registerStudents = (teacher, students) => request(app)
    .post('/api/register')
    .send({
        teacher,
        students
    })
    .set('Accept', 'application/json');