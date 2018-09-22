import app from '../src/app';
import request from 'supertest';


export const registerStudents = (students) => request(app)
    .post('/api/register')
    .send({
        teacher: "teacheraa@gmail.com",
        students
    })
    .set('Accept', 'application/json');